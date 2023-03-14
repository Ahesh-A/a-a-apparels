import { takeLatest, all, call, put } from "redux-saga/effects";

import {
  fetchCategoriesSuccess,
  fetchCategoriesError,
} from "./category.action";

import { getCategoriesAndDocs } from "../../utils/firebase/firebse.utils";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {

  try {
    const categoriesArray = yield call(getCategoriesAndDocs, "categories");

    console.log(categoriesArray);
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesError(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}

