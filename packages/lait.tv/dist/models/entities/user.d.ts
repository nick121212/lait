import { UserAuthModel } from "./userauth";
import { CommentModel } from "./comment";
import { PostModel } from "./post";
import { BaseModel } from "../base";
export declare class UserModel extends BaseModel {
    id: number;
    /**
     * 姓名
     */
    nickname: string;
    /**
     * 手机
     */
    phone: string;
    /**
     * 头像
     */
    avatar: string;
    /**
     * 邮箱
     */
    email: string;
    /**
     * 描述
     */
    description: string;
    /**
     * 所有包含的第三方验证
     */
    auths: UserAuthModel[];
    /**
     * 所属评论
     */
    comments: CommentModel[];
    /**
     * 发布的文章
     */
    posts: PostModel[];
}
