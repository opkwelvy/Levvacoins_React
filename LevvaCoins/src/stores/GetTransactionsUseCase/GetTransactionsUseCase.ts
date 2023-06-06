import { TransactionService } from "../../services/TransactionService/TransactionService";
import { loadTransaction, loadTransactionDone, loadTransactionFail } from "../TransactionStore/TransactionEvents";
import { TransactionValues } from "../../domains/transaction";
import { RequestError } from "../../domains/request";
const execute = async (): Promise<void> => {
    const errorCallback = ({ hasError, message }: RequestError) => {
        loadTransactionFail({ hasError, message });
    }
    loadTransaction();
    return TransactionService.getTransactions()
        .then((transactions: TransactionValues[]) => {
            loadTransactionDone(transactions)
        })
        .catch(errorCallback);
};
const GetTransactionsUseCase = {
    execute,
};
export default GetTransactionsUseCase;