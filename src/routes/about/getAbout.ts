import { IResponse } from './../../tools/createRouteHandler';
import { version } from '../../../package.json';

export interface IGetAboutResponse
    extends IResponse<{
        version: string;
    }> {}

export async function getAbout(): Promise<IGetAboutResponse> {
    return {
        data: {
            version,
        },
    };
}
