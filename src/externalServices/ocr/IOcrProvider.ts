export interface IOcrProvider {
    getValues: (
        image: string,
    ) => Promise<{ values: null | number[]; raw: any[] }>;
}
