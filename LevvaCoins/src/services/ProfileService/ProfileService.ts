import { AxiosError } from "axios";
import Api from "../../clients/api/Api";
import { RequestError } from "../../domains/request";
import { ProfileParams } from "../../domains/profile";
const updateUser = async ({ nome }: ProfileParams): Promise<void> => {
  return Api.put({
    url: `/Usuario`,
    body: {
      nome,
    },
  })
    .then(response => {
      return response.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

export const ProfileService = {
  updateUser,
};