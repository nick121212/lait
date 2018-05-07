import { Repository, ObjectType, getConnectionManager } from "typeorm";
import { Inject } from "typedi";
import { MysqlToken, IConnection } from "../../models";

export class BaseController<T> {
    protected repository: Repository<T>;

    constructor(private connection: string = MysqlToken.name) {

    }

    protected getRepository<T1>(target: ObjectType<any> | string): Repository<T1> {
        const repository = getConnectionManager().get(this.connection).getRepository(target);

        return repository;
    }
}