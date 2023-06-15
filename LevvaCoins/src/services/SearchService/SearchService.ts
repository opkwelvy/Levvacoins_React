import Api from "../../clients/api/Api";
import { AxiosError } from "axios";
import { RequestError } from "../../domains/request";
import { SearchParams } from "../../domains/search";
const searchForm = async ({ pesquisa }: SearchParams): Promise<void> => {
  return Api.get({
    url: `/Transaction`,
    body: {
      pesquisa,
    },
  })
    .then(response => {
      return response.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};
export const SearchService = {
  searchForm,
}