export interface ISpeechProvider {
    getAudio: (ssml: string) => Promise<string>;
}
