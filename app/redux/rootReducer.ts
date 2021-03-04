import { combineReducers } from "redux";
import {
  reducer as apiReducer,
  createInitialState as apiInitialState,
} from "./modules/apiModule";
import {
  reducer as authReducer,
  createInitialState as authInitialState,
} from "./modules/authModule";
import ModuleNameSpaces from "./modules/ModuleNameSpaces";

export const initialState = {
  ...apiInitialState(),
  ...authInitialState(),
};

const rootReducers = combineReducers({
  [ModuleNameSpaces.Api]: apiReducer,
  [ModuleNameSpaces.Auth]: authReducer,
});

export default rootReducers;
