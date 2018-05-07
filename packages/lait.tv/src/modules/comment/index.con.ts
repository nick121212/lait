import {
    Controller, Param, Body, Get, Post, Put, Delete,
    JsonController, UseBefore, HttpError, Req, Authorized, QueryParam
} from "routing-controllers";
import { Inject, Require } from "typedi";
import { getConnectionManager, Repository } from "typeorm";
import { EntityFromParam } from "typeorm-routing-controllers-extensions";

import { IConnection, MysqlToken, CommentModel } from "../../models";
import { BaseController } from "../base/con";
import { PostModel } from "../../models/entities/post";
import { ElasticService } from "../../services/elastic";

const _index = "post";
const _typeOfLike = "like";
const _typeOfShare = "share";
const _typeOfComment = "comment";
const _typeOfPost = "post";

/**
 * @description 评论相关数据
 * @class 评论相关数据
 * @constructor
 */
@JsonController("/comments")
export class CommentController extends BaseController<CommentModel>{

    constructor(private elasticClient: ElasticService) {
        super();
        this.repository = this.getRepository(CommentModel);
    }

    /**
    * 获取单个文章所对应所有评论
    * @memberof CommentController
    * @method getAll
    * @returns {object} 
    * @example Get /comments/1
    */
    @Get("/:id")
    private async getAll(@Require("id") @Param("id") id: number,
        @QueryParam("skip") skip: number, @QueryParam("take") take: number): Promise<any> {
        let res: [CommentModel[], number] = await this.repository.findAndCount({
            where: {
                postId: id
            },
            relations: ["user", "post", "user.auths"],
            skip: skip || 0,
            take: take || 20
        });

        return {
            models: res[0],
            count: res[1]
        };
    }

    /**
    * 删除一个评论
    * @memberof CommentController
    * @method deleteOne
    * @returns {object} 
    * @example DELETE /comments/1
    */
    @Authorized("admin")
    @Delete("/:id")
    private async deleteOne(@EntityFromParam("id", {
        connection: MysqlToken.name,
    }) model: CommentModel) {
        if (model) {
            return await this.repository.deleteById(model.id);
        }

        return null;
    }

    /**
    * 创建一个评论
    * @memberof CommentController
    * @method createOne
    * @param  comment {CommentModel}  评论数据
    * @returns {object} 
    * @example POST /comments/1
    */
    @Authorized()
    @Post("/:id")
    private async createOne(@Req() req: any, @EntityFromParam("id", {
        connection: MysqlToken.name,
        type: PostModel
    }) post: PostModel, @QueryParam("comment") comment: CommentModel) {
        if (!post) {
            throw new HttpError(409, "缺少参数id");
        }

        comment.post = post;
        comment.user = req.user;

        let commentIn = await this.repository.create(comment);
        await this.repository.save(commentIn);

        let data = await this.elasticClient.client.index({
            index: _index,
            type: _typeOfComment,
            id: post.id + "_" + _typeOfComment + commentIn.id + "_" + req.user.id,
            body: {
                postId: post.id,
                userId: req.user.id
            }
        });

        return commentIn;
    }
}
