import Api from "../../clients/api/Api";
import { AxiosError } from "axios";
import { RequestError } from "../../domains/request";
import { SearchParams } from "../../domains/search";
import { TransactionValues } from "../../domains/transaction";
const searchFormService = async ({ pesquisa }: SearchParams): Promise<TransactionValues[]> => {
  if(pesquisa == ""){
    return Api.get({
      url: "/Transacao/list",
    })
      .then(response => {
        return response.data;
      })
      .catch((err: AxiosError<RequestError>) => {
        throw err.response?.data;
      });
  }else{
    return Api.get({
      url: `/Transacao/${pesquisa}`,
    })
      .then(response => {
        return response.data;
      })
      .catch((err: AxiosError<RequestError>) => {
        throw err.response?.data;
      });
  }

};
export const SearchService = {
  searchFormService,
}