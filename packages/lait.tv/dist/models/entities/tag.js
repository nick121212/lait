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
var category_1 = require("./category");
// import { UserTagModel } from "./usertag";
var base_1 = require("../base");
var TagModel = /** @class */ (function (_super) {
    __extends(TagModel, _super);
    function TagModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], TagModel.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column("varchar"),
        __metadata("design:type", String)
    ], TagModel.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: true
        }),
        __metadata("design:type", String)
    ], TagModel.prototype, "avatar", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: true
        }),
        __metadata("design:type", String)
    ], TagModel.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column("tinyint", {
            nullable: true,
            default: 1
        }),
        __metadata("design:type", Boolean)
    ], TagModel.prototype, "isShow", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return category_1.CategoryModel; }, function (cate) { return cate.tags; }),
        __metadata("design:type", category_1.CategoryModel)
    ], TagModel.prototype, "category", void 0);
    TagModel = __decorate([
        typeorm_1.Entity()
    ], TagModel);
    return TagModel;
}(base_1.BaseModel));
exports.TagModel = TagModel;
//# sourceMappingURL=tag.js.map