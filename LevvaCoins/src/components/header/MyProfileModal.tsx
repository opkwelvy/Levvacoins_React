import { ReactNode, useRef, useState } from "react";
import { useStore } from "effector-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import icon from "../../assets/icon.jpg";
import { SignOutButton, UserAvatar } from "./styles";
import { Modal } from "../Modal";
import { Form, FormButton, FormError, FormInput } from "../../styles/global";
import { router } from "../../Router";
import { LoginValues } from "../../domains/login";
import UpdateProfileUseCase from "../../useCases/UpdateProfileUseCase.ts/UpdateProfileUseCase";
import ProfileStore from "../../stores/ProfileStore/ProfileStore";

interface FormProps {
  nome: string;
}

const formSchema = yup
  .object({
    nome: yup.string().required("O nome é obrigatório."),
  })
  .required();

const userAvatar: ReactNode = <UserAvatar src={icon} alt="Ícone" />;

export function MyProfileModal() {
  const closeModalRef = useRef<HTMLButtonElement>(null);

  const { isLoading, hasError, errorMessage } = useStore(ProfileStore);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormProps>({ resolver: yupResolver(formSchema) });

  const [user, setUser] = useState<LoginValues | null>(() => {
    const storageUser = JSON.parse(window.localStorage.getItem("user") ?? "{}") as LoginValues;

    if (!storageUser) return null;

    setValue("nome", storageUser.nome);

    return storageUser;
  });

  async function handleUpdateProfile({ nome }: FormProps) {
    console.log("teste UseCase");
    if (user?.id)
      UpdateProfileUseCase.execute({ id: user.id, nome }).then(() =>
        closeModalRef.current?.click(),
      );
    setUser(oldUser => ({ ...oldUser, nome: nome } as LoginValues));
  }
  function handleError(error){
    console.log(error);
  }
  function handleSignOut() {
    window.localStorage.removeItem("user");
    router.navigate("/login");
  }

  return (
    <Modal title="Meu perfil" closeModalRef={closeModalRef} trigger={userAvatar}>
      <Form onSubmit={handleSubmit(handleUpdateProfile, handleError)}>
        <UserAvatar src={icon} alt="User Icon" variant="large" />
        <FormInput {...register("nome")} type="nome" defaultValue={user?.nome} />
        {errors.nome && <FormError>{errors.nome.message}</FormError>}
        <FormInput type="email" placeholder={user?.email} disabled />
        {hasError && <FormError>{errorMessage}</FormError>}
        <FormButton type="submit">{isLoading ? "Carregando..." : "Atualizar"}</FormButton>
      </Form>
      <SignOutButton type="button" onClick={handleSignOut}>
        Sair
      </SignOutButton>
    </Modal>
  );
}