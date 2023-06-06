import { useEffect } from "react";
import { useStore } from "effector-react/compat";
import TransactionStore from "../../stores/TransactionStore/TransactionStore";
import GetTransactionsUseCase from "../../stores/GetTransactionsUseCase/GetTransactionsUseCase";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { Header } from "../../components/header";
import { HomeWrapper, PriceHighLight, TransactionTabEmpty, TransactionsContainer, TransactionsTable } from "./styes";

export function Home() {
    const { isLoading, transactions } = useStore(TransactionStore);
    useEffect(() => {
        GetTransactionsUseCase.execute();
    }, []);
    return (
        <HomeWrapper>
            <Header />
            <Summary />
            <SearchForm />
            <TransactionsContainer>
                <TransactionsTable>
                    <thead>
                        <td>Descrição</td>
                        <td>Preço</td>
                        <td>Categoria</td>
                        <td>Data</td>
                    </thead>
                    <tbody>
                        {transactions.length > 0 && transactions.map((transaction) => (
                            <tr>
                                <td width="50%">{transaction.description}</td>
                                <td><PriceHighLight variant={transaction.type === 0 ? "income" : "outcome"}>{transaction.amount}</PriceHighLight></td>
                                <td>{transaction.category.description}</td>
                                <td>{transaction.createAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </TransactionsTable>
                {!isLoading && transactions.length === 0 && (
                    <TransactionTabEmpty>
                        Adicione uma categoria e sua primeira transação :p
                    </TransactionTabEmpty>
                )}
            </TransactionsContainer>
        </HomeWrapper >
    );
}