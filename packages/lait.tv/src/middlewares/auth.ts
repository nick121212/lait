import { ExpressMiddlewareInterface } from "routing-controllers";

export class AuthMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next?: (err?: any) => any): any {

        if (!request.user || request.user.id) {
            
        }

        next();
    }

}