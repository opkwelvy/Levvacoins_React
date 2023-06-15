import { CategoryValues } from "../category";

export interface NewTransactionParams {
    descricao: string;
    valor: number;
    tipo: number;
    categoriaId: string;
}
export interface TransactionValues {
    id: string,
    descricao: string;
    valor: number;
    tipo: number;
    categoria: CategoryValues;
    data: string;
}