import { ReactNode } from "react";
import { HeaderContainer, HeaderContent, SingOutButton, UserAvatar } from "./styles";
import levvaCoinsLogo from "../../assets/Logo.svg";
import { Modal } from "../Modal";
import { Form, FormButton, FormInput } from "../../styles/global";
import { router } from "../../Router";
import { CategoryModal } from "./CategorryModal";
import { TransactionModal } from "./TransactionModal";

export function Header() {
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
                    <CategoryModal />
                    <TransactionModal />
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