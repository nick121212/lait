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
var typeorm_routing_controllers_extensions_1 = require("typeorm-routing-controllers-extensions");
var bodybuilder = require("bodybuilder");
var _ = require("lodash");
var models_1 = require("../../models");
var con_1 = require("../base/con");
var services_1 = require("../../services");
var _index = "post";
var _typeOfLike = "like";
var _typeOfShare = "share";
var _typeOfDisappera = "disappera";
var _typeOfComment = "comment";
var _typeOfPost = "post";
/**
 * @description 文章相关数据
 * @class 文章相关数据
 * @constructor
 */
var PostController = /** @class */ (function (_super) {
    __extends(PostController, _super);
    function PostController(elasticClient, $log) {
        var _this = _super.call(this) || this;
        _this.elasticClient = elasticClient;
        _this.$log = $log;
        _this.repository = _this.getRepository(models_1.PostModel);
        _this.repositoryOfTag = _this.getRepository(models_1.TagModel);
        return _this;
    }
    /**
    * 获取所有文章
    * @memberof PostController
    * @method getAll
    * @returns {object}
    * @example Get /posts/1
    * @param tag  {number} 标签的ID
    * @param take {number} 每页的数量
    * @param skip {number} 跳过多少个
    */
    PostController.prototype.getAll = function (req, skip, take, tag) {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.repository.findAndCount({
                            relations: ["tag", "tag.category"],
                            skip: skip || 0,
                            take: take || 20,
                            where: tag ? {
                                tag: tag
                            } : {}
                        })];
                    case 1:
                        res = _b.sent();
                        _a = {};
                        return [4 /*yield*/, this.getLikeShareCount(res[0], req.user ? req.user.id : 0)];
                    case 2: return [2 /*return*/, (_a.models = (_b.sent()).map(function (post) {
                            if (post.images) {
                                post.imageArr = post.images.split("--------");
                            }
                            post.images = null;
                            return post;
                        }),
                            _a.count = res[1],
                            _a)];
                }
            });
        });
    };
    /**
     * 添加上like和share,评论的数量
     * @param models
     */
    PostController.prototype.getLikeShareCount = function (models, userId) {
        if (userId === void 0) { userId = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var body, data, modelsByKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = bodybuilder();
                        // 拼接搜索字符串
                        models.forEach(function (m) {
                            m[_typeOfLike] = 0;
                            m[_typeOfShare] = 0;
                            m[_typeOfComment] = 0;
                            m["is" + _typeOfComment] = false;
                            m["is" + _typeOfShare] = false;
                            m["is" + _typeOfLike] = false;
                            if (m.images && m.images.constructor === String) {
                                m.imageArr = m.images.split("--------");
                            }
                            else {
                                m.imageArr = [];
                                delete m.images;
                            }
                            body = body.orFilter("term", "postId", m.id);
                        });
                        body = body.aggregation("terms", "_type", {}, function (agg) { return agg.aggregation("terms", "postId"); }).build();
                        return [4 /*yield*/, this.elasticClient.client.search({
                                body: body,
                                index: _index
                            })];
                    case 1:
                        data = _a.sent();
                        modelsByKey = _.keyBy(models, function (m) { return m.id; });
                        console.log("当前的用户ID", userId);
                        if (userId) {
                            // 如果当前是登录用户，则判断是否已经评论，分享，喜欢的状态
                            data.hits.hits.forEach(function (hit) {
                                if (hit._source.userId == userId && modelsByKey[hit._source.postId]) {
                                    console.log(modelsByKey[hit._source.postId], "selected", hit._type);
                                    modelsByKey[hit._source.postId]["is" + hit._type] = true;
                                }
                            });
                        }
                        // 添加评论，分享，喜欢数量
                        data.aggregations.agg_terms__type.buckets.forEach(function (_a) {
                            var key = _a.key, agg_terms_postId = _a.agg_terms_postId;
                            agg_terms_postId.buckets.forEach(function (element) {
                                if (modelsByKey[element.key]) {
                                    modelsByKey[element.key][key] = element.doc_count;
                                }
                            });
                        });
                        return [4 /*yield*/, this.getFollowState(models, userId)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostController.prototype.getFollowState = function (models, userId) {
        if (userId === void 0) { userId = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var userIds, body, results, follows_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userIds = [];
                        body = bodybuilder();
                        if (!userId) {
                            return [2 /*return*/, models];
                        }
                        models.forEach(function (element) {
                            if (element.user && element.user.id) {
                                userIds.push(element.user.id);
                            }
                        });
                        _.uniq(userIds).forEach(function (m) {
                            body = body.orFilter("term", "followId", m);
                        });
                        return [4 /*yield*/, this.elasticClient.client.search({
                                index: "user",
                                type: "user",
                                body: body.build()
                            })];
                    case 1:
                        results = _a.sent();
                        if (results.hits.total) {
                            follows_1 = _.keyBy(results.hits.hits.map(function (r) {
                                return r._source;
                            }), "followId");
                            return [2 /*return*/, models.map(function (m) {
                                    if (m.user && m.user.id) {
                                        m.isFollow = !!follows_1[m.user.id];
                                    }
                                    return m;
                                })];
                        }
                        return [2 /*return*/, models];
                }
            });
        });
    };
    /**
    * 获取单个的文章
    * @memberof PostController
    * @method getOne
    * @param id {number}  获取单个的文章的ID
    * @returns {object}   数据
    * @example Get /posts
    */
    PostController.prototype.getOne = function (req, model) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!model) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.repository.findOneById(model.id)];
                    case 1:
                        model = _a.sent();
                        return [4 /*yield*/, this.getLikeShareCount([model], req.user ? req.user.id : 0)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, model];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    /**
    * 搜索文章
    * @memberof PostController
    * @method search
    * @param q    {string} 搜索的关键字
    * @param from {number} 起始位置
    * @param size {number} 没页数量
    * @returns {object}
    * @example Get /posts/post/search
    */
    PostController.prototype.search = function (req, q, from, size) {
        if (from === void 0) { from = 0; }
        if (size === void 0) { size = 20; }
        return __awaiter(this, void 0, void 0, function () {
            var res, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.elasticClient.client.search({
                            index: _index,
                            type: _typeOfPost,
                            q: q,
                            from: from,
                            size: size
                        })];
                    case 1:
                        res = _b.sent();
                        _a = {};
                        return [4 /*yield*/, this.getLikeShareCount(res.hits.hits.map(function (hit) {
                                return hit._source;
                            }), req.user ? req.user.id : 0)];
                    case 2: return [2 /*return*/, (_a.models = _b.sent(),
                            _a.count = res.hits.total,
                            _a)];
                }
            });
        });
    };
    /**
    * 点赞文章
    * @memberof PostController
    * @method like
    * @param id {number} 获取单个的文章的ID
    * @returns {object}
    * @example Post /posts/like/:postId
    */
    PostController.prototype.like = function (req, model) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (req.user || { id: 0 }).id;
                        return [4 /*yield*/, this.getRepository(models_1.UserModel).findOneById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new routing_controllers_1.HttpError(401);
                        }
                        if (!model) {
                            throw new routing_controllers_1.HttpError(404, "\u6CA1\u6709\u627E\u5230\u627E\u5230\u6587\u7AE0");
                        }
                        return [4 /*yield*/, this.elasticClient.client.index({
                                index: _index,
                                type: _typeOfLike,
                                id: model.id + "_" + _typeOfLike + "_" + id,
                                body: {
                                    postId: model.id,
                                    userId: id
                                }
                            })];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
    * 取消点赞文章
    * @memberof PostController
    * @method like
    * @param id {number} 获取单个的文章的ID
    * @returns {object}
    * @example Post /posts/like/:postId
    */
    PostController.prototype.unLike = function (req, model) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (req.user || { id: 0 }).id;
                        return [4 /*yield*/, this.getRepository(models_1.UserModel).findOneById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new routing_controllers_1.HttpError(401);
                        }
                        if (!model) {
                            throw new routing_controllers_1.HttpError(404, "\u6CA1\u6709\u627E\u5230\u627E\u5230\u6587\u7AE0");
                        }
                        return [4 /*yield*/, this.elasticClient.client.delete({
                                index: _index,
                                type: _typeOfLike,
                                id: model.id + "_" + _typeOfLike + "_" + id,
                                ignore: [404]
                            })];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
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
    PostController.prototype.likes2 = function (req, from, size) {
        if (from === void 0) { from = 0; }
        if (size === void 0) { size = 20; }
        return __awaiter(this, void 0, void 0, function () {
            var id, body, postResult, posts, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = req.user.id;
                        body = bodybuilder().filter("term", "userId", id).build();
                        return [4 /*yield*/, this.elasticClient.client.search({
                                index: _index,
                                type: _typeOfLike,
                                body: body,
                                from: from,
                                size: size || 20
                            })];
                    case 1:
                        postResult = _c.sent();
                        if (!postResult.hits.total) return [3 /*break*/, 4];
                        posts = postResult.hits.hits.map(function (hit) {
                            return hit._source.postId;
                        });
                        if (!(posts && posts.length)) return [3 /*break*/, 4];
                        _a = {
                            count: postResult.hits.total
                        };
                        _b = this.getLikeShareCount;
                        return [4 /*yield*/, this.repository.findByIds(posts, {
                                relations: ["user", "user.auths"]
                            })];
                    case 2: return [4 /*yield*/, _b.apply(this, [_c.sent(), id])];
                    case 3: return [2 /*return*/, (_a.models = _c.sent(),
                            _a)];
                    case 4: return [2 /*return*/, {
                            models: [],
                            count: 0
                        }];
                }
            });
        });
    };
    /**
    * 分享文章
    * @memberof PostController
    * @method share
    * @param id {number} 获取单个的文章的ID
    * @returns {object}
    * @example Post /posts/share/:postId
    */
    PostController.prototype.share = function (req, model) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (req.user || { id: 0 }).id;
                        return [4 /*yield*/, this.getRepository(models_1.UserModel).findOneById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new routing_controllers_1.HttpError(401);
                        }
                        if (!model) {
                            throw new routing_controllers_1.HttpError(404, "\u6CA1\u6709\u627E\u5230\u627E\u5230\u6587\u7AE0");
                        }
                        return [4 /*yield*/, this.elasticClient.client.index({
                                index: _index,
                                type: _typeOfShare,
                                id: model.id + "_" + _typeOfShare + "_" + id,
                                body: {
                                    postId: model.id,
                                    userId: id
                                }
                            })];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, {}];
                }
            });
        });
    };
    /**
    * 屏蔽单个文章
    * @memberof PostController
    * @method disappear
    * @param id {number} 获取单个的文章的ID
    * @returns {object}
    * @example Post /posts/disappear/:postId
    */
    PostController.prototype.disappear = function (req, model) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (req.user || { id: 0 }).id;
                        return [4 /*yield*/, this.getRepository(models_1.UserModel).findOneById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new routing_controllers_1.HttpError(401);
                        }
                        if (!model) {
                            throw new routing_controllers_1.HttpError(404, "\u6CA1\u6709\u627E\u5230\u627E\u5230\u6587\u7AE0");
                        }
                        return [4 /*yield*/, this.elasticClient.client.index({
                                index: _index,
                                type: _typeOfDisappera,
                                id: model.id + "_" + _typeOfDisappera + "_" + id,
                                body: {
                                    postId: model.id,
                                    userId: id
                                }
                            })];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, {}];
                }
            });
        });
    };
    __decorate([
        routing_controllers_1.Get("/"),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.QueryParam("skip")), __param(2, routing_controllers_1.QueryParam("take")), __param(3, routing_controllers_1.QueryParam("tag")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number, Number, Number]),
        __metadata("design:returntype", Promise)
    ], PostController.prototype, "getAll", null);
    __decorate([
        routing_controllers_1.Get("/:id"),
        __param(0, routing_controllers_1.Req()), __param(1, typeorm_routing_controllers_extensions_1.EntityFromParam("id", {
            connection: models_1.MysqlToken.name,
        })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, models_1.PostModel]),
        __metadata("design:returntype", Promise)
    ], PostController.prototype, "getOne", null);
    __decorate([
        routing_controllers_1.Get("/post/search"),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.QueryParam("q")), __param(2, routing_controllers_1.QueryParam("from")), __param(3, routing_controllers_1.QueryParam("size")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, Number, Number]),
        __metadata("design:returntype", Promise)
    ], PostController.prototype, "search", null);
    __decorate([
        routing_controllers_1.Authorized("admin"),
        routing_controllers_1.Post("/like/:id"),
        __param(0, routing_controllers_1.Req()), __param(1, typeorm_routing_controllers_extensions_1.EntityFromParam("id", {
            connection: models_1.MysqlToken.name,
        })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, models_1.PostModel]),
        __metadata("design:returntype", Promise)
    ], PostController.prototype, "like", null);
    __decorate([
        routing_controllers_1.Authorized("admin"),
        routing_controllers_1.Delete("/like/:id"),
        __param(0, routing_controllers_1.Req()), __param(1, typeorm_routing_controllers_extensions_1.EntityFromParam("id", {
            connection: models_1.MysqlToken.name,
        })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, models_1.PostModel]),
        __metadata("design:returntype", Promise)
    ], PostController.prototype, "unLike", null);
    __decorate([
        routing_controllers_1.Authorized("admin"),
        routing_controllers_1.Get("/user/likes"),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.QueryParam("from")), __param(2, routing_controllers_1.QueryParam("size")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number, Number]),
        __metadata("design:returntype", Promise)
    ], PostController.prototype, "likes2", null);
    __decorate([
        routing_controllers_1.Authorized("admin"),
        routing_controllers_1.Post("/share/:id"),
        __param(0, routing_controllers_1.Req()), __param(1, typeorm_routing_controllers_extensions_1.EntityFromParam("id", {
            connection: models_1.MysqlToken.name,
        })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, models_1.PostModel]),
        __metadata("design:returntype", Promise)
    ], PostController.prototype, "share", null);
    __decorate([
        routing_controllers_1.Authorized("admin"),
        routing_controllers_1.Delete("/disappear/:id"),
        __param(0, routing_controllers_1.Req()), __param(1, typeorm_routing_controllers_extensions_1.EntityFromParam("id", {
            connection: models_1.MysqlToken.name,
        })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, models_1.PostModel]),
        __metadata("design:returntype", Promise)
    ], PostController.prototype, "disappear", null);
    PostController = __decorate([
        routing_controllers_1.JsonController("/posts"),
        __metadata("design:paramtypes", [services_1.ElasticService, services_1.LogService])
    ], PostController);
    return PostController;
}(con_1.BaseController));
exports.PostController = PostController;
//# sourceMappingURL=index.con.js.map