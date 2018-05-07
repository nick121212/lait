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
var elasticsearch_1 = require("elasticsearch");
var config = require("config");
var http = require("http");
var ElasticService = /** @class */ (function () {
    function ElasticService() {
        this.host = new elasticsearch_1.Client(Object.assign({}, {}, config.get("elastic.client")));
        // this.host.ping({}).then(() => {
        //     console.log("es ok");
        // });
    }
    Object.defineProperty(ElasticService.prototype, "client", {
        get: function () {
            return this.host;
        },
        enumerable: true,
        configurable: true
    });
    ElasticService = __decorate([
        typedi_1.Service({ global: true }),
        __metadata("design:paramtypes", [])
    ], ElasticService);
    return ElasticService;
}());
exports.ElasticService = ElasticService;
//# sourceMappingURL=elastic.js.map