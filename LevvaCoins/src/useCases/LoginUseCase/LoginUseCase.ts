import { router } from "../../Router";
import { LoginParams, LoginValues } from "../../domains/login";
import { RequestError } from "../../domains/request";
import { LoginService } from "../../services/LoginService/LoginService";
import { loadLogin, loadLoginDone, loadLoginFail } from "../../stores/LoginStore/LoginEvents";


const execute = async ({ email, senha }: LoginParams): Promise<void> => {
    loadLogin();
    const errorCallback = ({ hasError, message }: RequestError) => {
        loadLoginFail({ hasError, message });
    };
    return LoginService.authenticateUser({ email, senha })
        .then((user: LoginValues) => {
            window.localStorage.setItem("user", JSON.stringify(user));
            loadLoginDone();
            router.navigate("/home");
        }).catch(errorCallback);
}
const LoginUseCase = {
    execute,
}
export default LoginUseCase;