import { TagModel } from "./tag";
import { UserModel } from "./user";
import { BaseModel } from "../base";
/**
 * 用户关注的tag表
 */
export declare class UserTagModel extends BaseModel {
    id: number;
    /**
     * 所属分类
     */
    tag: TagModel;
    /**
    * 所属用户
    */
    user: UserModel;
}
