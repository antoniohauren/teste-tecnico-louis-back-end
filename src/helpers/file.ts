import fs from 'node:fs'

import { getFileKey, linesToJson } from '.';

export function getFiles(uri: string) {
    const files: string[] = []

    fs.readdirSync(uri).forEach((file) => {
        files.push(uri + file)
    })

    return files;
}

export function getFileContent(uri: string) {
    const data = fs.readFileSync(uri, 'utf-8');

    return data.toString()
}

export function filesToRecord<T>(files: string[]) {
    let result: Record<string, T[]> = {};

    for (const file of files) {
        const key = getFileKey(file);

        const fileContent = getFileContent(file);

        const lines = fileContent.split('\r\n')

        const jsonContent = linesToJson<T>(lines);
        
        result[key] = jsonContent;
    }

    return result;
}
