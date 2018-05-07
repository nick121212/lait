import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { TagModel } from "./tag";
import { UserModel } from "./user";
import { PostModel } from "./post";
import { BaseModel } from "../base";

@Entity()
export class CommentModel extends BaseModel{
    @PrimaryGeneratedColumn()
    public id?: number;
    /**
     * 评论内容
     */
    @Column("text")
    public content: string;

    /**
    * 所属用户
    */
    @ManyToOne(type => UserModel, model => model.comments)
    public user: UserModel;

    /**
     * 所属分类
     */
    @ManyToOne(type => PostModel, model => model.comments)
    public post: PostModel;
}