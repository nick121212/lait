import { UserModel } from "../../models";
import { BaseController } from "../base/con";
/**
 * @description 小程序登录相关
 * @class 小程序登录相关
 * @constructor
 */
export declare class AuthController extends BaseController<UserModel> {
    /**
     * constructor 构造函数
     * 初始化responsitory
     */
    constructor();
    /**
    * 微信小程序登录接口
    * @description 小程序专用登录接口
    * @memberof AuthController
    * @method weappLogin
    * @param {string} code wx.login之后得到的code
    * @param {string} userInfo
    *   avatar,country,city,gender,nickname,province
    * @returns {void}
    * @example GET /auth/weapp?code=011fvUCn1OhuBj0V4eCn1Or1Dn1fvUCL
    */
    private weappLogin(req, res, userInfo);
    /**
    * 微信小程序登录之后的回调接口
    * @memberof AuthController
    * @method weappCallback
    * @returns {object} 返回用户的相关信息
    {"result_status":"ok","id":44,"nickname":"","phone":null,"avatar":null,"email":null,"description":null,"auths":[],"cookie":{"path":"/","_expires":"2017-12-11T11:51:50.059Z","originalMaxAge":3600000,"httpOnly":true},"passport":{"user":44},"isLogin":true}
    * @example GET /auth/weapp/callback
    */
    private weappCallback(req);
    /**
    * 退出登录
    * @memberof AuthController
    * @method logout
    * @example POST /auth/logout
    */
    private logout(request);
}
