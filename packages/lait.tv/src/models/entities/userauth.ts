import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { UserModel } from "./user";
import { BaseModel } from "../base";

@Entity()
export class UserAuthModel extends BaseModel {
    @PrimaryGeneratedColumn()
    public id?: number;
    /**
     * 类型
     * 1： 微信
     * 2： qq
     * 3.  微博
     */
    @Column("integer", {
        nullable: true
    })
    public type: number;

    /**
     * openId
     */
    @Column("varchar")
    public openId: string;
    /**
     * 姓名
     */
    @Column("varchar", {
        nullable: true
    })
    public nickname?: string;
    /**
     * 头像
     */
    @Column("varchar", {
        nullable: true
    })
    public avatar?: string;
    /**
     * 性别
     */
    @Column("integer", {
        nullable: true
    })
    public gender?: number;
    /**
     * 地域
     */
    @Column("varchar", {
        nullable: true
    })
    public country?: string;
    /**
     * 城市
     */
    @Column("varchar", {
        nullable: true
    })
    public city?: string;
    /**
     * 区县
     */
    @Column("varchar", {
        nullable: true
    })
    public province?: string;
    /**
     * 所属用户
     */
    @ManyToOne(type => UserModel, user => user.auths)
    public user?: UserModel;
}
