import { MagnifyingGlass } from "@phosphor-icons/react";
import { SearchFormContainer } from "./styles";
import { SearchUseCase } from "../../useCases/SearchUseCase/SearchUseCase";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


interface FormProps {
    pesquisa: string,
}
export function SearchForm() {
    const formSchema = yup
    .object({
        pesquisa: yup.string()});
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<FormProps>({
        resolver: yupResolver(formSchema),
    });
    const handleSearchTransaction = async ({ pesquisa }: FormProps)=>{
        SearchUseCase.execute({ pesquisa }).finally(()=> reset());
    };
       return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
            <input type="text" placeholder="Busque por transações" {...register("pesquisa")}/>
            <button type="submit">
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}