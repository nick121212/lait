"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var userauth_1 = require("./../../models/entities/userauth");
var routing_controllers_1 = require("routing-controllers");
var models_1 = require("../../models");
var con_1 = require("../base/con");
var auth_1 = require("../../auth");
var _ = require("lodash");
/**
 * @description 小程序登录相关
 * @class 小程序登录相关
 * @constructor
 */
var AuthController = /** @class */ (function (_super) {
    __extends(AuthController, _super);
    /**
     * constructor 构造函数
     * 初始化responsitory
     */
    function AuthController() {
        var _this = _super.call(this) || this;
        _this.repository = _this.getRepository(models_1.UserModel);
        return _this;
    }
    /**
    * 微信小程序登录接口
    * @description 小程序专用登录接口
    * @memberof AuthController
    * @method weappLogin
    * @param {string} code wx.login之后得到的code
    * @param {string} userInfo
    *   avatar,country,city,gender,nickname,province
    * @returns {void}
    * @example GET /auth/weapp?code=011fvUCn1OhuBj0V4eCn1Or1Dn1fvUCL
    */
    AuthController.prototype.weappLogin = function (req, res, userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var user, wxAuth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.weappCallback(req)];
                    case 1:
                        user = _a.sent();
                        if (!user.auths) return [3 /*break*/, 3];
                        wxAuth = _.first(user.auths.filter(function (a) {
                            return a.type === 1;
                        }));
                        if (!(wxAuth && userInfo)) return [3 /*break*/, 3];
                        wxAuth.avatar = userInfo.avatar;
                        wxAuth.city = userInfo.city;
                        wxAuth.country = userInfo.country;
                        wxAuth.gender = userInfo.gender;
                        wxAuth.nickname = userInfo.nickname;
                        wxAuth.province = userInfo.province;
                        return [4 /*yield*/, this.getRepository(userauth_1.UserAuthModel).save(wxAuth)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: 
                    // if (!user.nickname && userInfo && userInfo.nickname) {
                    //     user.nickname = userInfo.nickname;
                    //     await this.getRepository(UserModel).save(user);
                    // }
                    return [2 /*return*/, user];
                }
            });
        });
    };
    /**
    * 微信小程序登录之后的回调接口
    * @memberof AuthController
    * @method weappCallback
    * @returns {object} 返回用户的相关信息
    {"result_status":"ok","id":44,"nickname":"","phone":null,"avatar":null,"email":null,"description":null,"auths":[],"cookie":{"path":"/","_expires":"2017-12-11T11:51:50.059Z","originalMaxAge":3600000,"httpOnly":true},"passport":{"user":44},"isLogin":true}
    * @example GET /auth/weapp/callback
    */
    AuthController.prototype.weappCallback = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.user && req.user.id) {
                    return [2 /*return*/, this.repository.findOneById(req.user.id, {
                            relations: ["auths"]
                        })];
                }
                throw new routing_controllers_1.HttpError(401);
            });
        });
    };
    /**
    * 退出登录
    * @memberof AuthController
    * @method logout
    * @example POST /auth/logout
    */
    AuthController.prototype.logout = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                request.logout();
                return [2 /*return*/, null];
            });
        });
    };
    __decorate([
        routing_controllers_1.Get("/weapp"),
        routing_controllers_1.UseBefore(auth_1.passport.authenticate("weapp", {})),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()), __param(2, routing_controllers_1.QueryParam("userInfo")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, userauth_1.UserAuthModel]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "weappLogin", null);
    __decorate([
        routing_controllers_1.Get("/weapp/callback"),
        __param(0, routing_controllers_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "weappCallback", null);
    __decorate([
        routing_controllers_1.Post("/logout"),
        __param(0, routing_controllers_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "logout", null);
    AuthController = __decorate([
        routing_controllers_1.JsonController("/auth"),
        __metadata("design:paramtypes", [])
    ], AuthController);
    return AuthController;
}(con_1.BaseController));
exports.AuthController = AuthController;
//# sourceMappingURL=index.con.js.map