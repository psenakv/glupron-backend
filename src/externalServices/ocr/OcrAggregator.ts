import { IOcrProvider } from './IOcrProvider';
import { ocrGoogle } from './OcrGoogle';
import { ocrSpace } from './OcrSpace';

export class OcrAggregator implements IOcrProvider {
    private strategy = 'OR';

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
                if (this.strategy === 'AND') values = null;
                else if (this.strategy === 'OR')
                    values = [...(values || []), ...(values || [])];
            } else {
                values = [...values, ..._values];
            }
        }

        if (values) {
            values = values.filter((v, i, a) => a.indexOf(v) === i);
        }

        if (this.strategy === 'OR')
            if (values && values.length > 1) {
                values = [values[0]];
            }

        return { values, raw };
    }
}

export const ocrAggregator = new OcrAggregator();
