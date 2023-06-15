import { AxiosError } from "axios";
import Api from "../../clients/api/Api";
import { RequestError } from "../../domains/request";
import { NewTransactionParams, TransactionValues } from "../../domains/transaction";
const createTransaction = async ({
    descricao,
    valor,
    tipo,
    categoriaId,
}: NewTransactionParams): Promise<TransactionValues> => {
    return Api.post({
        url: "/Transacao/Create",
        body: {
            descricao,
            valor,
            tipo,
            categoriaId,
        },
    })
        .then((response) => {
            return response.data;
        })
        .catch((err: AxiosError<RequestError>) => {
            throw err.response?.data;
        });
};
const getTransactions = async (): Promise<TransactionValues[]> => {
    return Api.get({
        url: "/Transacao/list",
    })
        .then((response) => {
            return response.data;
        })
        .catch((err: AxiosError<RequestError>) => {
            throw err.response?.data;
        });
};
export const TransactionService = {
    createTransaction,
    getTransactions,
}