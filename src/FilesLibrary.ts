/*
import { IResponse } from './tools/createRouteHandler';
import * as uuid from 'uuid';

export class FilesLibrary {
    private files: {
        [id: string]: string;
    } = {};

    saveFileAsBase64(file: string, liveTo?: Date): Promise<string> {
        const uuid = uuid.v4();
        // TODO: implement liveTo

        this.files[uuid] = file;

        return uuid;
    }

    getFile(uuid: string) {
        const file = this.files[uuid];
        if (!file) {
            throw new Error(`File not found.`);
        }

        return file;
    }
}

export const filesLibrary = new FilesLibrary();
*/
