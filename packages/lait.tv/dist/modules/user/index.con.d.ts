import { BaseController } from "../base/con";
import { UserModel } from "../../models/entities/user";
import { ElasticService } from "../../services";
/**
 * @description 用户相关数据
 * @class 用户相关数据
 * @constructor
 */
export declare class UserController extends BaseController<UserModel> {
    private elasticClient;
    private tagRepository;
    constructor(elasticClient: ElasticService);
    /**
    * 当前用户关注的tags
    * @memberof UserController
    * @method tags
    * @returns {object}
    * @example Get /users/tags
    */
    private tags(req);
    /**
    * 批量关注tags
    * @memberof UserController
    * @method tags
    * @returns {object}
    * @example Post /users/tags
    */
    private followTags(req, ids);
    /**
    * 关注一个tag
    * @memberof UserController
    * @method follow
    * @returns {object}
    * @example Post /users/tag/34
    */
    private follow(req, tagId, tag);
    /**
    * 取消关注一个tag
    * @memberof UserController
    * @method unFollow
    * @returns {object}
    * @example DELETE /users/tag/34
    */
    private unFollow(req, tagId, tag);
    /**
    * 当前用户关注的用户
    * @memberof UserController
    * @method tags
    * @returns {object}
    * @example Get /users/cates
    */
    private cates(req, from?, size?);
    /**
    * 关注一个用户
    * @memberof UserController
    * @method followCate
    * @returns {object}
    * @example Post /users/user/34
    */
    private followCate(req, tagId, user);
    /**
    * 取消关注一个用户
    * @memberof UserController
    * @method unFollowCate
    * @returns {object}
    * @example DELETE /users/user/34
    */
    private unFollowCate(req, tagId, user);
    /**
    * 更新一个用户的数据
    * @memberof UserController
    * @method updateUserInfo
    * @returns {object}
    * @example Post /users/updateUserInfo
    */
    private updateUserInfo(req, avator);
}
