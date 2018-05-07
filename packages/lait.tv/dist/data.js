"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
// import { UserTagModel } from './models/entities/usertag';
var index_1 = require("./models/index");
var user = function (con) { return __awaiter(_this, void 0, void 0, function () {
    var user, userInfo, userInfo1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = con.getRepository(index_1.UserModel);
                return [4 /*yield*/, user.findOne({
                        where: {
                            nickname: "老铁精选"
                        }
                    })];
            case 1:
                userInfo = _a.sent();
                if (!!userInfo) return [3 /*break*/, 4];
                return [4 /*yield*/, user.create({
                        nickname: "老铁精选",
                    })];
            case 2:
                userInfo = _a.sent();
                return [4 /*yield*/, user.save([userInfo])];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, user.findOne({
                    where: {
                        nickname: "深夜精选"
                    }
                })];
            case 5:
                userInfo1 = _a.sent();
                if (!!userInfo1) return [3 /*break*/, 8];
                return [4 /*yield*/, user.create({
                        nickname: "深夜精选",
                    })];
            case 6:
                userInfo1 = _a.sent();
                return [4 /*yield*/, user.save([userInfo1])];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [2 /*return*/, userInfo];
        }
    });
}); };
var cate = function (con) { return __awaiter(_this, void 0, void 0, function () {
    var tag, category, cateInfo, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                tag = con.getRepository(index_1.TagModel);
                category = con.getRepository(index_1.CategoryModel);
                return [4 /*yield*/, category.findOne({
                        where: {
                            name: "老铁精选"
                        }
                    })];
            case 1:
                cateInfo = _d.sent();
                console.log(cateInfo);
                if (!!cateInfo) return [3 /*break*/, 7];
                return [4 /*yield*/, category.create({
                        name: "老铁精选",
                        avatar: "",
                        description: "老铁精选"
                    })];
            case 2:
                cateInfo = _d.sent();
                return [4 /*yield*/, category.save([cateInfo])];
            case 3:
                _d.sent();
                _b = (_a = tag).save;
                return [4 /*yield*/, tag.create({
                        name: "美腿",
                        avatar: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1519614462&di=47590372add4592ce115842a79bb6c7c&src=http://img3.duitang.com/uploads/item/201410/24/20141024144756_rUCUh.thumb.700_0.jpeg",
                        description: "",
                        category: cateInfo
                    })];
            case 4:
                _c = [_d.sent()];
                return [4 /*yield*/, tag.create({
                        name: "衣服",
                        avatar: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=47204211,741684885&fm=27&gp=0.jpg",
                        description: "",
                        category: cateInfo
                    })];
            case 5: return [4 /*yield*/, _b.apply(_a, [_c.concat([_d.sent()])])];
            case 6:
                _d.sent();
                _d.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
var comment = function (con, user, postInfo) { return __awaiter(_this, void 0, void 0, function () {
    var comment, commentInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                comment = con.getRepository(index_1.CommentModel);
                return [4 /*yield*/, comment.create({
                        content: "这个是一个评论",
                        user: user,
                        post: postInfo
                    })];
            case 1:
                commentInfo = _a.sent();
                return [4 /*yield*/, comment.save([commentInfo])];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.default = function (con) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cate(con)];
            case 1:
                _a.sent();
                return [4 /*yield*/, user(con)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=data.js.map