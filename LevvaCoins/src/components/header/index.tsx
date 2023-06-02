import { ReactNode } from "react";
import { HeaderContainer, HeaderContent, NewCategoryButton, NewTransactionButton, SingOutButton, UserAvatar } from "./styles";
import levvaCoinsLogo from "../../assets/Logo.svg";
import { Modal } from "../Modal";
import { Form, FormButton, FormInput, TransacitionTypeButton, TransactionTypeContainer } from "../../styles/global";
import { ArrowCircleDown, ArrowCircleUp } from "@phosphor-icons/react";
import { router } from "../../Router";

export function Header() {
    const newCategoryButton: ReactNode = (<NewCategoryButton>Nova categoria</NewCategoryButton>);
    const newTransactionButton: ReactNode = (<NewTransactionButton>Nova transação</NewTransactionButton>);
    const userAvatar: ReactNode = (<UserAvatar src="https://github.com/jemluz.png" alt="Jemima" />);

    function handleSingOut() {
        window.localStorage.removeItem("user");
        router.navigate("/login");
    }
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={levvaCoinsLogo} alt="levva Coins" />
                <div>
                    <Modal title="Nova categoria" trigger={newCategoryButton}>
                        <Form>
                            <FormInput type="text" placeholder="Descrição" required />
                            <FormButton type="submit">Cadastrar</FormButton>
                        </Form>
                    </Modal>
                    <Modal title="Nova transação" trigger={newTransactionButton}>
                        <Form>
                            <FormInput type="text" placeholder="Descrição" required />
                            <FormInput type="number" placeholder="Preço" required />
                            <FormInput type="text" placeholder="Categoria" required />
                            <TransactionTypeContainer>
                                <TransacitionTypeButton variant="income" value="income">
                                    <ArrowCircleUp size={24} />
                                    Entrada
                                </TransacitionTypeButton>
                                <TransacitionTypeButton variant="outcome" value="outcome">
                                    <ArrowCircleDown size={24} />
                                    Saída
                                </TransacitionTypeButton>
                            </TransactionTypeContainer>
                            <FormButton type="submit">Cadastrar</FormButton>
                        </Form>
                    </Modal>
                </div>
                <Modal title="Meu perfil" trigger={userAvatar}>
                    <Form>
                        <UserAvatar
                            src="https://github.com/jemluz.png"
                            alt="foto de perfil (Jemina)"
                            variant="large" />
                        <FormInput type="name" value="Jemima Luz" />
                        <FormInput type="email" placeholder="jemima.luz@levva.io" disabled />
                        <FormButton type="submit">Atualizar</FormButton>
                        <SingOutButton type="button" onClick={handleSingOut}>
                            Sair
                        </SingOutButton>

                    </Form>
                </Modal>
            </HeaderContent>

        </HeaderContainer>
    )
}