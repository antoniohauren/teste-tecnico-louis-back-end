import { filesToRecord, getFileKey, getFiles, recordToArray } from "../helpers";
import { NotaValidator } from "../validators";
import { BaseModel } from "./base";

export type NotaType = {
    id_pedido: number;
    'número_item': number;
    quantidade_produto: number;
}

export class Nota implements BaseModel {
    private fileUrl = './data/Notas/';

    private notas: Record<string, NotaType[]>;
    private notasKeys: string[];
    private notasArray: NotaType[];
    private validator: NotaValidator;

    constructor(validator: NotaValidator, fileUrl?: string) {
        if (fileUrl) {
            this.fileUrl = fileUrl;
        }

        this.validator = validator;

        this.notas = {};
        this.notasKeys = [];
        this.notasArray = [];

        this.load();
    }

    load() {
        const files = getFiles(this.fileUrl);

        this.notas = filesToRecord(files);
        this.notasKeys = files.map(getFileKey);
        this.notasArray = recordToArray(this.notas);

        this.validator.load(this.notasArray);
    }

    validate() {
        this.validator.validateAll(this.notas, this.notasArray);
    }

    getNotas() {
        return this.notas;
    }

    getNotasKeys() {
        return this.notasKeys;
    }

    getNotasArray() {
        return this.notasArray;
    }

}