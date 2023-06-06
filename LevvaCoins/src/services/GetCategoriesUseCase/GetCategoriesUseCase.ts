import { CategoryService } from "../CategoryService/CategoryService";
import { loadCategory, loadCategoryDone, loadCategoryFail } from "../../stores/CategoryStore/CategoryEvents";
import { RequestError } from "../../domains/request";
import { CategoryValues } from "../../domains/category";
const execute = async (): Promise<void> => {

    loadCategory();
    return CategoryService.getCategories()
        .then((categories: CategoryValues[]) => {
            loadCategoryDone(categories)
        })
        .catch(({ hasError, message }: RequestError) => {
            loadCategoryFail({ hasError, message });
        });
};
const getCategoriesUseCase = {
    execute,
};
export default getCategoriesUseCase;