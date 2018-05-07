import { UserModel } from './user';
import { CommentModel } from './comment';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CategoryModel } from "./category";
import { TagModel } from "./tag";
import { BaseModel } from "../base";

@Entity()
export class PostModel extends BaseModel {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column("varchar", {
        nullable: true,
        unique: true
    })
    public $id: string;

    /**
     * 文章爬取得原地址
     */
    @Column("varchar", {
        nullable: true
    })
    public originUrl: string;
    /**
     * 文章的封面图
     */
    @Column("varchar", {
        nullable: true
    })
    public coverImage: string;
    /**
     * 标题
     */
    @Column("varchar")
    public title: string;
    /**
     * 文章内容
     */
    @Column("text")
    public content: string;
    /**
     * 文章内容中的图片，用逗号分隔
     */
    @Column("text", {
        nullable: true
    })
    public images: string;

    /**
    * 文章内容中的图片，用逗号分隔
    */
    public imageArr: string[];

    /**
     * 文章内容中的视屏，用逗号分隔
     */
    @Column("text", {
        nullable: true
    })
    public videos: string;
    /**
     * 描述
     */
    @Column("varchar", {
        nullable: true
    })
    public description: string;

    public like?: number;
    public share?: number;
    public comment?: number;
    public isFollow?: boolean;
    // /**
    //  * 所属分类
    //  */
    // @ManyToOne(type => TagModel, tag => tag.posts)
    // public tag: TagModel;

    /**
     * 所属分类
     */
    @OneToMany(type => CommentModel, model => model.post)
    public comments: CommentModel[];

    /**
    * 所属用户
    */
    @ManyToOne(type => UserModel, model => model.posts)
    public user: UserModel;
}
