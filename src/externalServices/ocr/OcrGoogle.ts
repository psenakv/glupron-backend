import { GOOGLE_APIKEY } from './../../config';
import { IOcrProvider } from './IOcrProvider';
import * as fetch from 'isomorphic-fetch';
import * as FormData from 'form-data';

export class OcrGoogle implements IOcrProvider {
    async getValues(
        image: string,
    ): Promise<{ values: null | number[]; raw: any[] }> {
        //console.log('image', image);
        try {
            const requestData = {
                requests: [
                    {
                        image: {
                            content: image.split(',')[1],
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
                `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_APIKEY}`,
                {
                    headers: {
                        //Authorization: GOOGLE_APIKEY, //`Bearer "$(gcloud auth application-default print-access-token)`,
                        //apikey: GOOGLE_APIKEY,
                    },
                    method: 'POST',
                    body: JSON.stringify(requestData),
                },
            );
            const body: IOcrGoogleParsingResponse = await response.json();

            const values: number[] = [];

            if (body.responses) {
                for (const response of body.responses) {
                    if (response.textAnnotations) {
                        for (const textAnnotation of response.textAnnotations) {
                            for (const piece of textAnnotation.description.split(
                                /\s+/m,
                            )) {
                                if (/^[0-9]+,[0-9]+$/g.test(piece)) {
                                    values.push(
                                        Number.parseFloat(
                                            piece.replace(',', '.'),
                                        ),
                                    );
                                }
                            }
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
            return {
                values: null,
                raw: error.message,
            };
        }
    }
}

export const ocrGoogle = new OcrGoogle();

interface IOcrGoogleParsingResponse {
    responses?: {
        textAnnotations?: {
            locale: string;
            description: string;
        }[];
    }[];
}
