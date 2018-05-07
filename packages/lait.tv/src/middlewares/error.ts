import { Middleware, ExpressErrorMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";

import { LogService } from "../services/index";

@Service()
@Middleware({ type: "after", priority: 10 })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

    constructor(private $log: LogService) {
    }

    error(error: any, request: any, response: any, next: (err?: any) => any) {

        this.$log.logger.error({
            error
        });

        response.send({
            code: error.httpCode || 405,
            message: error.message
        });
    }
}