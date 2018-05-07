import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { TagModel } from "./tag";
import { BaseModel } from "../base";
import { UserModel } from "./user";
// import { UserCateModel } from "./usercate";

@Entity()
export class CategoryModel extends BaseModel{
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
     * tags
     */
    @OneToMany(type => TagModel, tag => tag.category)
    public tags: TagModel[];

    // /**
    //  * tag被用户关注
    //  */
    // @OneToMany(type => UserModel, post => post.cates)
    // public users: UserCateModel[];
}
