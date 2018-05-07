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
var models_1 = require("../../models");
var con_1 = require("../base/con");
var post_1 = require("../../models/entities/post");
var elastic_1 = require("../../services/elastic");
var _index = "post";
var _typeOfLike = "like";
var _typeOfShare = "share";
var _typeOfComment = "comment";
var _typeOfPost = "post";
/**
 * @description 评论相关数据
 * @class 评论相关数据
 * @constructor
 */
var CommentController = /** @class */ (function (_super) {
    __extends(CommentController, _super);
    function CommentController(elasticClient) {
        var _this = _super.call(this) || this;
        _this.elasticClient = elasticClient;
        _this.repository = _this.getRepository(models_1.CommentModel);
        return _this;
    }
    /**
    * 获取单个文章所对应所有评论
    * @memberof CommentController
    * @method getAll
    * @returns {object}
    * @example Get /comments/1
    */
    CommentController.prototype.getAll = function (id, skip, take) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.findAndCount({
                            where: {
                                postId: id
                            },
                            relations: ["user", "post", "user.auths"],
                            skip: skip || 0,
                            take: take || 20
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, {
                                models: res[0],
                                count: res[1]
                            }];
                }
            });
        });
    };
    /**
    * 删除一个评论
    * @memberof CommentController
    * @method deleteOne
    * @returns {object}
    * @example DELETE /comments/1
    */
    CommentController.prototype.deleteOne = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!model) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.repository.deleteById(model.id)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, null];
                }
            });
        });
    };
    /**
    * 创建一个评论
    * @memberof CommentController
    * @method createOne
    * @param  comment {CommentModel}  评论数据
    * @returns {object}
    * @example POST /comments/1
    */
    CommentController.prototype.createOne = function (req, post, comment) {
        return __awaiter(this, void 0, void 0, function () {
            var commentIn, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!post) {
                            throw new routing_controllers_1.HttpError(409, "缺少参数id");
                        }
                        comment.post = post;
                        comment.user = req.user;
                        return [4 /*yield*/, this.repository.create(comment)];
                    case 1:
                        commentIn = _a.sent();
                        return [4 /*yield*/, this.repository.save(commentIn)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.elasticClient.client.index({
                                index: _index,
                                type: _typeOfComment,
                                id: post.id + "_" + _typeOfComment + commentIn.id + "_" + req.user.id,
                                body: {
                                    postId: post.id,
                                    userId: req.user.id
                                }
                            })];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, commentIn];
                }
            });
        });
    };
    __decorate([
        routing_controllers_1.Get("/:id"),
        __param(0, typedi_1.Require("id")), __param(0, routing_controllers_1.Param("id")),
        __param(1, routing_controllers_1.QueryParam("skip")), __param(2, routing_controllers_1.QueryParam("take")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number, Number]),
        __metadata("design:returntype", Promise)
    ], CommentController.prototype, "getAll", null);
    __decorate([
        routing_controllers_1.Authorized("admin"),
        routing_controllers_1.Delete("/:id"),
        __param(0, typeorm_routing_controllers_extensions_1.EntityFromParam("id", {
            connection: models_1.MysqlToken.name,
        })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [models_1.CommentModel]),
        __metadata("design:returntype", Promise)
    ], CommentController.prototype, "deleteOne", null);
    __decorate([
        routing_controllers_1.Authorized(),
        routing_controllers_1.Post("/:id"),
        __param(0, routing_controllers_1.Req()), __param(1, typeorm_routing_controllers_extensions_1.EntityFromParam("id", {
            connection: models_1.MysqlToken.name,
            type: post_1.PostModel
        })), __param(2, routing_controllers_1.QueryParam("comment")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, post_1.PostModel, models_1.CommentModel]),
        __metadata("design:returntype", Promise)
    ], CommentController.prototype, "createOne", null);
    CommentController = __decorate([
        routing_controllers_1.JsonController("/comments"),
        __metadata("design:paramtypes", [elastic_1.ElasticService])
    ], CommentController);
    return CommentController;
}(con_1.BaseController));
exports.CommentController = CommentController;
//# sourceMappingURL=index.con.js.map