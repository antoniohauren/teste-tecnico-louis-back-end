import { filesToRecord, getFileKey, getFiles, recordToArray } from "../helpers";
import { PedidoValidator } from "../validators";

export type PedidoType = {
    "número_item": number;
    "código_produto": string;
    "quantidade_produto": number;
    "valor_unitário_produto": number
}

export class Pedido {
    private fileUrl = './data/Pedidos/';

    private pedidos: Record<string, PedidoType[]>;
    private pedidosKeys: string[];
    private pedidosArray: PedidoType[];
    private validator: PedidoValidator;

    constructor(validator: PedidoValidator, fileUrl?: string) {
        if (fileUrl) {
            this.fileUrl = fileUrl
        }

        this.validator = validator;

        this.pedidos = {};
        this.pedidosKeys = [];
        this.pedidosArray = [];

        this.load()
    }

    private load() {
        const files = getFiles(this.fileUrl);

        this.pedidos = filesToRecord(files);
        this.pedidosKeys = files.map(getFileKey);
        this.pedidosArray = recordToArray(this.pedidos);
    }

    validate() {
        this.validator.validateAll(this.pedidos, this.pedidosArray)
    }

    getPedidos() {
        return this.pedidos;
    }

    getPedidoByKeyId(key: string, id: number) {
        return this.pedidos[key].find((p) => p.número_item === id)
    }

    getPedidosKeys() {
        return this.pedidosKeys;
    }

    getPedidosArray() {
        return this.pedidosArray;
    }
}