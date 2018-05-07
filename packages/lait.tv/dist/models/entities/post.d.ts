import { UserModel } from './user';
import { CommentModel } from './comment';
import { BaseModel } from "../base";
export declare class PostModel extends BaseModel {
    id: number;
    $id: string;
    /**
     * 文章爬取得原地址
     */
    originUrl: string;
    /**
     * 文章的封面图
     */
    coverImage: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 文章内容
     */
    content: string;
    /**
     * 文章内容中的图片，用逗号分隔
     */
    images: string;
    /**
    * 文章内容中的图片，用逗号分隔
    */
    imageArr: string[];
    /**
     * 文章内容中的视屏，用逗号分隔
     */
    videos: string;
    /**
     * 描述
     */
    description: string;
    like?: number;
    share?: number;
    comment?: number;
    isFollow?: boolean;
    /**
     * 所属分类
     */
    comments: CommentModel[];
    /**
    * 所属用户
    */
    user: UserModel;
}
