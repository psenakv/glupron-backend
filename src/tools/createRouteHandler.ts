import { RequestHandler } from 'express';

export interface IResponse<TData extends {}> {
    status?: {
        id?: string;
        message?: string;
        httpCode?: number;
    };
    data: TData;
}

export function createRouteHandlerWithRequest<
    TQuery,
    TRequest,
    TResponse extends IResponse<any>
>(
    handler: (query: TQuery, request: TRequest) => Promise<TResponse>,
): RequestHandler {
    return async (request, response, next) => {
        try {
            const responseData = await handler(request.params, request.body);

            if (responseData.status && responseData.status.httpCode) {
                response.status(responseData.status.httpCode);
            }

            response.json(responseData);
        } catch (error) {
            /*if ((error.code = 'ER_PARSE_ERROR')) {
                error.sql_purge = error.sql
                    .replace('\n', '')
                    .replace(/\s\s+/g, ' ')
                    .trim();
            }*/
            next(error);
        }
    };
}

export function createRouteHandler<TQuery, TResponse extends IResponse<any>>(
    handler: (query: TQuery) => Promise<TResponse>,
): RequestHandler {
    return createRouteHandlerWithRequest<TQuery, void, TResponse>(handler);
}
