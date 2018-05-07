"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = require("routing-controllers");
var LoggingMiddleware = /** @class */ (function () {
    function LoggingMiddleware() {
    }
    LoggingMiddleware.prototype.use = function (request, response, next) {
        next(null);
    };
    LoggingMiddleware = __decorate([
        routing_controllers_1.Middleware({ type: "before", priority: 1 })
    ], LoggingMiddleware);
    return LoggingMiddleware;
}());
exports.LoggingMiddleware = LoggingMiddleware;
var Logging1Middleware = /** @class */ (function () {
    function Logging1Middleware() {
    }
    Logging1Middleware.prototype.use = function (request, response, next) {
        next();
    };
    Logging1Middleware = __decorate([
        routing_controllers_1.Middleware({ type: "after", priority: 1 })
    ], Logging1Middleware);
    return Logging1Middleware;
}());
exports.Logging1Middleware = Logging1Middleware;
//# sourceMappingURL=logger.js.map