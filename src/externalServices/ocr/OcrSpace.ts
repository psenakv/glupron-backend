import { IOcrProvider } from './IOcrProvider';
import * as fetch from 'isomorphic-fetch';
import * as FormData from 'form-data';
import { SPACEOCR_APIKEY } from '../../config';

export class OcrSpace implements IOcrProvider {
    async getTexts(image: string): Promise<string> {
        //console.log('image', image);
        try {
            //const requestData = new FormData();
            //requestData.append('base64Image', image);

            const response = await fetch(
                `https://api.ocr.space/parse/image?detectOrientation=true&scale=true&OCREngine=2`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        apikey: SPACEOCR_APIKEY,
                    },
                    method: 'POST',
                    body: `base64Image=${encodeURIComponent(image)}`,
                },
            );
            const body: IOcrParsingResponse = await response.json();

            console.log(body);
            const text = body.ParsedResults[0].ParsedText;

            // TODO: Detect text

            return text;
        } catch (error) {
            console.error(error);
            throw new Error(`Cannot scan image with OcrSpace.`);
        }
    }
}

export const ocrSpace = new OcrSpace();

interface IOcrParsingResponse {
    ParsedResults: {
        TextOverlay: {
            Lines: [];
            HasOverlay: false;
            Message: 'Text overlay is not provided as it is not requested';
        };
        TextOrientation: '0';
        FileParseExitCode: 1;
        ParsedText: string;
        ErrorMessage: '';
        ErrorDetails: '';
    }[];
    OCRExitCode: 1;
    IsErroredOnProcessing: false;
    ProcessingTimeInMilliseconds: '786';
    SearchablePDFURL: 'Searchable PDF not generated as it was not requested.';
}
