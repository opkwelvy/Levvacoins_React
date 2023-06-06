import { loadTransaction, loadCreateTransactionDone, loadTransactionDone, loadTransactionFail } from "./TransactionEvents";
import { TransactionState } from "./TransactionStates";
import { createStore } from "effector/compat";
const initialState: TransactionState = {
    isLoading: false,
    transactions: [],
    hasError: false,
    errorMessage: "",
};
const TransactionStore = createStore<TransactionState>(initialState)
    .on(loadTransaction, (state) => ({
        ...state,
        isLoading: true,
        hasError: false,
        errorMessage: "",
    }))
    .on(loadCreateTransactionDone, (state) => ({
        ...state,
        isLoading: false,
        hasError: false,
        errorMessage: "",
    }))
    .on(loadTransactionDone, (_, data) => ({
        isLoading: false,
        transactions: data,
        hasError: false,
        errorMessage: "",
    }))
    .on(loadTransactionFail, (state, data) => ({
        ...state,
        hasError: true,
        errorMessage: data.message,
        isLoading: false,
    }));
export default TransactionStore;