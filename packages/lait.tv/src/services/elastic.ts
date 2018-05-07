import { Service, Inject } from "typedi";
import { Client } from "elasticsearch";
import * as config from "config";
const http = require("http");

@Service({ global: true })
export class ElasticService {
    private host: Client;

    constructor() {
        this.host = new Client(Object.assign({}, {
            // createNodeAgent(connection, config) {
            //     return http.globalAgent;
            // }
        }, config.get("elastic.client")));

        // this.host.ping({}).then(() => {
        //     console.log("es ok");
        // });
    }

    public get client() {
        return this.host;
    }

}