import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { Header } from "../../components/header";
import { HomeWrapper } from "./styes";

export function Home() {
    return (
        <HomeWrapper>
            <Header />
            <Summary />
            <SearchForm />
        </HomeWrapper>
    );
}