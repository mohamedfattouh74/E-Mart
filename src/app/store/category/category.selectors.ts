import { createFeatureSelector, createSelector } from '@ngrx/store';
import { categoryStateModel } from './category.model';

export const getCategoriesList =
  createFeatureSelector<categoryStateModel>('categories');

export const getCategoriesSelector = createSelector(
  getCategoriesList,
  (state) => {
    return state.categories;
  }
);

export const getSelectedCategory = createSelector(
  getCategoriesList,
  (state) => {
    return state.selectedCategory;
  }
);

export const getCategoryError = createSelector(getCategoriesList, (state) => {
  return state.error;
});
