import { History } from "history";
import { all, fork, setContext } from "redux-saga/effects";
import { sagas as authSagas } from "./modules/authModule";

export default function* rootSaga(history: History) {
  yield setContext({ history });
  yield all([fork(authSagas.login)]);
  yield all([fork(authSagas.logout)]);
  yield all([fork(authSagas.checkLogin)]);
}
