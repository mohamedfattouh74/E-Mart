import { createAction, props } from '@ngrx/store';

export const GET_CATEGORIES = '[Products Page] get categories';
export const GET_CATEGORIES_SUCCESS = '[Products Page] get categories success ';
export const GET_CATEGORIES_FAIL = '[Products Page] get categories fail';
export const SET_SELECTED_CATEGORY = '[Products Page] set selected category';

export const getCategories = createAction(GET_CATEGORIES);
export const getCategoriesSuccess = createAction(
  GET_CATEGORIES_SUCCESS,
  props<{ categories: string[] }>()
);
export const getCategoriesFail = createAction(
  GET_CATEGORIES_FAIL,
  props<{ error: string }>()
);

export const setSelectedCategory = createAction(
  SET_SELECTED_CATEGORY,
  props<{ selectedCategory: string }>()
);
