import { TransactionService } from "../../services/TransactionService/TransactionService";
import {
    loadTransaction,
    loadCreateTransactionDone,
    loadTransactionFail
} from "../../stores/TransactionStore/TransactionEvents";
import { NewTransactionParams } from "../../domains/transaction";
import { RequestError } from "../../domains/request";
const execute = async ({
    descricao,
    valor,
    tipo,
    categoriaId,
}: NewTransactionParams): Promise<void> => {
    loadTransaction();
    return TransactionService.createTransaction({
        descricao,
        valor,
        tipo,
        categoriaId,
    })
        .then((transaction) => {
            loadCreateTransactionDone(transaction);
        })
        .catch(({ hasError, message }: RequestError) => {
            loadTransactionFail({ hasError, message });
            throw new Error();
        });
};
const NewTransactionUseCase = {
    execute,
}
export default NewTransactionUseCase;