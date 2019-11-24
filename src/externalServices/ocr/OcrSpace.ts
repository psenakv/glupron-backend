import { IOcrProvider } from './IOcrProvider';
import * as fetch from 'isomorphic-fetch';
import * as FormData from 'form-data';
import { SPACEOCR_APIKEY } from '../../config';

export class OcrSpace implements IOcrProvider {
    async getValues(
        image: string,
    ): Promise<{ values: null | number[]; raw: any[] }> {
        //console.log('image', image);
        try {
            //const requestData = new FormData();
            //requestData.append('base64Image', image);

            const response = await fetch(`https://api.ocr.space/parse/image`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    apikey: SPACEOCR_APIKEY,
                },
                method: 'POST',
                body: `detectOrientation=true&scale=true&OCREngine=2&base64Image=${encodeURIComponent(
                    image,
                )}`,
            });
            const body: IOcrSpaceParsingResponse = await response.json();

            const values: number[] = [];

            if (body.ParsedResults) {
                for (const parseResult of body.ParsedResults) {
                    for (const piece of parseResult.ParsedText.split(/\s+/m)) {
                        if (/^[0-9]+,[0-9]+$/g.test(piece)) {
                            values.push(
                                Number.parseFloat(piece.replace(',', '.')),
                            );
                        }
                    }
                }
            }

            return {
                values,
                raw: [body],
            };
        } catch (error) {
            console.error(error);
            /*throw new Error(`Cannot scan image with OcrSpace.`);*/

            return {
                values: null,
                raw: error.message,
            };
        }
    }
}

export const ocrSpace = new OcrSpace();

interface IOcrSpaceParsingResponse {
    ParsedResults?: {
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
