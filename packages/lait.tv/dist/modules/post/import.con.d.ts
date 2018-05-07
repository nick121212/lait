import { PostModel } from "../../models";
import { BaseController } from "../base/con";
import { ElasticService } from "../../services";
/**
 * @description 文章相关数据
 * @class 文章相关数据
 * @constructor
 */
export declare class PostController extends BaseController<PostModel> {
    private elasticClient;
    constructor(elasticClient: ElasticService);
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
    private share(model);
}
