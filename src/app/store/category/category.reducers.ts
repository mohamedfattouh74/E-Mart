import { createReducer, on } from '@ngrx/store';
import { categoryState } from './category.state';
import {
  getCategories,
  getCategoriesFail,
  getCategoriesSuccess,
  setSelectedCategory,
} from './category.actions';
export const categoryReducer = createReducer(
  categoryState,
  on(getCategories, (state) => {
    return {
      ...state,
    };
  }),
  on(getCategoriesSuccess, (state, action) => {
    return {
      ...state,
      categories: action.categories,
      error: '',
    };
  }),
  on(getCategoriesFail, (state, action) => {
    return {
      ...state,
      categories: [],
      error: action.error,
    };
  }),
  on(setSelectedCategory, (state, action) => {
    return {
      ...state,
      selectedCategory: action.selectedCategory,
    };
  })
);
