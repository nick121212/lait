import { IConnection, MysqlToken, UserAuthModel } from "../models";
import { Service, Inject } from "typedi";
import { UserModel } from "../models/entities/user";
import { Repository, getConnectionManager, Connection } from "typeorm";

@Service({ global: true })
export class UserService {
    private conn: Connection;

    constructor() {
        this.conn = getConnectionManager().get(MysqlToken.name)
    }

    /**
     * 获取当前登录的用户信息
     * @param id 用户id
     */
    public async getCurrentUser(id: number) {
        const userRep = await this.conn.getRepository<UserModel>(UserModel);

        return userRep.findOneById(id, {
            relations: ["auths"]
        });
    }

    /**
     * 用户登录的时候，判断是否需要创建新的用户
     * 关联上第三方的登录信息
     * @param openId 
     * @param userAuth 
     */
    public async findOrCreateUser(openId: number, userAuth: UserAuthModel) {
        const userRep = await this.conn.getRepository<UserModel>(UserModel);
        const userAuthRep = await this.conn.getRepository<UserAuthModel>(UserAuthModel);

        let auth = await userAuthRep.findOne({
            where: {
                openId
            },
            relations: ["user"]
        });

        if (!auth) {
            let user = await userRep.create({
                nickname: userAuth.nickname || openId.toString()
            });

            await userRep.save([user]);

            userAuth.user = user;
            userAuth = await userAuthRep.create(userAuth);
            await userAuthRep.save([userAuth]);

            return user;
        }

        return auth.user;
    }
}