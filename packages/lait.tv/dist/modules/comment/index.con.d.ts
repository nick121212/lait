import { CommentModel } from "../../models";
import { BaseController } from "../base/con";
import { ElasticService } from "../../services/elastic";
/**
 * @description 评论相关数据
 * @class 评论相关数据
 * @constructor
 */
export declare class CommentController extends BaseController<CommentModel> {
    private elasticClient;
    constructor(elasticClient: ElasticService);
    /**
    * 获取单个文章所对应所有评论
    * @memberof CommentController
    * @method getAll
    * @returns {object}
    * @example Get /comments/1
    */
    private getAll(id, skip, take);
    /**
    * 删除一个评论
    * @memberof CommentController
    * @method deleteOne
    * @returns {object}
    * @example DELETE /comments/1
    */
    private deleteOne(model);
    /**
    * 创建一个评论
    * @memberof CommentController
    * @method createOne
    * @param  comment {CommentModel}  评论数据
    * @returns {object}
    * @example POST /comments/1
    */
    private createOne(req, post, comment);
}
