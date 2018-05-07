import { ExpressMiddlewareInterface } from "routing-controllers";
export declare class LoggingMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err: any) => any): void;
}
export declare class Logging1Middleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any): void;
}
