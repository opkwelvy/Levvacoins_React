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
    description: string;
    amount: number;
    type: string;
    categoryId: string;
}
const formSchema = yup
    .object({
        description: yup.string().required("O nome da transação é obrigatório"),
        amount: yup.number().required("O valor da transação é obrigatório."),
        type: yup.string().oneOf(["income", "outcome"]).required("O valor da transação é obrigatório"),
        categoryId: yup.string().required("A categoria da transação é obrigatória"),
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
    async function handleCreateCategory({
        description,
        amount,
        type,
        categoryId,
    }: FormProps) {
        console.log({ description, amount, type, categoryId });
        NewTransactionUseCase.execute({
            description,
            amount,
            type: type === "income" ? 0 : 1,
            categoryId,
        })
            .then(() => closeModalRef.current?.click())
            .finally(() => reset());
    }
    return (
        <Modal title="Nova Transação" closeModalRef={closeModalRef} trigger={<NewTransactionButton>Nova transação</NewTransactionButton>}>
            <Form onSubmit={handleSubmit(handleCreateCategory)}>
                <FormInput {...register("description")} placeholder="Descrição" />
                {errors.description && (
                    <FormError>{errors.description.message}</FormError>
                )}
                <FormInput {...register("amount")} type="number" placeholder="Preço" step="0.1" min="0" max="9999999" />
                {errors.amount && <FormError>{errors.amount.message}</FormError>}
                <FormSelect {...register("categoryId")}>
                    <option value="" selected disabled hidden>
                        Categoria
                    </option>
                    {categories.map((category) => (
                        <option value={category.id}>{category.description}</option>
                    ))}
                </FormSelect>
                {errors.categoryId && (<FormError>{errors.categoryId.message}</FormError>)}
                <TransactionTypeContainer {...register("type")} onChange={(event) => setValue("type", event.target.value)}>
                    <TransacitionTypeButton variant="income" value="income">
                        <ArrowCircleUp size={24} />
                        Entrada
                    </TransacitionTypeButton>
                    <TransacitionTypeButton variant="outcome" value="outcome">
                        <ArrowCircleDown size={24} />
                        Saída
                    </TransacitionTypeButton>
                </TransactionTypeContainer>
                {errors.type && <FormError>{errors.type.message}</FormError>}
                {hasError && <FormError>{errorMessage}</FormError>}
                <FormButton type="submit">
                    {isLoading ? "Carregando..." : "Cadastrar"}
                </FormButton>
            </Form>
        </Modal>
    )
}