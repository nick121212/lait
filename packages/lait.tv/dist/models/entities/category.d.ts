import { TagModel } from "./tag";
import { BaseModel } from "../base";
export declare class CategoryModel extends BaseModel {
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
     * tags
     */
    tags: TagModel[];
}
