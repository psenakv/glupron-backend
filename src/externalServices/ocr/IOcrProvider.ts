export interface IOcrProvider {
    getValues: (image: string) => Promise<{ values: number[]; raw: any }>;
}
