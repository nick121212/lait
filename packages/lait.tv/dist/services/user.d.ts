import { UserAuthModel } from "../models";
import { UserModel } from "../models/entities/user";
export declare class UserService {
    private conn;
    constructor();
    /**
     * 获取当前登录的用户信息
     * @param id 用户id
     */
    getCurrentUser(id: number): Promise<UserModel>;
    /**
     * 用户登录的时候，判断是否需要创建新的用户
     * 关联上第三方的登录信息
     * @param openId
     * @param userAuth
     */
    findOrCreateUser(openId: number, userAuth: UserAuthModel): Promise<UserModel>;
}
