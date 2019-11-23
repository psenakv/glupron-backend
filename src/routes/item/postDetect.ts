import { ocrSpace } from './../../externalServices/ocr/OcrSpace';
import { IResponse } from './../../tools/createRouteHandler';
import { googleSpeech } from '../../externalServices/tts/GoogleSpeech';

export interface IPostDetectRequest {
    gluckometerImage: string;
    language: 'cs' | 'en';
    //formats: ('URL' | 'BASE64' | 'RAW')[];
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
    const { values, raw } = await ocrSpace.getValues(request.gluckometerImage);

    let text: string = 'Chyba';

    if (values.length > 1) {
        text = `Nalezeno více než 1 text. A to ${values.join(' a ')}`;
    } else if (values.length === 0) {
        text = `Naskenujte znovu`;
    } else if (values.length === 1) {
        text = `${values[0]} je hodnota vaší glykémie.`;
    }

    const ssml = `
    
    <!-- ?xml version="1.0"? -->
    <speak xmlns="http://www.w3.org/2001/10/synthesis"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        version="1.0">
            <p>
                ${text}
            </p>
    </speak>
    `.trim();
    const mp3 = await googleSpeech.getAudio(ssml);

    return {
        data: {
            glucoseValue: 15.9,
            speech: {
                text,
                ssml,
                mp3,
            },
        },
        raw: {
            ocrParsing: [raw],
        },
    };
}
