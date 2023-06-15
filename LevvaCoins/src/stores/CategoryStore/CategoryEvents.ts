import { createEvent } from "effector";
import { RequestError } from "../../domains/request";
import { CategoryValues } from "../../domains/category";
export const loadCategory = createEvent("loadCategory");
export const loadCreateCategoryDone = createEvent<CategoryValues>("loadCreateCategoryDone");
export const loadCategoryDone = createEvent<CategoryValues[]>("loadCategoryDone");
export const loadCategoryFail = createEvent<RequestError>("loadCategoryFail");