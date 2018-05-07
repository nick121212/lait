import { ExpressErrorMiddlewareInterface } from "routing-controllers";
import { LogService } from "../services/index";
export declare class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    private $log;
    constructor($log: LogService);
    error(error: any, request: any, response: any, next: (err?: any) => any): void;
}
