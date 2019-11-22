import { IResponse } from './../../tools/createRouteHandler';

export interface IPostDetectRequest {
    gluckometerImage: string;
}

export interface IPostDetectResponse
    extends IResponse<{
        glucoseValue: number;
    }> {}

export async function postDetect(
    query: void,
    request: IPostDetectRequest,
): Promise<IPostDetectResponse> {
    return {
        data: {
            glucoseValue: 15.9,
        },
    };
}
