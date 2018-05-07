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
var typeorm_1 = require("typeorm");
var user_1 = require("./user");
var post_1 = require("./post");
var base_1 = require("../base");
var CommentModel = /** @class */ (function (_super) {
    __extends(CommentModel, _super);
    function CommentModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], CommentModel.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column("text"),
        __metadata("design:type", String)
    ], CommentModel.prototype, "content", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return user_1.UserModel; }, function (model) { return model.comments; }),
        __metadata("design:type", user_1.UserModel)
    ], CommentModel.prototype, "user", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return post_1.PostModel; }, function (model) { return model.comments; }),
        __metadata("design:type", post_1.PostModel)
    ], CommentModel.prototype, "post", void 0);
    CommentModel = __decorate([
        typeorm_1.Entity()
    ], CommentModel);
    return CommentModel;
}(base_1.BaseModel));
exports.CommentModel = CommentModel;
//# sourceMappingURL=comment.js.map