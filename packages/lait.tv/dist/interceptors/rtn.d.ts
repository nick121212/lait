import { InterceptorInterface, Action } from "routing-controllers";
export declare class NameCorrectionInterceptor implements InterceptorInterface {
    intercept(action: Action, content: any): {
        code: number;
        data: any;
    };
}
