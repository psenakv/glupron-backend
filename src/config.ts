import { ConfigChecker } from 'configchecker';

const config = ConfigChecker.from(process.env);

export const PORT = config
    .get('PORT')
    .number()
    .default(3000).value;
export const PUBLIC_URL = config
    .get('PUBLIC_URL')
    .url()
    .required().value;
export const AZURE_APIKEY = config.get('AZURE_APIKEY').required().value;
export const GOOGLE_APIKEY = config.get('GOOGLE_APIKEY').required().value;

export const SPACEOCR_APIKEY = config.get('SPACEOCR_APIKEY').required().value;
