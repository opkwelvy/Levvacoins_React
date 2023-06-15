import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthLayout } from "../../layouts/AuthLayout";
import { Form, FormButton, FormError, FormInput, FormLink } from "../../styles/global";
import NewAccountUseCase from "../../useCases/NewAccountUseCase/NewAccountUseCase";
import { useStore } from "effector-react";
import NewAccountStore from "../../stores/NewAccountStore/NewAccountStore";
interface FormProps {
    nome: string,
    email: string,
    senha: string,
    confirmSenha: string,
}
const formSchema = yup
    .object({
        nome: yup.string().required("O nome é obrigatório"),
        email: yup
            .string()
            .email("Digite um email válido")
            .required("O e-mail é obrigatório"),
        senha: yup
            .string()
            .required("A senha é obrigatória"),
        confirmSenha: yup
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
        nome,
        email,
        senha,
        confirmSenha,
    }: FormProps) {
        NewAccountUseCase.execute({ nome, email, senha, confirmSenha })
    }
    return (
        <AuthLayout title="Cadastro" subtitle="Crie sua conta e começe a gerenciar suas finanças.">
            <Form onSubmit={handleSubmit(handleNewAccount)}>
                <FormInput {...register("nome")} placeholder="Nome e Sobrenome" />
                {errors.nome && <FormError>{errors.nome.message}</FormError>}
                <FormInput {...register("email")} placeholder="E-mail" />
                {errors.email && <FormError>{errors.email.message}</FormError>}
                <FormInput {...register("senha")} type="password" placeholder="Senha" />
                {errors.senha && <FormError>{errors.senha.message}</FormError>}
                <FormInput {...register("confirmSenha")} type="password" placeholder="Confirme a senha" />
                {errors.confirmSenha && <FormError>{errors.confirmSenha.message}</FormError>}
                {hasError && <FormError>{errorMessage}</FormError>}
                <FormLink to="/login">Já tem uma conta? Faça login agora!</FormLink>
                <FormButton type="submit">{isLoading ? "Carregando..." : "Cadastrar"}</FormButton>
            </Form>
        </AuthLayout>
    );
}