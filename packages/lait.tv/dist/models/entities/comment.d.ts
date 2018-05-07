import { UserModel } from "./user";
import { PostModel } from "./post";
import { BaseModel } from "../base";
export declare class CommentModel extends BaseModel {
    id?: number;
    /**
     * 评论内容
     */
    content: string;
    /**
    * 所属用户
    */
    user: UserModel;
    /**
     * 所属分类
     */
    post: PostModel;
}
