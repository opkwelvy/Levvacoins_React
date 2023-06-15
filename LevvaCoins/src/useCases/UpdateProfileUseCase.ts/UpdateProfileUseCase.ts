import { LoginValues } from "../../domains/login";
import { ProfileParams } from "../../domains/profile";
import { RequestError } from "../../domains/request";
import { ProfileService } from "../../services/ProfileService/ProfileService";
import { loadProfile,loadProfileDone,loadProfileFail,
} from "../../stores/ProfileStore/ProfileEvents";
const execute = async ({ id, nome }: ProfileParams): Promise<void> => {
  loadProfile();

  return ProfileService.updateUser({ id, nome })
    .then(() => {
      const user = JSON.parse(window.localStorage.getItem("user") ?? "{}") as LoginValues;
      console.log("teste UseCase");
      user.nome = nome;
      window.localStorage.setItem("user", JSON.stringify(user));
      loadProfileDone();

      //navegar o usuario logado para a home
    })
    .catch(({ hasError, message }: RequestError) => {
      loadProfileFail({ hasError, message });
    });
};

const UpdateProfileUseCase = {
  execute,
};

export default UpdateProfileUseCase;