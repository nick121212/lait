import * as passport from "passport";
import * as WeixinStrategy from "passport-weixin";
import { UserService } from "../services";
import { Container } from "../models/index";
import * as config from "config";

let providers: any = config.get("auth.providers");

export const passportInit = () => {
    const userService = Container.get(UserService);

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: number, done) => {
        done(null, await userService.getCurrentUser(id));
    });

    passport.use("weapp", new WeixinStrategy(providers.weapp, (req, accessToken, refreshToekn, profile, done) => {
        userService.findOrCreateUser(profile._json.openid, {
            type: 1,
            nickname: "",
            openId: profile._json.openid
        }).then((profile) => {
            done(null, profile);
        });
    }));
}

export { passport, WeixinStrategy };