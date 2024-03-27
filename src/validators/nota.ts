import { NotaType } from '../model/nota';
import { Pedido, PedidoType } from '../model/pedido'
import { isPositiveInteger } from '.';

export class NotaValidator {
    private quantidadeProduto: Map<string, number>;

    constructor(private pedido: Pedido) {
        this.quantidadeProduto = new Map();
    }

    private validateIdPedido(nota: NotaType) {
        if (!isPositiveInteger(nota.id_pedido)) {
            throw new Error("id_pedido")
        }

        const files = this.pedido.getPedidosKeys()

        if (!files.includes(`P${nota.id_pedido}`)) {
            throw new Error("id_pedido")
        }
    }

    private validateNumeroItem(nota: NotaType) {
        if (!isPositiveInteger(nota.número_item)) {
            throw new Error("número_item")
        }
    }

    private validateQuantidadeProduto(nota: NotaType) {
        if (!isPositiveInteger(nota.quantidade_produto)) {
            throw new Error("quantidade_produto")
        }
    }

    private validateInvalidRelation(notas: NotaType[]) {
        const pedidosKeys = this.pedido.getPedidosKeys();

        for (const nota of notas) {
            const key = `P${nota.id_pedido}`;

            if (!pedidosKeys.includes(key)) {
                throw new Error("relacao invalida")
            }
        }
    }

    load(notas: NotaType[]) {
        for (const nota of notas) {
            const key = `P${nota.id_pedido}`;
            const id = nota.número_item;

            const key_id = `${key}-${id}`;

            if (this.quantidadeProduto.has(key_id)) {
                const newValue = this.quantidadeProduto.get(key_id) ?? 0 + nota.quantidade_produto;
                this.quantidadeProduto.set(key_id, newValue);
            } else {
                this.quantidadeProduto.set(key_id, nota.quantidade_produto);
            }
        }
    }

    private validateQuantidadePedido(nota: NotaType) {
        const key = `P${nota.id_pedido}`;
        const id = nota.número_item;
        const key_id = `${key}-${id}`;

        const pedido = this.pedido.getPedidoByKeyId(key, nota.número_item);

        if (!pedido) return;

        const quantidadeProduto = this.quantidadeProduto.get(key_id);


        console.log(this.quantidadeProduto);

        if (!quantidadeProduto) return;

        if (nota.quantidade_produto > quantidadeProduto) {
            throw new Error("Quantiade produto da nota maior que quantidade do pedido");
        }
    }

    private validateList(notas: NotaType[]) {
        this.validateInvalidRelation(notas);
    }

    private validateSingle(n: NotaType) {
        this.validateIdPedido(n)
        this.validateNumeroItem(n)
        this.validateQuantidadePedido(n)
        this.validateQuantidadeProduto(n)
    }

    validateAll(notasRecord: Record<string, NotaType[]>, notasArray: NotaType[]) {
        Object.keys(notasRecord).forEach(key => {
            this.validateList(notasRecord[key])
        })

        for (const nota of notasArray) {
            this.validateSingle(nota)
        }
    }
}