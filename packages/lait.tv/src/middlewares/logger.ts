import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";

@Middleware({ type: "before", priority: 1 })
export class LoggingMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err: any) => any): void {
        next(null);
    }
}

@Middleware({ type: "after", priority: 1 })
export class Logging1Middleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any): void {
        next();
    }
}