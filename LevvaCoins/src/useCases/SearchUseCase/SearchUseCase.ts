import { RequestError } from "../../domains/request";
import { loadTransaction, loadTransactionDone, loadTransactionFail } from "../../stores/TransactionStore/TransactionEvents";
import { SearchParams } from "../../domains/search";
import { SearchService } from "../../services/SearchService/SearchService";
import { TransactionValues } from "../../domains/transaction";
const execute = async ({ pesquisa }: SearchParams): Promise<void> => {
  loadTransaction();
  return SearchService.searchFormService({ pesquisa })
  .then((response: TransactionValues[])=>{
    loadTransactionDone(response)
  })
  .catch(({ hasError, message }: RequestError)=>{
    loadTransactionFail({ hasError, message });
    throw new Error();
  })
}
export const SearchUseCase = {
  execute,
}