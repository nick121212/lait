import { TagModel } from "../../models";
import { BaseController } from "../base/con";
/**
 * @description 标签相关数据
 * @class 标签相关数据
 * @constructor
 */
export declare class TagController extends BaseController<TagModel> {
    constructor();
    /**
    * 获取所有TAG
    * @memberof TagController
    * @method getAll
    * @returns {object}
    * @example Get /tags
    */
    private getAll();
}
