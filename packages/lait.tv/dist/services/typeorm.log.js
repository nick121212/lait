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
var typedi_1 = require("typedi");
var index_1 = require("./index");
/**
 * 自定义数据库log输出
 */
var PinoLogger = /** @class */ (function () {
    function PinoLogger($log) {
        this.$log = $log;
    }
    /**
     * Logs query and parameters used in it.
     */
    PinoLogger.prototype.logQuery = function (query, parameters, queryRunner) {
        this.$log.logger.info({
            dbOpt: {
                query: query,
                parameters: parameters
            }
        });
    };
    /**
     * Logs query that is failed.
     */
    PinoLogger.prototype.logQueryError = function (error, query, parameters, queryRunner) {
        this.$log.logger.error({
            dbOpt: {
                query: query,
                error: error,
                parameters: parameters
            }
        });
    };
    /**
     * Logs query that is slow.
     */
    PinoLogger.prototype.logQuerySlow = function (time, query, parameters, queryRunner) {
        this.$log.logger.warn({
            dbOpt: {
                query: query,
                time: time,
                parameters: parameters
            }
        });
    };
    /**
     * Logs events from the schema build process.
     */
    PinoLogger.prototype.logSchemaBuild = function (message, queryRunner) {
    };
    /**
     * Logs events from the migrations run process.
     */
    PinoLogger.prototype.logMigration = function (message, queryRunner) {
    };
    /**
     * Perform logging using given logger, or by default to the console.
     * Log has its own level and message.
     */
    PinoLogger.prototype.log = function (level, message, queryRunner) {
    };
    PinoLogger = __decorate([
        typedi_1.Service({ global: true }),
        __metadata("design:paramtypes", [index_1.LogService])
    ], PinoLogger);
    return PinoLogger;
}());
exports.PinoLogger = PinoLogger;
//# sourceMappingURL=typeorm.log.js.map