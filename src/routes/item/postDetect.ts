import { ocrSpace } from './../../externalServices/ocr/OcrSpace';
import { IResponse } from './../../tools/createRouteHandler';
import { googleSpeech } from '../../externalServices/tts/GoogleSpeech';

export interface IPostDetectRequest {
    gluckometerImage: string;
    language: 'cs' | 'en';
}

export interface IPostDetectResponse
    extends IResponse<{
        glucoseValue: number;
        speech: {
            text: string;
            ssml: string;
            mp3: string;
        };
    }> {
    raw: {
        ocrParsing: any[];
    };
}

export async function postDetect(
    query: void,
    request: IPostDetectRequest,
): Promise<IPostDetectResponse> {
    const text = await ocrSpace.getTexts(request.gluckometerImage);

    const mp3 = await googleSpeech.getAudio(`
    
    <!-- ?xml version="1.0"? -->
    <speak xmlns="http://www.w3.org/2001/10/synthesis"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        version="1.0">
    <metadata>
        <dc:title xml:lang="en">Telephone Menu: Level 1</dc:title>
    </metadata>

    <p>
        <s xml:lang="en-US">
        <voice name="David" gender="male" age="25">
            For English, press <emphasis>one</emphasis>.
        </voice>
        </s>
    </p>

    </speak>

    `);

    return {
        data: {
            glucoseValue: 15.9,
            speech: {
                text: 'ahooooj',
                ssml: '<xml>....',
                mp3,
            },
        },
        raw: {
            ocrParsing: [text],
        },
    };
}
