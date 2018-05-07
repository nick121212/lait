import { UserModel } from "./user";
import { BaseModel } from "../base";
export declare class UserAuthModel extends BaseModel {
    id?: number;
    /**
     * 类型
     * 1： 微信
     * 2： qq
     * 3.  微博
     */
    type: number;
    /**
     * openId
     */
    openId: string;
    /**
     * 姓名
     */
    nickname?: string;
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 性别
     */
    gender?: number;
    /**
     * 地域
     */
    country?: string;
    /**
     * 城市
     */
    city?: string;
    /**
     * 区县
     */
    province?: string;
    /**
     * 所属用户
     */
    user?: UserModel;
}
