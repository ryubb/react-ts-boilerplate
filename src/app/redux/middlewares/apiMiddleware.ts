import { Middleware } from "redux";
import { actions as apiActions } from "../modules/apiModule";
import { actions as authActions } from "../modules/authModule";

const apiMiddleWare: Middleware = ({ dispatch }) => (next) => async (
  action
) => {
  if (action.type === apiActions.call.toString()) {
    try {
      const res = await action.payload.api();
      await dispatch(apiActions.callSuccess(res));
      return res;
    } catch (e) {
      const res = e.response || {};
      if (res.status === 401) {
        // 認証切れてリダイレクトさせるためのmiddleware
        await dispatch(authActions.logoutRequest());
      }
      await dispatch(apiActions.callFailure(e));
      throw e;
    }
  }
  return next(action);
};

export default apiMiddleWare;
