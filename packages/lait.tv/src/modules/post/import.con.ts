import { Controller, Param, Body, Get, Post, Put, Delete, JsonController, UseBefore, Authorized, Req } from "routing-controllers";
import { Inject } from "typedi";
import { getConnectionManager, Repository } from "typeorm";
import { EntityFromParam } from "typeorm-routing-controllers-extensions";
import * as bodybuilder from "bodybuilder";
import * as _ from "lodash";
import * as md5 from "blueimp-md5";

import { IConnection, MysqlToken, PostModel, UserModel } from "../../models";
import { BaseController } from "../base/con";
import { ElasticService } from "../../services";

const _index = "post";
const _typeOfPost = "post";

/**
 * @description 文章相关数据
 * @class 文章相关数据
 * @constructor
 */
@JsonController("/posts/import")
export class PostController extends BaseController<PostModel>{

    constructor(private elasticClient: ElasticService) {
        super();
        this.repository = this.getRepository(PostModel);
    }

    /**
    * 添加文章接口
    * @memberof PostController
    * @method share
    * @param id {number} 获取单个的文章的ID
    * @returns {object} 
    * @example Get /posts
    *
    * @example {"images":"https://img3.doubanio.com/view/group_topic/large/public/p105724534.jpg","content":"<div class=\"topic-content\">                  <div class=\"topic-richtext\">                    <div class=\"image-container image-float-center\"><div class=\"image-wrapper\"><img src=\"https://img3.doubanio.com/view/group_topic/large/public/p105724534.jpg\" width=\"500\"></div></div><p>小黄瓜</p>                  </div>              </div>","title":"额嗯","originUrl":"https://www.douban.com/group/topic/112313467/","__META__":{"timer":[],"retry":{}}}
    */
    @Post()
    private async share(@Body() model: PostModel) {
        let randow = Math.round(Math.random() * 1 + 1);
        let user: any = await this.getRepository(UserModel).findOne({
            where: {
                nickname: randow % 2 === 0 ? "老铁精选" : "深夜精选"
            }
        });

        model.user = user;

        // if(model.images){
        //     model.images = model.images.join("--------");
        // }
        let $id: string = md5(model.originUrl);

        let post = await this.repository.create(model);
        let postIn = await this.repository.count({
            where: {
                $id: $id
            }
        });

        if (!model.originUrl) {
            return;
        }

        if (postIn) {
            return postIn;
        }
        post.$id = $id;

        await this.repository.save([post]);

        let esPost = await this.elasticClient.client.index({
            index: _index,
            type: _typeOfPost,
            id: $id,
            body: post
        });

        return post;
    }
}