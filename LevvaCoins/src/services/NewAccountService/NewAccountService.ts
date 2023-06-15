import { AxiosError } from "axios";
import Api from "../../clients/api/Api";
import { NewAccountParams } from "../../domains/newAccount";
import { RequestError } from "../../domains/request";
const createUser = async ({
    nome,
    email,
    senha,
    confirmSenha,
}: NewAccountParams): Promise<void> => {
    return Api.post({
        url: "/Usuario/Create",
        body: {
            nome,
            email,
            senha,
            confirmSenha,
        },
    })
        .then((response) => {
            return response.data;
        })
        .catch((err: AxiosError<RequestError>) => {
            throw err.response?.data;
        });
};
export const NewAccountService = {
    createUser,
}