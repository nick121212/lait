import { UpdateDateColumn, CreateDateColumn } from "typeorm";

export class BaseModel {
    @CreateDateColumn()
    createDate?: Date;
    @UpdateDateColumn()
    updateDate?: Date;
}