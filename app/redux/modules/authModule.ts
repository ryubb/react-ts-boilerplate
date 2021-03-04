import { take, putResolve, apply } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { actions as apiActions } from "./apiModule";

import ModuleNameSpaces from "./ModuleNameSpaces";

const namespace = ModuleNameSpaces.Auth;

type AuthState = {
  loading: boolean;
  loaded: boolean;
  isLoggedIn: boolean;
};

// todo: 型定義
export type State = { [key: string]: AuthState };

const initialState: AuthState = {
  loading: false,
  loaded: false,
  isLoggedIn: false,
};

export const createInitialState = () => ({
  [namespace]: initialState,
});

export const selectors = {
  isLoggedIn: (state: State) => state[namespace].isLoggedIn,
};

const slice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    loginRequest: {
      reducer: (state: AuthState) => ({
        ...state,
        loading: true,
      }),
      prepare: (
        values: { email: string; password: string },
        next?: () => void
      ) => ({ payload: { values, next } }),
    },
    loginSuccess: {
      reducer: (
        state: AuthState,
        {
          payload: { access, refresh },
        }: PayloadAction<{ access: string; refresh: string }>
      ) => ({
        ...state,
        loading: false,
        loaded: true,
        isLoggedIn: true,
        access,
        refresh,
      }),
      prepare: (access: string, refresh: string) => ({
        payload: { access, refresh },
      }),
    },
    loginFailure: (state: AuthState) => ({
      ...state,
      isLoggedIn: false,
      loading: false,
    }),
    logoutRequest: (state: AuthState) => ({ ...state }),
    logoutSuccess: (state: AuthState) => ({ ...state }),

    checkLoginRequest: {
      reducer: (state: AuthState) => ({
        ...state,
        loading: true,
        loaded: false,
      }),
      prepare: (next?: () => void, failure?: () => void) => ({
        payload: { next, failure },
      }),
    },
    checkLoginSuccess: (state: AuthState) => ({
      ...state,
      loading: false,
      loaded: true,
      isLoggedIn: true,
    }),
    checkLoginFailure: (state: AuthState) => ({
      ...state,
      loading: false,
      loaded: true,
      isLoggedIn: false,
    }),
  },
});

export const { actions, reducer } = slice;

export const sagas = {
  *login(): SagaIterator {
    while (true) {
      const action = yield take(actions.loginRequest);

      try {
        const { values, next } = action.payload;
        const { access, refresh } = yield putResolve(
          apiActions.call(() => console.log("apiを叩く", values))
        );

        yield apply(localStorage, localStorage.setItem, ["access", access]);
        yield apply(localStorage, localStorage.setItem, ["refresh", refresh]);

        yield putResolve(actions.loginSuccess(access, refresh));
        if (next) yield next();
      } catch (e) {
        yield putResolve(actions.loginFailure());
      }
    }
  },

  *logout(): SagaIterator {
    yield take(actions.logoutRequest);
    yield apply(localStorage, localStorage.removeItem, ["access"]);
    yield putResolve(actions.logoutSuccess());
    // TODO history.pushで画面遷移したいが、pathが変わるだけでコンポーネントが変化しない
    // const history = yield getContext("history");
    // yield call(history.push, "/login");
  },

  *checkLogin(): SagaIterator {
    while (true) {
      const action = yield take(actions.checkLoginRequest);
      const { next, failure } = action.payload;

      try {
        const access = yield apply(localStorage, localStorage.getItem, [
          "access",
        ]);

        if (!access) throw new Error("tokenが存在しません");
        yield putResolve(apiActions.call(() => console.log("apiを叩く")));
        yield putResolve(actions.checkLoginSuccess());
        if (next) yield next();
      } catch (e) {
        yield putResolve(actions.checkLoginFailure());

        if (failure) yield failure();
      }
    }
  },
};
