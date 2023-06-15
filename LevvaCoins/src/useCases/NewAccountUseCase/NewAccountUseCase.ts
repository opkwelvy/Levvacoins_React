import { NewAccountService } from "../../services/NewAccountService/NewAccountService";
import { loadNewAccount, loadNewAccountDone, loadNewAccountFail } from "../../stores/NewAccountStore/NewAccountEvents";
import { router } from "../../Router";
import { NewAccountParams } from "../../domains/newAccount";
import { RequestError } from "../../domains/request";
const execute = async ({
    nome,
    email,
    senha,
    confirmSenha,
}: NewAccountParams): Promise<void> => {
    loadNewAccount();

    const errorCallback = ({ hasError, message }: RequestError) => {
        loadNewAccountFail({ hasError, message });
    };
    return NewAccountService.createUser({
        nome,
        email,
        senha,
        confirmSenha,
    })
        .then(() => {
            loadNewAccountDone();
            router.navigate("/login");;
        })
        .catch(errorCallback);
};
const NewAccountUseCase = {
    execute,
};
export default NewAccountUseCase;