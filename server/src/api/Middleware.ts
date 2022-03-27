import {ExecutionResult, RequestContext} from "./Controller";

export function exceptionMiddleware(context: RequestContext, next: (context: RequestContext) => ExecutionResult) {
    try {

        return next(context)

    } catch (e: any) {
        console.error(e)
        return {
            statusCode: 500,
            data: e.message
        }
    }
}

export function responseHeaderMiddleware(context: RequestContext, next: (context: RequestContext) => ExecutionResult) {
    const result = next(context)

    context.response.setHeader('Access-Control-Allow-Origin', '*')

    return result
}
