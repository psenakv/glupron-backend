import { IOcrProvider } from './IOcrProvider';
import * as fetch from 'isomorphic-fetch';
import * as FormData from 'form-data';

export class OcrGoogle implements IOcrProvider {
    async getValues(
        image: string,
    ): Promise<{ values: null | number[]; raw: any }> {
        //console.log('image', image);
        try {
            const requestData = {
                requests: [
                    {
                        image: {
                            content: 'base64-encoded-image',
                        },
                        features: [
                            {
                                type: 'TEXT_DETECTION',
                            },
                        ],
                    },
                ],
            };

            const response = await fetch(
                `https://vision.googleapis.com/v1/images:annotate`,
                {
                    headers: {
                        //apikey: GOOGLE_APIKEY,
                    },
                    method: 'POST',
                    body: JSON.stringify(requestData),
                },
            );
            const body: IOcrGoogleParsingResponse = await response.json();

            console.log(body);

            const values: number[] = [];

            if (body.ParsedResults) {
                for (const parseResult of body.ParsedResults) {
                    for (const piece of parseResult.ParsedText.split(/\s+/m)) {
                        if (/^[0-9]+(,[0-9]+)?$/g.test(piece)) {
                            values.push(
                                Number.parseFloat(piece.replace(',', '.')),
                            );
                        }
                    }
                }
            }

            return {
                values,
                raw: body,
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

export const ocrGoogle = new OcrGoogle();

interface IOcrGoogleParsingResponse {
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
