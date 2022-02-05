import React from "react";
import { withRouter } from "react-router";

const AuthNavBar = () => {

  return (
    <div className={"nav-bar"}>
      <div className={"toolbar-root"}>
        <div className={"logo-nav-img"} />
      </div>
    </div>
  );
};

export default withRouter(AuthNavBar);
