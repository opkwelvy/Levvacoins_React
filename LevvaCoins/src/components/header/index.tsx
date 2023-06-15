import { ReactNode } from "react";
import { HeaderContainer, HeaderContent, SignOutButton, UserAvatar } from "./styles";
import levvaCoinsLogo from "../../assets/Logo.svg";
import { Modal } from "../Modal";
import { Form, FormButton, FormInput } from "../../styles/global";
import { router } from "../../Router";
import { CategoryModal } from "./CategorryModal";
import { TransactionModal } from "./TransactionModal";
import { MyProfileModal } from "./MyProfileModal";

export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={levvaCoinsLogo} alt="levva Coins" />
                <div>
                    <CategoryModal />
                    <TransactionModal />
                </div>
                <MyProfileModal/>
            </HeaderContent>

        </HeaderContainer>
    )
}