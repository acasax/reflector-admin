import React, { useEffect, useMemo } from "react";
import { translate } from "translate/translate";
import Tabs from "../../../components/Tabs/Tabs";
import UserDashboard from "./dashboard/UserDashboard";
import MyProfile from "./myProfile/Dashboard";
import { useApplication } from "../../hooks/useApplication";

const UserView = () => {

  const { isAdmin } = useApplication();

  const tabs = useMemo(() => {
    const arr = [{
      tabName: translate.USER_DASHBOARD_TAB_MY_PROFILE_LABEL,
      tabContent: MyProfile
    }];
    return isAdmin ? [
        {
          tabName: translate.USER_DASHBOARD_TAB_INFO_LABEL,
          tabContent: UserDashboard
        },
        ...arr
      ] :
      arr;
  }, [isAdmin]);

  return (
    <div className={"d-flex p-3 h-100"}>
      <Tabs
        tabs={tabs}
        stateTab={{ active: 0 }}
      />
    </div>
  );

};

export default UserView;