import { Repository, ObjectType } from "typeorm";
export declare class BaseController<T> {
    private connection;
    protected repository: Repository<T>;
    constructor(connection?: string);
    protected getRepository<T1>(target: ObjectType<any> | string): Repository<T1>;
}
