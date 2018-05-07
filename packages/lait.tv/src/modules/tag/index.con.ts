import { Controller, Param, Body, Get, Post, Put, Delete, JsonController, UseBefore, HttpError } from "routing-controllers";
import { Inject } from "typedi";
import { getConnectionManager, Repository } from "typeorm";
import { EntityFromParam } from "typeorm-routing-controllers-extensions";

import { IConnection, MysqlToken, TagModel } from "../../models";
import { BaseController } from "../base/con";

/**
 * @description 标签相关数据
 * @class 标签相关数据
 * @constructor
 */
@JsonController("/tags")
export class TagController extends BaseController<TagModel>{

    constructor() {
        super();
        this.repository = this.getRepository(TagModel);
    }

    /**
    * 获取所有TAG
    * @memberof TagController
    * @method getAll
    * @returns {object} 
    * @example Get /tags
    */
    @Get("/")
    private async getAll(): Promise<any> {
        let res: [TagModel[], number] = await this.repository.findAndCount({
            relations: ["category"],
            where: {
                isShow: true
            }
        });

        return {
            models: res[0],
            count: res[1]
        };
    }
}