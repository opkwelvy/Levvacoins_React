import { AxiosError } from "axios";
import Api from "../../clients/api/Api";
import { CategoryValues, NewCategoryParams } from "../../domains/category";
import { RequestError } from "../../domains/request";
const createCategory = async ({
    descricao,
}: NewCategoryParams): Promise<CategoryValues> => {
    return Api.post({
        url: "/Categoria/Create",
        body: {
            descricao,
        },
    })
        .then((response) => {
            return response.data;
        })
        .catch((err: AxiosError<RequestError>) => {
            throw err.response?.data;
        });
};
const getCategories = async (): Promise<CategoryValues[]> => {
    return Api.get({
        url: "/Categoria/list",
    })
        .then((response) => {
            return response.data
        })
        .catch((err: AxiosError<RequestError>) => {
            throw err.response?.data;
        })
}
export const CategoryService = {
    createCategory,
    getCategories,
}