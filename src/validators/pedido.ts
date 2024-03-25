import { hasBrokenSequence, hasDuplicatedKey } from "../helpers";
import { PedidoType } from "../model/pedido";
import { hasNDecimal, isAlphaNumeric, isPositiveInteger, isValidMoney } from ".";

export class PedidoValidator {
    constructor() { }

    private validateNumeroItem(p: PedidoType) {
        if (!isPositiveInteger(p.número_item)) {
            throw new Error("número_item")
        }
    }

    private validateCodigoProduto(p: PedidoType) {
        if (!isAlphaNumeric(p.código_produto)) {
            throw new Error("código_produto")
        }
    }

    private validateQuantidadeProduto(p: PedidoType) {
        if (!isPositiveInteger(p.quantidade_produto)) {
            throw new Error("quantidade_produto")
        }
    }

    private validateValorUnitarioProduto(p: PedidoType) {
        if (!isValidMoney(p.valor_unitário_produto) || !hasNDecimal(p.valor_unitário_produto, 2)) {
            throw new Error("valor_unitário_produto")
        }
    }

    private validateDuplicatedNumeroItem(pedidos: PedidoType[]) {
        if (hasDuplicatedKey(pedidos, 'número_item')) {
            throw new Error("número_item duplicado")
        }
    }

    private validateBrokenSequence(pedidos: PedidoType[]) {
        if (hasBrokenSequence(pedidos, 'número_item')) {
            throw new Error("número_item sequencia quebrada")
        }
    }

    private validateList(pedidos: PedidoType[]) {
        this.validateDuplicatedNumeroItem(pedidos);
        this.validateBrokenSequence(pedidos);
    }

    private validateSingle(pedido: PedidoType) {
        this.validateNumeroItem(pedido);
        this.validateCodigoProduto(pedido);
        this.validateQuantidadeProduto(pedido);
        this.validateValorUnitarioProduto(pedido);
    }

    validateAll(pedidosRecord: Record<string, PedidoType[]>, pedidosArray: PedidoType[]) {
        Object.keys(pedidosRecord).forEach((key) => {
            this.validateList(pedidosRecord[key])
        })

        for (const pedido of pedidosArray) {
            this.validateSingle(pedido);
        }
    }
}