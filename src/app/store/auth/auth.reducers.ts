import { createReducer, on } from '@ngrx/store';
import { signIn, signInFailed, signInSuccess, signOut } from './auth.actions';
import { authState } from './auth.state';

export const authReducer = createReducer(
  authState,
  on(signIn, (state) => {
    return {
      ...state,
    };
  }),
  on(signInSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      isLogged: true,
    };
  }),
  on(signInFailed, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(signOut, (state) => {
    return {
      ...state,
      user: {},
      isLogged: false,
      error: '',
    };
  })
);
