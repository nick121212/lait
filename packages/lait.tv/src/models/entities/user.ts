// import { UserTagModel } from './usertag';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserAuthModel } from "./userauth";
import { CommentModel } from "./comment";
import { TagModel } from "./tag";
import { PostModel } from "./post";
import { BaseModel } from "../base";
// import { UserCateModel } from './usercate';

@Entity()
export class UserModel extends BaseModel {
    @PrimaryGeneratedColumn()
    public id: number;
    /**
     * 姓名
     */
    @Column("varchar", {
        nullable: false,
        unique: true
    })
    public nickname: string;
    /**
     * 手机
     */
    @Column("varchar", {
        nullable: true
    })
    public phone: string;
    /**
     * 头像
     */
    @Column("varchar", {
        nullable: true
    })
    public avatar: string;
    /**
     * 邮箱
     */
    @Column("varchar", {
        nullable: true
    })
    public email: string;
    /**
     * 描述
     */
    @Column("varchar", {
        nullable: true
    })
    public description: string;
    /**
     * 所有包含的第三方验证
     */
    @OneToMany(type => UserAuthModel, auth => auth.user)
    public auths: UserAuthModel[];

    /**
     * 所属评论
     */
    @OneToMany(type => CommentModel, model => model.user)
    public comments: CommentModel[];

    // /**
    //  * 关注的tags
    //  */
    // @OneToMany(type => UserTagModel, model => model.user)
    // public tags: TagModel[];

    /**
     * 发布的文章
     */
    @OneToMany(type => PostModel, model => model.user)
    public posts: PostModel[];

    // /**
    //  * 发布的文章
    //  */
    // @OneToMany(type => UserCateModel, model => model.user)
    // public cates: UserCateModel[];
}
