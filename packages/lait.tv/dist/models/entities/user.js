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
Object.defineProperty(exports, "__esModule", { value: true });
// import { UserTagModel } from './usertag';
var typeorm_1 = require("typeorm");
var userauth_1 = require("./userauth");
var comment_1 = require("./comment");
var post_1 = require("./post");
var base_1 = require("../base");
// import { UserCateModel } from './usercate';
var UserModel = /** @class */ (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], UserModel.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: false,
            unique: true
        }),
        __metadata("design:type", String)
    ], UserModel.prototype, "nickname", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserModel.prototype, "phone", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserModel.prototype, "avatar", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserModel.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserModel.prototype, "description", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return userauth_1.UserAuthModel; }, function (auth) { return auth.user; }),
        __metadata("design:type", Array)
    ], UserModel.prototype, "auths", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return comment_1.CommentModel; }, function (model) { return model.user; }),
        __metadata("design:type", Array)
    ], UserModel.prototype, "comments", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return post_1.PostModel; }, function (model) { return model.user; }),
        __metadata("design:type", Array)
    ], UserModel.prototype, "posts", void 0);
    UserModel = __decorate([
        typeorm_1.Entity()
    ], UserModel);
    return UserModel;
}(base_1.BaseModel));
exports.UserModel = UserModel;
//# sourceMappingURL=user.js.map