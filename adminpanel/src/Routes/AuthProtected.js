import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../Components/Hooks/UserHooks";

import { logoutUser } from "../store/actions";

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const { userProfile, loading, token } = useProfile();
  const authToken = window.localStorage.getItem("authToken");
  useEffect(() => {
    if (!loading && authToken) {
      setAuthorization(token);
    } else if (loading && !authToken) {
      dispatch(logoutUser());
    }
  }, [authToken, userProfile, loading, dispatch]);

  /*
    redirect is un-auth access protected routes via url
  */

  if (loading && !authToken) {
    return (
      <Navigate to={{ pathname: "/", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { AuthProtected, AccessRoute };