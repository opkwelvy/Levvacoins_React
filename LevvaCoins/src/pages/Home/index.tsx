import { useEffect } from "react";
import { useStore } from "effector-react/compat";
import TransactionStore from "../../stores/TransactionStore/TransactionStore";
import GetTransactionsUseCase from "../../stores/GetTransactionsUseCase/GetTransactionsUseCase";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { Header } from "../../components/header";
import { HomeWrapper, PriceHighLight, TransactionTabEmpty, TransactionsContainer, TransactionsTable } from "./styes";
import { Trash } from "@phosphor-icons/react";
import { defaultTheme } from "../../styles/defaulTheme";

export function Home() {
    const { isLoading, transactions } = useStore(TransactionStore);
    const money = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    const data = new Intl.DateTimeFormat('pt-BR',{
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second:'2-digit',
        hour12: false
    })
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
                        <tr>
                            <td>Descrição</td>
                            <td>Preço</td>
                            <td>Categoria</td>
                            <td>Data</td>
                            <td>Excluir</td>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 && transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td width="50%">{transaction.descricao}</td>
                                <td><PriceHighLight variant={transaction.tipo === 0 ? "income" : "outcome"}>{money.format(transaction.valor)}</PriceHighLight></td>
                                <td>{transaction.categoria.descricao}</td>
                                <td>{data.format(new Date(transaction.data))}</td>
                                <td><Trash size={32} color={defaultTheme["red-500"]}/></td>
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