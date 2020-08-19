import express = require('express')

export interface RequestContext {
    userId: number | null
    request: express.Request
    response: express.Response
}

export interface ExecutionResult {
    statusCode: number
    data: any
}

export type Middleware = (context: RequestContext, next: (context: RequestContext) => ExecutionResult) => ExecutionResult

export function controller(middleware: Middleware[], handler: (context: RequestContext) => ExecutionResult): (request: express.Request, response: express.Response) => void {
    function next(context: RequestContext, i: number): ExecutionResult {
        return i + 1 < middleware.length
            ? middleware[i + 1](context, (ctx) => next(ctx, i + 1))
            : handler(context)
    }

    return (request, response) => {
        const context = {
            userId: null,
            request: request,
            response: response
        }

        const {statusCode, data} = middleware[0](context, (ctx) => next(ctx, 0))

        response.status(statusCode)
        response.end(JSON.stringify(data))
    }
}

