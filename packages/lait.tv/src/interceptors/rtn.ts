import { Interceptor, InterceptorInterface, Action } from "routing-controllers";

@Interceptor()
export class NameCorrectionInterceptor implements InterceptorInterface {

    intercept(action: Action, content: any) {
        return {
            code: 200,
            data: content
        };
    }

}