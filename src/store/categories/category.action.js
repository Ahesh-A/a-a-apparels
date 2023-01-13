import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { createAction } from "../../utils/reducer/reducer.util";

export const setCategoriesMap = (categoryArray) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoryArray);
