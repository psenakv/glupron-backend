import { IOcrProvider } from './IOcrProvider';
import { ocrGoogle } from './OcrGoogle';
import { ocrSpace } from './OcrSpace';

export class OcrAggregator implements IOcrProvider {
    async getValues(
        image: string,
    ): Promise<{ values: null | number[]; raw: any[] }> {
        let values: null | number[] = [];
        let raw: any[] = [];

        for (const { values: _values, raw: _raw } of await Promise.all([
            ocrGoogle.getValues(image),
            ocrSpace.getValues(image),
        ])) {
            raw = [...raw, ..._raw];

            if (!_values || !values) {
                values = null;
            } else {
                values = [...values, ..._values];
            }
        }

        if (values) {
            values = values.filter((v, i, a) => a.indexOf(v) === i);
        }

        return { values, raw };
    }
}

export const ocrAggregator = new OcrAggregator();
