import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useStore } from "effector-react/effector-react.mjs";
import NewCategoryUseCase from "../../useCases/NewCategoryUseCase/NewCategoryUseCase";
import CategoryStore from "../../stores/CategoryStore/CategoryStore";
import { NewCategoryButton } from "./styles";
import { Modal } from "../Modal";
import { Form, FormButton, FormError, FormInput } from "../../styles/global";
import { useRef } from "react";

interface FormProps {
    descricao: string,
}
const formSchema = yup
    .object({
        descricao: yup.string().required("O nome da categoria é obrigatório"),
    })
    .required();
export function CategoryModal() {
    const closeModalRef = useRef<HTMLButtonElement>(null);
    const { isLoading, hasError, errorMessage } = useStore(CategoryStore);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormProps>({
        resolver: yupResolver(formSchema)
    });
    async function handleCreateCategory({ descricao }: FormProps) {
        NewCategoryUseCase.execute({ descricao })
            .then(() => closeModalRef.current?.click())
            .finally(() => reset());
    }
    return (
        <Modal title="Nova categoria" closeModalRef={closeModalRef} trigger={<NewCategoryButton>Nova Categoria</NewCategoryButton>}>
            <Form onSubmit={handleSubmit(handleCreateCategory)}>
                <FormInput {...register("descricao")} placeholder="Descrição" required />
                {errors.descricao && (<FormError>{errors.descricao.message}</FormError>)}
                {hasError && <FormError>{errorMessage}</FormError>}
                <FormButton type="submit">{isLoading ? "Carregando..." : "Cadastrar"}</FormButton>
            </Form>
        </Modal>
    )
}
