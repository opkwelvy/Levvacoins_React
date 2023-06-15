import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar, Money } from "@phosphor-icons/react";
import { useStore } from "effector-react/effector-react.umd";
import { SummaryCard, SummaryContainer } from "./styles";
import { defaultTheme } from "../../styles/defaulTheme";
import TransactionStore from "../../stores/TransactionStore/TransactionStore";
export function Summary() {
    const { transactions } = useStore(TransactionStore)
    const money = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    const summary = transactions.reduce((acc, transactions) => {
        if (transactions.tipo == 0) {
            acc.deposits += transactions.valor;
            acc.total += transactions.valor;
        } else {
            acc.withdraws += transactions.valor;
            acc.total -= transactions.valor;
        }
        return acc
    },
        {
            deposits: 0,
            withdraws: 0,
            total: 0,
        })

    return (
        <SummaryContainer>
            <SummaryCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color={defaultTheme["yellow-500"]} />
                </header>
                <strong>{money.format(summary.deposits)}</strong>
            </SummaryCard>
            <SummaryCard>
                <header>
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color={defaultTheme["red-500"]} />
                </header>
                <strong>{money.format(summary.withdraws)}</strong>
            </SummaryCard>
            <SummaryCard variant="balance">
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color={defaultTheme["yellow-500"]} />
                </header>
                <strong>{money.format(summary.total)}</strong>
            </SummaryCard>
        </SummaryContainer>
    )
}