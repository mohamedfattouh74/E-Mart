import { inject } from '@angular/core';
import { CanActivateFn, CanLoadFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getIsLogged } from 'src/app/store/auth/auth.selectors';

export const authGuard: CanActivateFn | CanLoadFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  let isLogged = false;
  store.select(getIsLogged).subscribe((res) => {
    isLogged = res;
  });
  if (isLogged) {
    return true;
  } else {
    return router.parseUrl('/auth/login');
  }
};
