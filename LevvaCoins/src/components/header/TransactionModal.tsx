import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useStore } from "effector-react/effector-react.mjs";
import CategoryStore from "../../stores/CategoryStore/CategoryStore";
import { NewTransactionButton } from "./styles";
import { Modal } from "../Modal";
import { Form, FormButton, FormError, FormInput, FormSelect, TransacitionTypeButton, TransactionTypeContainer } from "../../styles/global";
import { useEffect, useRef } from "react";
import TransactionStore from "../../stores/TransactionStore/TransactionStore";
import getCategoriesUseCase from "../../services/GetCategoriesUseCase/GetCategoriesUseCase";
import NewTransactionUseCase from "../../useCases/NewTransactionUseCase/NewTransactionUseCase";
import { ArrowCircleDown, ArrowCircleUp } from "@phosphor-icons/react";
interface FormProps {
    descricao: string;
    valor: number;
    tipo: string;
    categoriaId: string;
}
const formSchema = yup
    .object({
        descricao: yup.string().required("O nome da transação é obrigatório"),
        valor: yup.number().required("O valor da transação é obrigatório."),
        tipo: yup.string().oneOf(["income", "outcome"]).required("O tipo da transação é obrigatório"),
        categoriaId: yup.string().required("A categoria da transação é obrigatória"),
    }).required();
export function TransactionModal() {
    const closeModalRef = useRef<HTMLElement>(null);
    const { categories } = useStore(CategoryStore);
    const { isLoading, hasError, errorMessage } = useStore(TransactionStore);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FormProps>({
        resolver: yupResolver(formSchema),
    });

    useEffect(() => {
        getCategoriesUseCase.execute();
    }, []);
    async function handleCreateTransaction({
        descricao,
        valor,
        tipo,
        categoriaId,
    }: FormProps) {
        NewTransactionUseCase.execute({
            descricao,
            valor,
            tipo: tipo === "income" ? 0 : 1,
            categoriaId,
        })
            .then(() => closeModalRef.current?.click())
            .finally(() => reset());
    }
    return (
        <Modal title="Nova Transação" closeModalRef={closeModalRef} trigger={<NewTransactionButton>Nova transação</NewTransactionButton>}>
            <Form onSubmit={handleSubmit(handleCreateTransaction)}>
                <FormInput {...register("descricao")} placeholder="Descrição" />
                {errors.descricao && (
                    <FormError>{errors.descricao.message}</FormError>
                )}
                <FormInput {...register("valor")} type="number" placeholder="Preço" step="0.1" min="0" max="9999999" />
                {errors.valor && <FormError>{errors.valor.message}</FormError>}
                <FormSelect defaultValue=""   {...register("categoriaId")}>
                    <option value="" disabled hidden>
                        Categoria
                    </option>
                    {categories.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>{categoria.descricao}</option>
                    ))}
                </FormSelect>
                {errors.categoriaId && (<FormError>{errors.categoriaId.message}</FormError>)}
                <TransactionTypeContainer {...register("tipo")} onChange={(event) => setValue("tipo", event.target.value)}>
                    <TransacitionTypeButton variant="income" value="income">
                        <ArrowCircleUp size={24} />
                        Entrada
                    </TransacitionTypeButton>
                    <TransacitionTypeButton variant="outcome" value="outcome">
                        <ArrowCircleDown size={24} />
                        Saída
                    </TransacitionTypeButton>
                </TransactionTypeContainer>
                {errors.tipo && <FormError>{errors.tipo.message}</FormError>}
                {hasError && <FormError>{errorMessage}</FormError>}
                <FormButton type="submit">
                    {isLoading ? "Carregando..." : "Cadastrar"}
                </FormButton>
            </Form>
        </Modal>
    )
}