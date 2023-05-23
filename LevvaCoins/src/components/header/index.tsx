import { HeaderContainer, HeaderContent, NewCategoryButton, NewTransactionButton, UserAvatar } from "./styles";
import levvaCoinsLogo from "../../assets/Logo.svg";
export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={levvaCoinsLogo} alt="levva Coins" />
                <div>
                    <NewCategoryButton>Nova Categoria</NewCategoryButton>
                    <NewTransactionButton>Nova Transação</NewTransactionButton>
                </div>
            </HeaderContent>
            <UserAvatar src="https://github.com/jemluz.png" alt="Jemima" />
        </HeaderContainer>
    )
}