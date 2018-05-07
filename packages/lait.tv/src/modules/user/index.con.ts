import { Controller, Param, Body, Get, Post, Put, Delete, JsonController, UseBefore, Req, HttpError, Authorized, QueryParam } from "routing-controllers";
import { Inject, Require } from "typedi";
import { getConnectionManager, Repository } from "typeorm";
import { EntityFromParam } from "typeorm-routing-controllers-extensions";
import * as bodybuilder from "bodybuilder";

import { IConnection, MysqlToken, TagModel, CategoryModel } from "../../models";
import { BaseController } from "../base/con";
import { UserModel } from "../../models/entities/user";
import { ElasticService } from "../../services";

const _index = "user";
const _typeOfTag = "tag"
const _typeOfUser = "user"

/**
 * @description 用户相关数据
 * @class 用户相关数据
 * @constructor
 */
@JsonController("/users")
export class UserController extends BaseController<UserModel>{

    private tagRepository: any;

    constructor(private elasticClient: ElasticService, ) {
        super();
        this.repository = this.getRepository(UserModel);
        this.tagRepository = this.getRepository(TagModel);
    }

    /**
    * 当前用户关注的tags
    * @memberof UserController
    * @method tags
    * @returns {object} 
    * @example Get /users/tags
    */
    @Authorized("admin")
    @Get("/tags")
    private async tags(@Req() req: any) {
        // 找到当前的登录用户信息
        let { id } = req.user;
        let body = bodybuilder().filter("term", "userId", id).build();
        let tagsResult = await this.elasticClient.client.search({
            index: _index,
            type: _typeOfTag,
            body: body
        });

        console.log("/users/tags", body);

        if (tagsResult.hits.total) {
            let tags = tagsResult.hits.hits.map((hit: any) => {
                return hit._source.tagId;
            });

            if (tags && tags.length) {
                return await this.tagRepository.findByIds(tags);
            }
        }
        return [];
        // return tags;
    }

    /**
    * 批量关注tags
    * @memberof UserController
    * @method tags
    * @returns {object} 
    * @example Post /users/tags
    */
    @Authorized("admin")
    @Post("/tags")
    private async followTags(@Req() req: any, @QueryParam("ids") @Require("ids") ids: string) {
        // 找到当前的登录用户信息
        let { id } = req.user || { id: 0 }, docs: any[] = [];
        let currentUser: UserModel = await this.repository.findOneById(id);

        if (!currentUser) {
            throw new HttpError(401);
        }

        let idArr = ids.split(",");


        console.log(idArr);

        idArr.forEach((tagId: string) => {
            docs.push({
                index: {
                    _index: _index,
                    _type: _typeOfTag,
                    _id: id + "_" + tagId
                }
            });
            docs.push({
                userId: id,
                tagId: tagId
            });
        });

        console.log(docs);
        return await this.elasticClient.client.bulk({
            body: docs,
            timeout: '5m'
        });
    }

    /**
    * 关注一个tag
    * @memberof UserController
    * @method follow
    * @returns {object} 
    * @example Post /users/tag/34
    */
    @Authorized("admin")
    @Post("/tag/:id")
    private async follow(@Req() req: any, @Param("id") tagId: number, @EntityFromParam("id", {
        connection: MysqlToken.name,
        type: TagModel
    }) tag: TagModel) {
        let { id } = req.user || { id: 0 };
        let currentUser: UserModel = await this.repository.findOneById(id);

        if (!currentUser) {
            throw new HttpError(401);
        }

        if (!tag) {
            throw new HttpError(404, `没有找到id：${tagId}的tag`);
        }

        return await this.elasticClient.client.index({
            index: _index,
            type: _typeOfTag,
            id: id + "_" + tag.id,
            body: {
                userId: id,
                tagId: tag.id
            }
        });
    }

    /**
    * 取消关注一个tag
    * @memberof UserController
    * @method unFollow
    * @returns {object} 
    * @example DELETE /users/tag/34
    */
    @Authorized("admin")
    @Delete("/tag/:id")
    private async unFollow(@Req() req: any, @Param("id") tagId: number, @EntityFromParam("id", {
        connection: MysqlToken.name,
        type: TagModel
    }) tag: TagModel) {
        let { id } = req.user || { id: 0 };
        let currentUser: UserModel = await this.repository.findOneById(id);

        if (!currentUser) {
            throw new HttpError(401);
        }

        if (!tag) {
            throw new HttpError(404, `没有找到id：${tagId}的tag`);
        }

        return await this.elasticClient.client.delete({
            index: _index,
            type: _typeOfTag,
            id: id + "_" + tag.id
        });
    }

    /**
    * 当前用户关注的用户
    * @memberof UserController
    * @method tags
    * @returns {object} 
    * @example Get /users/cates
    */
    @Authorized("admin")
    @Get("/users")
    private async cates(@Req() req: any, @QueryParam("from") from: number = 0, @QueryParam("size") size: number = 20) {
        let { id } = req.user;
        let body = bodybuilder().filter("term", "userId", id).build();
        let usersResult = await this.elasticClient.client.search({
            index: _index,
            type: _typeOfUser,
            body: body,
            from,
            size: size || 20
        });

        if (usersResult.hits.total) {
            let users = usersResult.hits.hits.map((hit: any) => {
                return hit._source.followId;
            });

            if (users && users.length) {
                return {
                    count: usersResult.hits.total,
                    models: await this.repository.findByIds(users)
                };
            }
        }
        return {
            models: [],
            count: 0
        };
    }

    /**
    * 关注一个用户
    * @memberof UserController
    * @method followCate
    * @returns {object} 
    * @example Post /users/user/34
    */
    @Authorized("admin")
    @Post("/user/:id")
    private async followCate(@Req() req: any, @Param("id") tagId: number, @EntityFromParam("id", {
        connection: MysqlToken.name,
        type: UserModel
    }) user: UserModel) {
        let { id } = req.user || { id: 0 };
        let currentUser: UserModel = await this.repository.findOneById(id);

        if (!currentUser) {
            throw new HttpError(401);
        }

        if (!user) {
            throw new HttpError(404, `没有找到id：${tagId}的用户`);
        }

        return await this.elasticClient.client.index({
            index: _index,
            type: _typeOfUser,
            id: id + "_" + user.id,
            body: {
                userId: id,
                followId: user.id
            }
        });
    }

    /**
    * 取消关注一个用户
    * @memberof UserController
    * @method unFollowCate
    * @returns {object} 
    * @example DELETE /users/user/34
    */
    @Authorized("admin")
    @Delete("/user/:id")
    private async unFollowCate(@Req() req: any, @Param("id") tagId: number, @EntityFromParam("id", {
        connection: MysqlToken.name,
        type: UserModel
    }) user: UserModel) {
        let { id } = req.user || { id: 0 };
        let currentUser: UserModel = await this.repository.findOneById(id);

        if (!currentUser) {
            throw new HttpError(401);
        }

        if (!user) {
            throw new HttpError(404, `没有找到id：${tagId}的用户`);
        }

        return await this.elasticClient.client.delete({
            index: _index,
            type: _typeOfUser,
            id: id + "_" + user.id,
            ignore: [404]
        });
    }

    /**
    * 更新一个用户的数据
    * @memberof UserController
    * @method updateUserInfo
    * @returns {object} 
    * @example Post /users/updateUserInfo
    */
    @Authorized("admin")
    @Post("/updateUserInfo")
    private async updateUserInfo(@Req() req: any, @QueryParam("avator") avator: string) {
        let { id } = req.user || { id: 0 };
        let currentUser: UserModel = await this.repository.findOneById(id);

        if (!currentUser) {
            throw new HttpError(401);
        }

        currentUser.avatar = avator;

        this.repository.save(currentUser);
    }

}