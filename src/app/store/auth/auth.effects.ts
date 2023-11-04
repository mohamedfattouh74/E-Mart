import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import {
  signIn,
  signInSuccess,
  signInFailed,
  signOut,
  createAccount,
  createAccountSuccess,
  createAccountFailed,
} from './auth.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toastrService: ToastrService,
    private route: Router
  ) {}
  createAccount$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createAccount),
        exhaustMap((action) => {
          return this.authService.signUp(action.user).pipe(
            map(() => {
              this.route.navigate(['/auth/login']);
              this.toastrService.success(
                'You successfully created a new account 🎉',
                'Welcome!'
              );
              return createAccountSuccess();
            }),
            catchError(async (err) => {
              createAccountFailed({ error: err });
              this.toastrService.error(err.error, 'Failed!');
            })
          );
        })
      ),
    { dispatch: false }
  );

  signnnIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signIn),
        exhaustMap((action) => {
          return this.authService.login(action.user).pipe(
            map(() => {
              this.route.navigate(['']);
              this.toastrService.success(
                'You successfully logged in 🎉',
                'Welcome!'
              );
              return signInSuccess({ user: action.user });
            }),
            catchError(async (err) => {
              signInFailed({ error: err });
              this.toastrService.error(err.error, 'Failed!');
            })
          );
        })
      ),
    { dispatch: false }
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      exhaustMap((action) => {
        return this.authService.login(action.user).pipe(
          map((loggedUser) => {
            return signInSuccess({ user: loggedUser });
          }),
          catchError(async (err) => {
            this.toastrService.error(err.error, 'Failed!');
            return signInFailed({ error: err });
          })
        );
      })
    )
  );
}
