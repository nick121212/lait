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
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = require("routing-controllers");
var typedi_1 = require("typedi");
var index_1 = require("../services/index");
var CustomErrorHandler = /** @class */ (function () {
    function CustomErrorHandler($log) {
        this.$log = $log;
    }
    CustomErrorHandler.prototype.error = function (error, request, response, next) {
        this.$log.logger.error({
            error: error
        });
        response.send({
            code: error.httpCode || 405,
            message: error.message
        });
    };
    CustomErrorHandler = __decorate([
        typedi_1.Service(),
        routing_controllers_1.Middleware({ type: "after", priority: 10 }),
        __metadata("design:paramtypes", [index_1.LogService])
    ], CustomErrorHandler);
    return CustomErrorHandler;
}());
exports.CustomErrorHandler = CustomErrorHandler;
//# sourceMappingURL=error.js.map