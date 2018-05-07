"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var models_1 = require("../../models");
var BaseController = /** @class */ (function () {
    function BaseController(connection) {
        if (connection === void 0) { connection = models_1.MysqlToken.name; }
        this.connection = connection;
    }
    BaseController.prototype.getRepository = function (target) {
        var repository = typeorm_1.getConnectionManager().get(this.connection).getRepository(target);
        return repository;
    };
    return BaseController;
}());
exports.BaseController = BaseController;
//# sourceMappingURL=con.js.map