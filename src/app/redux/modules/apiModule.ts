import { createSlice } from "@reduxjs/toolkit";
import ModuleNameSpaces from "./ModuleNameSpaces";

const namespace = ModuleNameSpaces.Api;
const initialState = {};

export const createInitialState = () => ({ [namespace]: initialState });

const slice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    call: {
      reducer: (state) => ({ ...state }),
      prepare: (api: any) => ({
        payload: { api },
      }),
    },
    callSuccess: {
      reducer: (state) => ({ ...state }),
      prepare: (res: any = {}) => ({
        payload: { res },
      }),
    },
    callFailure: {
      reducer: (state) => ({ ...state }),
      prepare: (err: any) => ({
        payload: { err },
      }),
    },
  },
});

export const { actions, reducer } = slice;
