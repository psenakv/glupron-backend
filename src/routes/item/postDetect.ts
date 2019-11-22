import { IResponse } from './../../tools/createRouteHandler';

export interface IPostDetectRequest {
    gluckometerImage: string;
}

export interface IPostDetectResponse
    extends IResponse<{
        glucoseValue: number;
        speech: {
            text: string;
            ssml: string;
            mp3: string;
        }
    }> {}

export async function postDetect(
    query: void,
    request: IPostDetectRequest,
): Promise<IPostDetectResponse> {
    return {
        data: {
            glucoseValue: 15.9,
            speech: {
                text: "ahooooj",
                ssml: "<xml>....",
                mp3: "https://www.brno.cz/"
            }
        },
    };
}
