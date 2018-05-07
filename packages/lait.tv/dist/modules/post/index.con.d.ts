import { PostModel } from "../../models";
import { BaseController } from "../base/con";
import { ElasticService, LogService } from "../../services";
/**
 * @description 文章相关数据
 * @class 文章相关数据
 * @constructor
 */
export declare class PostController extends BaseController<PostModel> {
    private elasticClient;
    private $log;
    private repositoryOfTag;
    constructor(elasticClient: ElasticService, $log: LogService);
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
    private getAll(req, skip?, take?, tag?);
    /**
     * 添加上like和share,评论的数量
     * @param models
     */
    private getLikeShareCount(models, userId?);
    private getFollowState(models, userId?);
    /**
    * 获取单个的文章
    * @memberof PostController
    * @method getOne
    * @param id {number}  获取单个的文章的ID
    * @returns {object}   数据
    * @example Get /posts
    */
    private getOne(req, model);
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
    private search(req, q, from?, size?);
    /**
    * 点赞文章
    * @memberof PostController
    * @method like
    * @param id {number} 获取单个的文章的ID
    * @returns {object}
    * @example Post /posts/like/:postId
    */
    private like(req, model);
    /**
    * 取消点赞文章
    * @memberof PostController
    * @method like
    * @param id {number} 获取单个的文章的ID
    * @returns {object}
    * @example Post /posts/like/:postId
    */
    private unLike(req, model);
    /**
    * 当前用户关注的用户
    * @memberof UserController
    * @method tags
    * @returns {object}
    * @example Get /users/cates
    */
    private likes2(req, from?, size?);
    /**
    * 分享文章
    * @memberof PostController
    * @method share
    * @param id {number} 获取单个的文章的ID
    * @returns {object}
    * @example Post /posts/share/:postId
    */
    private share(req, model);
    /**
    * 屏蔽单个文章
    * @memberof PostController
    * @method disappear
    * @param id {number} 获取单个的文章的ID
    * @returns {object}
    * @example Post /posts/disappear/:postId
    */
    private disappear(req, model);
}
