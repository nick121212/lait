"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var models_1 = require("../models");
var typedi_1 = require("typedi");
var user_1 = require("../models/entities/user");
var typeorm_1 = require("typeorm");
var UserService = /** @class */ (function () {
    function UserService() {
        this.conn = typeorm_1.getConnectionManager().get(models_1.MysqlToken.name);
    }
    /**
     * 获取当前登录的用户信息
     * @param id 用户id
     */
    UserService.prototype.getCurrentUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var userRep;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.conn.getRepository(user_1.UserModel)];
                    case 1:
                        userRep = _a.sent();
                        return [2 /*return*/, userRep.findOneById(id, {
                                relations: ["auths"]
                            })];
                }
            });
        });
    };
    /**
     * 用户登录的时候，判断是否需要创建新的用户
     * 关联上第三方的登录信息
     * @param openId
     * @param userAuth
     */
    UserService.prototype.findOrCreateUser = function (openId, userAuth) {
        return __awaiter(this, void 0, void 0, function () {
            var userRep, userAuthRep, auth, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.conn.getRepository(user_1.UserModel)];
                    case 1:
                        userRep = _a.sent();
                        return [4 /*yield*/, this.conn.getRepository(models_1.UserAuthModel)];
                    case 2:
                        userAuthRep = _a.sent();
                        return [4 /*yield*/, userAuthRep.findOne({
                                where: {
                                    openId: openId
                                },
                                relations: ["user"]
                            })];
                    case 3:
                        auth = _a.sent();
                        if (!!auth) return [3 /*break*/, 8];
                        return [4 /*yield*/, userRep.create({
                                nickname: userAuth.nickname || openId.toString()
                            })];
                    case 4:
                        user = _a.sent();
                        return [4 /*yield*/, userRep.save([user])];
                    case 5:
                        _a.sent();
                        userAuth.user = user;
                        return [4 /*yield*/, userAuthRep.create(userAuth)];
                    case 6:
                        userAuth = _a.sent();
                        return [4 /*yield*/, userAuthRep.save([userAuth])];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, user];
                    case 8: return [2 /*return*/, auth.user];
                }
            });
        });
    };
    UserService = __decorate([
        typedi_1.Service({ global: true }),
        __metadata("design:paramtypes", [])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.js.map