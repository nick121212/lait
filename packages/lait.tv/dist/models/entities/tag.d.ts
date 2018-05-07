import { CategoryModel } from "./category";
import { BaseModel } from "../base";
export declare class TagModel extends BaseModel {
    id: number;
    /**
     * 名称
     */
    name: string;
    /**
     * 头像
     */
    avatar: string;
    /**
     * 描述
     */
    description: string;
    /**
     * 是否显示
     */
    isShow: boolean;
    /**
     * 所属分类
     */
    category: CategoryModel;
}
