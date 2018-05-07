import { UserModel } from "./user";
import { BaseModel } from "../base";
import { CategoryModel } from "./category";
/**
 * 用户关注的tag表
 */
export declare class UserCateModel extends BaseModel {
    id: number;
    /**
     * 所属分类
     */
    category: CategoryModel;
    /**
    * 所属用户
    */
    user: UserModel;
}
