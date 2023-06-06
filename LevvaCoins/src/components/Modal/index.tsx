import { ReactNode, RefObject } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay } from "./styles";
import { X } from "@phosphor-icons/react";

interface ModalProps {
    closeModalRef?: RefObject<HTMLButtonElement>;
    title: string;
    trigger: ReactNode;
    children: ReactNode;
}
export function Modal({ closeModalRef, title, trigger, children }: ModalProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
            <Dialog.Portal>
                <Overlay />
                <Content>
                    <Dialog.Title>{title}</Dialog.Title>
                    <Dialog.Description />
                    <CloseButton ref={closeModalRef}><X size={24} /> </CloseButton>
                    {children}
                </Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
