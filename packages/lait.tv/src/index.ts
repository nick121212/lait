import "reflect-metadata";
import * as Express from "express";
import { createConnection, getConnectionOptions } from "typeorm";
import { useExpressServer, useContainer, Action } from "routing-controllers";
import * as session from "express-session";
import * as MySQLStoreOrigin from "express-mysql-session";
import { TypeormStore } from "connect-typeorm";
import * as config from "config";

import { Container, MysqlToken, UserModel, UserAuthModel, PostModel, TagModel, CategoryModel } from "./models";

import initData from "./data";
import { passport, passportInit } from "./auth";
import { SessionModel } from "./models/entities/session";
import { PinoLogger } from "./services";

useContainer(Container);

const MySQLStore = MySQLStoreOrigin(session);
const pinLogger = Container.get(PinoLogger);

getConnectionOptions().then(connectionOptions => {
    return createConnection(Object.assign(connectionOptions, {
        logger: pinLogger
    }))
}).then(async (con) => {
    const app = Express();

    initData(con).catch(console.log);

    // 登录模块初始化
    passportInit();
    // passport中间件加载
    app.use(session({
        secret: "lait.tv",
        store: new TypeormStore({ ttl: 86400 }).connect(con.getRepository(SessionModel)),
        cookie: { maxAge: 3600000 },
        resave: true,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // 初始化express模块
    useExpressServer(app, {
        cors: true,
        defaultErrorHandler: false, // 错误由我们自己托管
        controllers: [__dirname + "/modules/**/*.con.js"],
        middlewares: [__dirname + "/modules/**/*.mid.js", __dirname + "/middlewares/index.js"],
        interceptors: [__dirname + "/modules/**/*.cept.js", __dirname + "/interceptors/index.js"],
        authorizationChecker: async (action: Action, roles: string[]) => {
            if (!action.request.user || !action.request.user.id) {
                return false;
            }

            return true;
        }
    });
    app.use("/docs", Express.static("docs"));
    // 启动
    app.listen(config.get("port"));
});
