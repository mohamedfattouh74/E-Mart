import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { getCategories, getCategoriesSuccess } from './category.actions';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService
  ) {}
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategories),
      exhaustMap(() => {
        return this.categoriesService.getCategories().pipe(
          map((categoriess) => {
            return getCategoriesSuccess({ categories: categoriess });
          }),
          catchError((err) => EMPTY)
        );
      })
    )
  );
}
