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
var routing_controllers_1 = require("routing-controllers");
var typedi_1 = require("typedi");
var typeorm_routing_controllers_extensions_1 = require("typeorm-routing-controllers-extensions");
var bodybuilder = require("bodybuilder");
var models_1 = require("../../models");
var con_1 = require("../base/con");
var user_1 = require("../../models/entities/user");
var services_1 = require("../../services");
var _index = "user";
var _typeOfTag = "tag";
var _typeOfUser = "user";
/**
 * @description 用户相关数据
 * @class 用户相关数据
 * @constructor
 */
var UserController = /** @class */ (function (_super) {
    __extends(UserController, _super);
    function UserController(elasticClient) {
        var _this = _super.call(this) || this;
        _this.elasticClient = elasticClient;
        _this.repository = _this.getRepository(user_1.UserModel);
        _this.tagRepository = _this.getRepository(models_1.TagModel);
        return _this;
    }
    /**
    * 当前用户关注的tags
    * @memberof UserController
    * @method tags
    * @returns {object}
    * @example Get /users/tags
    */
    UserController.prototype.tags = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var id, body, tagsResult, tags;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.user.id;
                        body = bodybuilder().filter("term", "userId", id).build();
                        return [4 /*yield*/, this.elasticClient.client.search({
                                index: _index,
                                type: _typeOfTag,
                                body: body
                            })];
                    case 1:
                        tagsResult = _a.sent();
                        console.log("/users/tags", body);
                        if (!tagsResult.hits.total) return [3 /*break*/, 3];
                        tags = tagsResult.hits.hits.map(function (hit) {
                            return hit._source.tagId;
                        });
                        if (!(tags && tags.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.tagRepository.findByIds(tags)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/, []];
                }
            });
        });
    };
    /**
    * 批量关注tags
    * @memberof UserController
    * @method tags
    * @returns {object}
    * @example Post /users/tags
    */
    UserController.prototype.followTags = function (req, ids) {
        return __awaiter(this, void 0, void 0, function () {
            var id, docs, currentUser, idArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (req.user || { id: 0 }).id, docs = [];
                        return [4 /*yield*/, this.repository.findOneById(id)];
                    case 1:
                        currentUser = _a.sent();
                        if (!currentUser) {
                            throw new routing_controllers_1.HttpError(401);
                        }
                        idArr = ids.split(",");
                        console.log(idArr);
                        idArr.forEach(function (tagId) {
                            docs.push({
                                index: {
                                    _index: _index,
                                    _type: _typeOfTag,
                                    _id: id + "_" + tagId
                                }
                            });
                            docs.push({
                                userId: id,
                                tagId: tagId
                            });
                        });
                        console.log(docs);
                        return [4 /*yield*/, this.elasticClient.client.bulk({
                                body: docs,
                                timeout: '5m'
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
    * 关注一个tag
    * @memberof UserController
    * @method follow
    * @returns {object}
    * @example Post /users/tag/34
    */
    UserController.prototype.follow = function (req, tagId, tag) {
        return __awaiter(this, void 0, void 0, function () {
            var id, currentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (req.user || { id: 0 }).id;
                        return [4 /*yield*/, this.repository.findOneById(id)];
                    case 1:
                        currentUser = _a.sent();
                        if (!currentUser) {
                            throw new routing_controllers_1.HttpError(401);
                        }
                        if (!tag) {
                            throw new routing_controllers_1.HttpError(404, "\u6CA1\u6709\u627E\u5230id\uFF1A" + tagId + "\u7684tag");
                        }
                        return [4 /*yield*/, this.elasticClient.client.index({
                                index: _index,
                                type: _typeOfTag,
                                id: id + "_" + tag.id,
                                body: {
                                    userId: id,
                                    tagId: tag.id
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
    * 取消关注一个tag
    * @memberof UserController
    * @method unFollow
    * @returns {object}
    * @example DELETE /users/tag/34
    */
    UserController.prototype.unFollow = function (req, tagId, tag) {
        return __awaiter(this, void 0, void 0, function () {
            var id, currentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (req.user || { id: 0 }).id;
                        return [4 /*yield*/, this.repository.findOneById(id)];
                    case 1:
                        currentUser = _a.sent();
                        if (!currentUser) {
                            throw new routing_controllers_1.HttpError(401);
                        }
                        if (!tag) {
                            throw new routing_controllers_1.HttpError(404, "\u6CA1\u6709\u627E\u5230id\uFF1A" + tagId + "\u7684tag");
                        }
                        return [4 /*yield*/, this.elasticClient.client.delete({
                                index: _index,
                                type: _typeOfTag,
                                id: id + "_" + tag.id
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
    * 当前用户关注的用户
    * @memberof UserController
    * @method tags
    * @returns {object}
    * @example Get /users/cates
    */
    UserController.prototype.cates = function (req, from, size) {
        if (from === void 0) { from = 0; }
        if (size === void 0) { size = 20; }
        return __awaiter(this, void 0, void 0, function () {
            var id, body, usersResult, users, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.user.id;
                        body = bodybuilder().filter("term", "userId", id).build();
                        return [4 /*yield*/, this.elasticClient.client.search({
                                index: _index,
                                type: _typeOfUser,
                                body: body,
                                from: from,
                                size: size || 20
                            })];
                    case 1:
                        usersResult = _b.sent();
                        if (!usersResult.hits.total) return [3 /*break*/, 3];
                        users = usersResult.hits.hits.map(function (hit) {
                            return hit._source.followId;
                        });
                        if (!(users && users.length)) return [3 /*break*/, 3];
                        _a = {
                            count: usersResult.hits.total
                        };
                        return [4 /*yield*/, this.repository.findByIds(users)];
                    case 2: return [2 /*return*/, (_a.models = _b.sent(),
                            _a)];
                    case 3: return [2 /*return*/, {
                            models: [],
                            count: 0
                        }];
                }
            });
        });
    };
    /**
    * 关注一个用户
    * @memberof UserController
    * @method followCate
    * @returns {object}
    * @example Post /users/user/34
    */
    UserController.prototype.followCate = function (req, tagId, user) {
        return __awaiter(this, void 0, void 0, function () {
            var id, currentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (req.user || { id: 0 }).id;
                        return [4 /*yield*/, this.repository.findOneById(id)];
                    case 1:
                        currentUser = _a.sent();
                        if (!currentUser) {
                            throw new routing_controllers_1.HttpError(401);
                        }
                        if (!user) {
                            throw new routing_controllers_1.HttpError(404, "\u6CA1\u6709\u627E\u5230id\uFF1A" + tagId + "\u7684\u7528\u6237");
                        }
                        return [4 /*yield*/, this.elasticClient.client.index({
                                index: _index,
                                type: _typeOfUser,
                                id: id + "_" + user.id,
                                body: {
                                    userId: id,
                                    followId: user.id
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
    * 取消关注一个用户
    * @memberof UserController
    * @method unFollowCate
    * @returns {object}
    * @example DELETE /users/user/34
    */
    UserController.prototype.unFollowCate = function (req, tagId, user) {
        return __awaiter(this, void 0, void 0, function () {
            var id, currentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (req.user || { id: 0 }).id;
                        return [4 /*yield*/, this.repository.findOneById(id)];
                    case 1:
                        currentUser = _a.sent();
                        if (!currentUser) {
                            throw new routing_controllers_1.HttpError(401);
                        }
                        if (!user) {
                            throw new routing_controllers_1.HttpError(404, "\u6CA1\u6709\u627E\u5230id\uFF1A" + tagId + "\u7684\u7528\u6237");
                        }
                        return [4 /*yield*/, this.elasticClient.client.delete({
                                index: _index,
                                type: _typeOfUser,
                                id: id + "_" + user.id,
                                ignore: [404]
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
    * 更新一个用户的数据
    * @memberof UserController
    * @method updateUserInfo
    * @returns {object}
    * @example Post /users/updateUserInfo
    */
    UserController.prototype.updateUserInfo = function (req, avator) {
        return __awaiter(this, void 0, void 0, function () {
            var id, currentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (req.user || { id: 0 }).id;
                        return [4 /*yield*/, this.repository.findOneById(id)];
                    case 1:
                        currentUser = _a.sent();
                        if (!currentUser) {
                            throw new routing_controllers_1.HttpError(401);
                        }
                        currentUser.avatar = avator;
                        this.repository.save(currentUser);
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        routing_controllers_1.Authorized("admin"),
        routing_controllers_1.Get("/tags"),
        __param(0, routing_controllers_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "tags", null);
    __decorate([
        routing_controllers_1.Authorized("admin"),
        routing_controllers_1.Post("/tags"),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.QueryParam("ids")), __param(1, typedi_1.Require("ids")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "followTags", null);
    __decorate([
        routing_controllers_1.Authorized("admin"),
        routing_controllers_1.Post("/tag/:id"),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Param("id")), __param(2, typeorm_routing_controllers_extensions_1.EntityFromParam("id", {
            connection: models_1.MysqlToken.name,
            type: models_1.TagModel
        })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number, models_1.TagModel]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "follow", null);
    __decorate([
        routing_controllers_1.Authorized("admin"),
        routing_controllers_1.Delete("/tag/:id"),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Param("id")), __param(2, typeorm_routing_controllers_extensions_1.EntityFromParam("id", {
            connection: models_1.MysqlToken.name,
            type: models_1.TagModel
        })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number, models_1.TagModel]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "unFollow", null);
    __decorate([
        routing_controllers_1.Authorized("admin"),
        routing_controllers_1.Get("/users"),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.QueryParam("from")), __param(2, routing_controllers_1.QueryParam("size")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number, Number]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "cates", null);
    __decorate([
        routing_controllers_1.Authorized("admin"),
        routing_controllers_1.Post("/user/:id"),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Param("id")), __param(2, typeorm_routing_controllers_extensions_1.EntityFromParam("id", {
            connection: models_1.MysqlToken.name,
            type: user_1.UserModel
        })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number, user_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "followCate", null);
    __decorate([
        routing_controllers_1.Authorized("admin"),
        routing_controllers_1.Delete("/user/:id"),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Param("id")), __param(2, typeorm_routing_controllers_extensions_1.EntityFromParam("id", {
            connection: models_1.MysqlToken.name,
            type: user_1.UserModel
        })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number, user_1.UserModel]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "unFollowCate", null);
    __decorate([
        routing_controllers_1.Authorized("admin"),
        routing_controllers_1.Post("/updateUserInfo"),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.QueryParam("avator")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "updateUserInfo", null);
    UserController = __decorate([
        routing_controllers_1.JsonController("/users"),
        __metadata("design:paramtypes", [services_1.ElasticService])
    ], UserController);
    return UserController;
}(con_1.BaseController));
exports.UserController = UserController;
//# sourceMappingURL=index.con.js.map