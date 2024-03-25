import { Nota } from "./model/nota";
import { Pedido } from "./model/pedido"
import { NotaValidator } from "./validators/nota";
import { PedidoValidator } from "./validators/pedido";

const pedidoValidator = new PedidoValidator();
const pedido = new Pedido(pedidoValidator)

const notaValidator = new NotaValidator(pedido)
const nota = new Nota(notaValidator)

pedido.validate();
nota.validate();

console.log("Tudo certo")