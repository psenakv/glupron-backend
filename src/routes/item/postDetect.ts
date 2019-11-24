import { OcrGoogle, ocrGoogle } from './../../externalServices/ocr/OcrGoogle';
import { ocrSpace } from './../../externalServices/ocr/OcrSpace';
import { IResponse } from './../../tools/createRouteHandler';
import { googleSpeech } from '../../externalServices/tts/GoogleSpeech';
import { isNull } from 'util';
import { ocrAggregator } from '../../externalServices/ocr/OcrAggregator';

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
    const { values, raw } = await ocrAggregator.getValues(
        request.gluckometerImage,
    );

    let text: string = 'Nastala chyba, zkuste prosím vyfotit glukometr znovu.';

    let glucoseValue: number | null = null;

    if (isNull(values)) {
        text = text; // With unknown error;
    } else if (values.length > 1) {
        if (request.language == 'cs')
            text = `Nalezeno více než 1 text. A to ${values.join(' a ')}`;
        if (request.language == 'en')
            text = `Found more then one text - ${values.join(' and ')}`;
    } else if (values.length === 0) {
        if (request.language == 'cs') text = `Naskenujte znovu`;
        if (request.language == 'en') text = `Scan once again please`;
    } else if (values.length === 1) {
        glucoseValue = values[0];
        text = `${glucoseValue}`; // je hodnota vaší glykémie.
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

    const mp3 = request.noSpeech
        ? ''
        : await googleSpeech.getAudio(ssml, request.language);

    return {
        data: {
            glucoseValue,
            services: ['OCR.Space', 'Google OCR'], //Todo make from real data
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
