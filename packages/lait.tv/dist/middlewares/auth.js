"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthMiddleware = /** @class */ (function () {
    function AuthMiddleware() {
    }
    AuthMiddleware.prototype.use = function (request, response, next) {
        if (!request.user || request.user.id) {
        }
        next();
    };
    return AuthMiddleware;
}());
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.js.map