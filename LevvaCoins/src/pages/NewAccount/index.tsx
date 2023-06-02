import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthLayout } from "../../layouts/AuthLayout";
import { Form, FormButton, FormError, FormInput, FormLink } from "../../styles/global";
import NewAccountUseCase from "../../useCases/NewAccountUseCase/NewAccountUseCase";
import { useStore } from "effector-react";
import NewAccountStore from "../../stores/NewAccountStore/NewAccountStore";
interface FormProps {
    name: string,
    email: string,
    password: string,
    confirmpassword: string,
}
const formSchema = yup
    .object({
        name: yup.string().required("O nome é obrigatório"),
        email: yup
            .string()
            .email("Digite um email válido")
            .required("O e-mail é obrigatório"),
        password: yup
            .string()
            .required("A senha é obrigatória"),
        confirmpassword: yup
            .string()
            .required("A confirmação de senha é obrigatória")
    })
    .required();


export function NewAccount() {
    const { isLoading, hasError, errorMessage } = useStore(NewAccountStore)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormProps>({
        resolver: yupResolver(formSchema),
    });
    function handleNewAccount({
        name,
        email,
        password,
        confirmpassword,
    }: FormProps) {
        NewAccountUseCase.execute({ name, email, password, confirmpassword })
    }
    return (
        <AuthLayout title="Cadastro" subtitle="Crie sua conta e começe a gerenciar suas finanças.">
            <Form onSubmit={handleSubmit(handleNewAccount)}>
                <FormInput {...register("name")} placeholder="Nome e Sobrenome" />
                {errors.name && <FormError>{errors.name.message}</FormError>}
                <FormInput {...register("email")} placeholder="E-mail" />
                {errors.email && <FormError>{errors.email.message}</FormError>}
                <FormInput {...register("password")} placeholder="Senha" />
                {errors.password && <FormError>{errors.password.message}</FormError>}
                <FormInput {...register("confirmpassword")} placeholder="Confirme a senha" />
                {errors.confirmpassword && <FormError>{errors.confirmpassword.message}</FormError>}
                {hasError && <FormError>{errorMessage}</FormError>}
                <FormLink to="/login">Já tem uma conta? Faça login agora!</FormLink>
                <FormButton type="submit">{isLoading ? "Carregando..." : "Cadastrar"}</FormButton>
            </Form>
        </AuthLayout>
    );
}