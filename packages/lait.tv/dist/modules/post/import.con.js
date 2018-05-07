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
var md5 = require("blueimp-md5");
var models_1 = require("../../models");
var con_1 = require("../base/con");
var services_1 = require("../../services");
var _index = "post";
var _typeOfPost = "post";
/**
 * @description 文章相关数据
 * @class 文章相关数据
 * @constructor
 */
var PostController = /** @class */ (function (_super) {
    __extends(PostController, _super);
    function PostController(elasticClient) {
        var _this = _super.call(this) || this;
        _this.elasticClient = elasticClient;
        _this.repository = _this.getRepository(models_1.PostModel);
        return _this;
    }
    /**
    * 添加文章接口
    * @memberof PostController
    * @method share
    * @param id {number} 获取单个的文章的ID
    * @returns {object}
    * @example Get /posts
    *
    * @example {"images":"https://img3.doubanio.com/view/group_topic/large/public/p105724534.jpg","content":"<div class=\"topic-content\">                  <div class=\"topic-richtext\">                    <div class=\"image-container image-float-center\"><div class=\"image-wrapper\"><img src=\"https://img3.doubanio.com/view/group_topic/large/public/p105724534.jpg\" width=\"500\"></div></div><p>小黄瓜</p>                  </div>              </div>","title":"额嗯","originUrl":"https://www.douban.com/group/topic/112313467/","__META__":{"timer":[],"retry":{}}}
    */
    PostController.prototype.share = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var randow, user, $id, post, postIn, esPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        randow = Math.round(Math.random() * 1 + 1);
                        return [4 /*yield*/, this.getRepository(models_1.UserModel).findOne({
                                where: {
                                    nickname: randow % 2 === 0 ? "老铁精选" : "深夜精选"
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        model.user = user;
                        $id = md5(model.originUrl);
                        return [4 /*yield*/, this.repository.create(model)];
                    case 2:
                        post = _a.sent();
                        return [4 /*yield*/, this.repository.count({
                                where: {
                                    $id: $id
                                }
                            })];
                    case 3:
                        postIn = _a.sent();
                        if (!model.originUrl) {
                            return [2 /*return*/];
                        }
                        if (postIn) {
                            return [2 /*return*/, postIn];
                        }
                        post.$id = $id;
                        return [4 /*yield*/, this.repository.save([post])];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.elasticClient.client.index({
                                index: _index,
                                type: _typeOfPost,
                                id: $id,
                                body: post
                            })];
                    case 5:
                        esPost = _a.sent();
                        return [2 /*return*/, post];
                }
            });
        });
    };
    __decorate([
        routing_controllers_1.Post(),
        __param(0, routing_controllers_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [models_1.PostModel]),
        __metadata("design:returntype", Promise)
    ], PostController.prototype, "share", null);
    PostController = __decorate([
        routing_controllers_1.JsonController("/posts/import"),
        __metadata("design:paramtypes", [services_1.ElasticService])
    ], PostController);
    return PostController;
}(con_1.BaseController));
exports.PostController = PostController;
//# sourceMappingURL=import.con.js.map