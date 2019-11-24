import { OcrGoogle, ocrGoogle } from './../../externalServices/ocr/OcrGoogle';
import { ocrSpace } from './../../externalServices/ocr/OcrSpace';
import { IResponse } from './../../tools/createRouteHandler';
import { googleSpeech } from '../../externalServices/tts/GoogleSpeech';
import { isNull } from 'util';

export interface IPostDetectRequest {
    gluckometerImage: string;
    language: 'cs' | 'en';
    noSpeech?: boolean;
    //formats: ('URL' | 'BASE64' | 'RAW')[];
}

export interface IPostDetectResponse
    extends IResponse<{
        glucoseValue: number | null;
        services: string[];
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
    const { values, raw } = await ocrGoogle.getValues(request.gluckometerImage);

    let text: string = 'Nastala chyba, zkuste prosím vyfotit glukometr znovu.';

    let glucoseValue: number | null = null;

    if (isNull(values)) {
        text = text; // With unknown error;
    } else if (values.length > 1) {
        text = `Nalezeno více než 1 text. A to ${values.join(' a ')}`;
    } else if (values.length === 0) {
        text = `Naskenujte znovu`;
    } else if (values.length === 1) {
        glucoseValue = values[0];
        text = `${glucoseValue} je hodnota vaší glykémie.`;
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

    const mp3 = request.noSpeech ? '' : await googleSpeech.getAudio(ssml);

    return {
        data: {
            glucoseValue,
            services: ['OCR.Space', 'Google OCR'],
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
