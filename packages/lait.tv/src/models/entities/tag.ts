import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne, ManyToMany, OneToMany } from "typeorm";
import { CategoryModel } from "./category";
import { PostModel } from "./post";
import { UserModel } from "./user";
// import { UserTagModel } from "./usertag";
import { BaseModel } from "../base";

@Entity()
export class TagModel extends BaseModel{
    @PrimaryGeneratedColumn()
    public id: number;
    /**
     * 名称
     */
    @Column("varchar")
    public name: string;
    /**
     * 头像
     */
    @Column("varchar", {
        nullable: true
    })
    public avatar: string;
    /**
     * 描述
     */
    @Column("varchar", {
        nullable: true
    })
    public description: string;

    /**
     * 是否显示
     */
    @Column("tinyint", {
        nullable: true,
        default: 1
    })
    public isShow: boolean;

    /**
     * 所属分类
     */
    @ManyToOne(type => CategoryModel, cate => cate.tags)
    public category: CategoryModel;

    // /**
    //  * tag下的文章
    //  */
    // @OneToMany(type => PostModel, post => post.tag)
    // public posts: PostModel[];

    // /**
    //  * tag被用户关注
    //  */
    // @OneToMany(type => PostModel, post => post.tag)
    // public users: UserTagModel[];
}
