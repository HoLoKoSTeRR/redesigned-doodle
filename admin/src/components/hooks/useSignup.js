import { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import {useAuthProvider,resetNotification} from "ra-core";
const defaultAuthParams = {
  signupUrl: "/signup",
  afterSignupUrl: "/login",
};

/**
 * Sign Up a user in by calling the authProvider.signup() method
 *
 * @param {Object} params Sign Up parameters to pass to the authProvider. May contain username/email, password, etc
 * @param {string} pathName The path to redirect to after Sign Up.
 *
 * @return {Promise} The authProvider response
 */
const useSignup = () => {
  const authProvider = useAuthProvider();
  const location = useLocation();
  const locationState = location.state;
  const history = useHistory();
  const dispatch = useDispatch();
  const nextPathName = locationState && locationState.nextPathname;
  const nextSearch = locationState && locationState.nextSearch;

  const signup = useCallback(
    (params = {}, pathName) =>
      authProvider.signup(params).then((ret) => {
        dispatch(resetNotification());
        const redirectUrl = pathName
          ? pathName
          : nextPathName + nextSearch || defaultAuthParams.afterSignupUrl;
        history.push(redirectUrl);
        return ret;
      }),
    [authProvider, history, nextPathName, nextSearch, dispatch]
  );

  const signupWithoutProvider = useCallback(
    (_, __) => {
      dispatch(resetNotification());
      history.push(defaultAuthParams.afterSignupUrl);
      return Promise.resolve();
    },
    [history, dispatch]
  );

  return authProvider ? signup : signupWithoutProvider;
};

export default useSignup;
