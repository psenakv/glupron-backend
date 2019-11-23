
export interface ISpeechProvider{
	 getAudio: (ssml: string, external: boolean)=> Promise<string>
}