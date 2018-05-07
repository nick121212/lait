import { ExpressMiddlewareInterface } from "routing-controllers";
export declare class AuthMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next?: (err?: any) => any): any;
}
