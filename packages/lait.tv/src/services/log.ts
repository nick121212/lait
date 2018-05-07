import { Service, Inject } from "typedi";
import * as pino from "pino";

@Service({ global: true })
export class LogService {
    private $log: any;

    constructor() {
        this.$log = pino();
    }

    public get logger() {
        return this.$log;
    }

}
