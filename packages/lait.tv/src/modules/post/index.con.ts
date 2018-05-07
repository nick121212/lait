import { Controller, Param, Body, Get, Post, Put, Delete, JsonController, UseBefore, Authorized, Req, QueryParam, HttpError } from "routing-controllers";
import { Inject } from "typedi";
import { getConnectionManager, Repository } from "typeorm";
import { EntityFromParam } from "typeorm-routing-controllers-extensions";
import * as bodybuilder from "bodybuilder";
import * as _ from "lodash";

import { IConnection, MysqlToken, PostModel, TagModel, UserModel } from "../../models";
import { BaseController } from "../base/con";
import { ElasticService, LogService } from "../../services";
import { SearchResponse } from "elasticsearch";

const _index = "post";
const _typeOfLike = "like";
const _typeOfShare = "share";
const _typeOfDisappera = "disappera";
const _typeOfComment = "comment";
const _typeOfPost = "post";

/**
 * @description 文章相关数据
 * @class 文章相关数据
 * @constructor
 */
@JsonController("/posts")
export class PostController extends BaseController<PostModel>{

    private repositoryOfTag;

    constructor(private elasticClient: ElasticService, private $log: LogService) {
        super();
        this.repository = this.getRepository(PostModel);
        this.repositoryOfTag = this.getRepository(TagModel);
    }

    /**
    * 获取所有文章
    * @memberof PostController
    * @method getAll
    * @returns {object} 
    * @example Get /posts/1
    * @param tag  {number} 标签的ID
    * @param take {number} 每页的数量
    * @param skip {number} 跳过多少个
    */
    @Get("/")
    private async getAll(@Req() req: any, @QueryParam("skip") skip?: number, @QueryParam("take") take?: number, @QueryParam("tag") tag?: number): Promise<any> {
        let res: [PostModel[], number] = await this.repository.findAndCount({
            relations: ["tag", "tag.category"],
            skip: skip || 0,
            take: take || 20,
            where: tag ? {
                tag
            } : {}
        });

        return {
            models: (await this.getLikeShareCount(res[0], req.user ? req.user.id : 0)).map((post) => {
                if (post.images) {
                    post.imageArr = post.images.split("--------");
                }
                post.images = null;

                return post;
            }),
            count: res[1]
        };
    }

    /**
     * 添加上like和share,评论的数量
     * @param models 
     */
    private async getLikeShareCount(models: PostModel[], userId = 0) {
        let body = bodybuilder();

        // 拼接搜索字符串
        models.forEach((m) => {
            m[_typeOfLike] = 0;
            m[_typeOfShare] = 0;
            m[_typeOfComment] = 0;
            m["is" + _typeOfComment] = false;
            m["is" + _typeOfShare] = false;
            m["is" + _typeOfLike] = false;

            if (m.images && m.images.constructor === String) {
                m.imageArr = m.images.split("--------");
            } else {
                m.imageArr = [];
                delete m.images;
            }
            body = body.orFilter("term", "postId", m.id)
        });
        body = body.aggregation("terms", "_type", {}, agg => agg.aggregation("terms", "postId")).build();

        // 获取数据
        let data: SearchResponse<any> = await this.elasticClient.client.search({
            body: body,
            index: _index
        });

        let modelsByKey = _.keyBy(models, m => m.id);

        console.log("当前的用户ID", userId);

        if (userId) {
            // 如果当前是登录用户，则判断是否已经评论，分享，喜欢的状态
            data.hits.hits.forEach((hit) => {
                if (hit._source.userId == userId && modelsByKey[hit._source.postId]) {
                    console.log(modelsByKey[hit._source.postId], "selected", hit._type);
                    modelsByKey[hit._source.postId]["is" + hit._type] = true;
                }
            });
        }

        // 添加评论，分享，喜欢数量
        data.aggregations.agg_terms__type.buckets.forEach(({ key, agg_terms_postId }) => {
            agg_terms_postId.buckets.forEach(element => {
                if (modelsByKey[element.key]) {
                    modelsByKey[element.key][key] = element.doc_count;
                }
            });
        });

        return await this.getFollowState(models, userId);
    }

    private async getFollowState(models: PostModel[], userId = 0) {
        let userIds = [];
        let body = bodybuilder();

        if (!userId) {
            return models;
        }

        models.forEach(element => {
            if (element.user && element.user.id) {
                userIds.push(element.user.id);
            }
        });

        _.uniq(userIds).forEach((m: number) => {
            body = body.orFilter("term", "followId", m);
        });

        let results = await this.elasticClient.client.search({
            index: "user",
            type: "user",
            body: body.build()
        });

        if (results.hits.total) {
            let follows = _.keyBy(results.hits.hits.map((r: any) => {
                return r._source;
            }), "followId");

            return models.map((m: PostModel) => {
                if (m.user && m.user.id) {
                    m.isFollow = !!follows[m.user.id];
                }

                return m;
            });
        }
        return models;
    }

    /**
    * 获取单个的文章
    * @memberof PostController
    * @method getOne
    * @param id {number}  获取单个的文章的ID
    * @returns {object}   数据
    * @example Get /posts
    */
    @Get("/:id")
    private async getOne(@Req() req: any, @EntityFromParam("id", {
        connection: MysqlToken.name,
    }) model: PostModel) {
        if (model) {
            model = await this.repository.findOneById(model.id);

            await this.getLikeShareCount([model], req.user ? req.user.id : 0);

            return model;
        }
        return null;
    }

    /**
    * 搜索文章
    * @memberof PostController
    * @method search
    * @param q    {string} 搜索的关键字
    * @param from {number} 起始位置
    * @param size {number} 没页数量
    * @returns {object} 
    * @example Get /posts/post/search
    */
    @Get("/post/search")
    private async search(@Req() req: any, @QueryParam("q") q: string, @QueryParam("from") from: number = 0, @QueryParam("size") size: number = 20) {
        let res = await this.elasticClient.client.search({
            index: _index,
            type: _typeOfPost,
            q: q,
            from: from,
            size: size
        });

        return {
            models: await this.getLikeShareCount(res.hits.hits.map((hit) => {
                return hit._source;
            }) as any, req.user ? req.user.id : 0),
            count: res.hits.total
        };
    }

    /**
    * 点赞文章
    * @memberof PostController
    * @method like
    * @param id {number} 获取单个的文章的ID
    * @returns {object} 
    * @example Post /posts/like/:postId
    */
    @Authorized("admin")
    @Post("/like/:id")
    private async like(@Req() req: any, @EntityFromParam("id", {
        connection: MysqlToken.name,
    }) model: PostModel) {
        let { id } = req.user || { id: 0 };
        let user = await this.getRepository(UserModel).findOneById(id);

        if (!user) {
            throw new HttpError(401);
        }

        if (!model) {
            throw new HttpError(404, `没有找到找到文章`);
        }

        let data = await this.elasticClient.client.index({
            index: _index,
            type: _typeOfLike,
            id: model.id + "_" + _typeOfLike + "_" + id,
            body: {
                postId: model.id,
                userId: id
            }
        });

        return data;
    }



    /**
    * 取消点赞文章
    * @memberof PostController
    * @method like
    * @param id {number} 获取单个的文章的ID
    * @returns {object} 
    * @example Post /posts/like/:postId
    */
    @Authorized("admin")
    @Delete("/like/:id")
    private async unLike(@Req() req: any, @EntityFromParam("id", {
        connection: MysqlToken.name,
    }) model: PostModel) {
        let { id } = req.user || { id: 0 };
        let user = await this.getRepository(UserModel).findOneById(id);

        if (!user) {
            throw new HttpError(401);
        }

        if (!model) {
            throw new HttpError(404, `没有找到找到文章`);
        }

        let data = await this.elasticClient.client.delete({
            index: _index,
            type: _typeOfLike,
            id: model.id + "_" + _typeOfLike + "_" + id,
            ignore: [404]
        });

        return data;
    }


    /**
    * 当前用户关注的用户
    * @memberof UserController
    * @method tags
    * @returns {object} 
    * @example Get /users/cates
    */
    @Authorized("admin")
    @Get("/user/likes")
    private async likes2(@Req() req: any, @QueryParam("from") from: number = 0, @QueryParam("size") size: number = 20) {
        let { id } = req.user;
        let body = bodybuilder().filter("term", "userId", id).build();
        let postResult = await this.elasticClient.client.search({
            index: _index,
            type: _typeOfLike,
            body: body,
            from,
            size: size || 20
        });

        if (postResult.hits.total) {
            let posts = postResult.hits.hits.map((hit: any) => {
                return hit._source.postId;
            });

            if (posts && posts.length) {
                return {
                    count: postResult.hits.total,
                    models: await this.getLikeShareCount(await this.repository.findByIds(posts, {
                        relations: ["user", "user.auths"]
                    }), id)
                };
            }
        }
        return {
            models: [],
            count: 0
        };
    }



    /**
    * 分享文章
    * @memberof PostController
    * @method share
    * @param id {number} 获取单个的文章的ID
    * @returns {object} 
    * @example Post /posts/share/:postId
    */
    @Authorized("admin")
    @Post("/share/:id")
    private async share(@Req() req: any, @EntityFromParam("id", {
        connection: MysqlToken.name,
    }) model: PostModel) {
        let { id } = req.user || { id: 0 };
        let user = await this.getRepository(UserModel).findOneById(id);

        if (!user) {
            throw new HttpError(401);
        }

        if (!model) {
            throw new HttpError(404, `没有找到找到文章`);
        }

        let data = await this.elasticClient.client.index({
            index: _index,
            type: _typeOfShare,
            id: model.id + "_" + _typeOfShare + "_" + id,
            body: {
                postId: model.id,
                userId: id
            }
        });

        return {};
    }

    /**
    * 屏蔽单个文章
    * @memberof PostController
    * @method disappear
    * @param id {number} 获取单个的文章的ID
    * @returns {object} 
    * @example Post /posts/disappear/:postId
    */
    @Authorized("admin")
    @Delete("/disappear/:id")
    private async disappear(@Req() req: any, @EntityFromParam("id", {
        connection: MysqlToken.name,
    }) model: PostModel) {
        let { id } = req.user || { id: 0 };
        let user = await this.getRepository(UserModel).findOneById(id);

        if (!user) {
            throw new HttpError(401);
        }

        if (!model) {
            throw new HttpError(404, `没有找到找到文章`);
        }

        let data = await this.elasticClient.client.index({
            index: _index,
            type: _typeOfDisappera,
            id: model.id + "_" + _typeOfDisappera + "_" + id,
            body: {
                postId: model.id,
                userId: id
            }
        });

        return {};
    }

}