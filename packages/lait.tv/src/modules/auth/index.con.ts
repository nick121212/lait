import { UserAuthModel } from './../../models/entities/userauth';
import { Controller, Param, Body, Get, Post, Put, Delete, JsonController, UseBefore, Req, Res, HttpError, HttpCode, QueryParam } from "routing-controllers";
import { Inject } from "typedi";
import { getConnectionManager, Repository } from "typeorm";
import { EntityFromParam } from "typeorm-routing-controllers-extensions";
import * as weappAuthMiddleware from "express-weapp-auth";

import { IConnection, MysqlToken, UserModel } from "../../models";
import { BaseController } from "../base/con";
import { passport, WeixinStrategy } from "../../auth";
import * as _ from "lodash";


/**
 * @description 小程序登录相关
 * @class 小程序登录相关
 * @constructor
 */
@JsonController("/auth")
export class AuthController extends BaseController<UserModel>{

    /**
     * constructor 构造函数
     * 初始化responsitory
     */
    constructor() {
        super();
        this.repository = this.getRepository(UserModel);
    }

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
    @Get("/weapp")
    @UseBefore(
        passport.authenticate("weapp", {

        })
    )
    private async weappLogin(@Req() req: any, @Res() res: any, @QueryParam("userInfo") userInfo: UserAuthModel): Promise<any> {
        let user = await this.weappCallback(req);

        if (user.auths) {
            let wxAuth: UserAuthModel = _.first(user.auths.filter((a) => {
                return a.type === 1;
            }));

            if (wxAuth && userInfo) {
                wxAuth.avatar = userInfo.avatar;
                wxAuth.city = userInfo.city;
                wxAuth.country = userInfo.country;
                wxAuth.gender = userInfo.gender;
                wxAuth.nickname = userInfo.nickname;
                wxAuth.province = userInfo.province;

                await this.getRepository(UserAuthModel).save(wxAuth);
            }
        }

        // if (!user.nickname && userInfo && userInfo.nickname) {
        //     user.nickname = userInfo.nickname;

        //     await this.getRepository(UserModel).save(user);
        // }

        return user;
    }

    /**
    * 微信小程序登录之后的回调接口
    * @memberof AuthController
    * @method weappCallback
    * @returns {object} 返回用户的相关信息
    {"result_status":"ok","id":44,"nickname":"","phone":null,"avatar":null,"email":null,"description":null,"auths":[],"cookie":{"path":"/","_expires":"2017-12-11T11:51:50.059Z","originalMaxAge":3600000,"httpOnly":true},"passport":{"user":44},"isLogin":true}
    * @example GET /auth/weapp/callback
    */
    @Get("/weapp/callback")
    private async weappCallback(@Req() req: any): Promise<any> {
        if (req.user && req.user.id) {
            return this.repository.findOneById(req.user.id, {
                relations: ["auths"]
            });
        }

        throw new HttpError(401);
    }

    /**
    * 退出登录
    * @memberof AuthController
    * @method logout
    * @example POST /auth/logout
    */
    @Post("/logout")
    private async logout(@Req() request: any): Promise<any> {
        request.logout();

        return null;
    }

}
