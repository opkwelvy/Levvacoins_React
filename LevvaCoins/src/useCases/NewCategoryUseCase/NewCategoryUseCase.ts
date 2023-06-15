import { CategoryService } from "../../services/CategoryService/CategoryService";
import { loadCategory, loadCreateCategoryDone, loadCategoryFail } from "../../stores/CategoryStore/CategoryEvents";
import { RequestError } from "../../domains/request";
import { NewCategoryParams } from "../../domains/category";
const execute = async ({ descricao }: NewCategoryParams): Promise<void> => {
    const errorCallback = ({ hasError, message }: RequestError) => {
        loadCategoryFail({ hasError, message });
        throw new Error();
    };
    loadCategory();
    return CategoryService.createCategory({
        descricao,
    })
        .then((category) => {
            loadCreateCategoryDone( category );
        })
        .catch(errorCallback);
};
const NewCategoryUseCase = {
    execute,
};
export default NewCategoryUseCase;