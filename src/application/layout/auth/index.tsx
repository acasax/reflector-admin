import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import { Route, withRouter } from "react-router";
import { APP_LAYOUT, APPLICATION_MAIN_SUB_DOMAIN } from "../../constants";
import { ComponentLazy } from "../../../helpers/Helpers";
import { setUseAccessToken } from "../../../apollo/accessToken";

const Login = React.lazy(() => (import("../../auth/Login")));

const Layout = () => {

  const pathAuth = React.useCallback((link: string) => {
    return `/${APPLICATION_MAIN_SUB_DOMAIN}/${APP_LAYOUT.AUTH}/${link}`;
  }, []);

  useEffect(() => {
    setUseAccessToken(false);
  }, []);

  return (
    <div className={"app-layout-auth"}>
      <div className={"app-layout-auth-data w-100"}>
        <Switch>
          <Route path={pathAuth("login")}><ComponentLazy component={Login} /></Route>
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(Layout);
