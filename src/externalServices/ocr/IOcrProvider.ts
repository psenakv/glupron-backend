export interface IOcrProvider {
    getTexts: (image: string) => Promise<string>;
}
