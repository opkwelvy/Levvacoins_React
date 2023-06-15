import { createEvent } from "effector";
import { RequestError } from "../../domains/request";
import { TransactionValues } from "../../domains/transaction";
export const loadTransaction = createEvent("loadTransaction");
export const loadCreateTransactionDone = createEvent<TransactionValues>("loadCreateTransactionDone");
export const loadTransactionDone = createEvent<TransactionValues[]>("loadTransactionDone");
export const loadTransactionFail = createEvent<RequestError>("loadTransactionFail");
export const deleteTransactionDone = createEvent<TransactionValues>("deleteTransactionDone");
export const deleteTransactionFail = createEvent<RequestError>("deleteTransactionFail")
