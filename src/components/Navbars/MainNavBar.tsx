import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { ID_APPLICATION_SIDE_BAR, ISideBarState } from "../../application/layout/main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import MainNavBarItem from "./MainNavBarItem";
import { translate } from "translate/translate";
import { faNewspaper, faUser } from "@fortawesome/free-regular-svg-icons";

export interface IMainNavBarProps extends RouteComponentProps {
  state: ISideBarState;
  onClickBarListHandler: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface INavBarListProps {
  label: string;
  path?: string;
  icon?: IconProp;
  collapse?: boolean;
  children?: INavBarListProps[];
}

export const menuList: INavBarListProps[] = [
  {
    label: translate.USERS_PAGE_TITLE,
    path: "/application/main/users",
    icon: faUser
  },
  {
    label: translate.ARTICLES_PAGE_TITLE,
    path: "/application/main/articles",
    icon: faNewspaper
  }
];

const MainNavBar = ({ state, onClickBarListHandler }: IMainNavBarProps) => {

  const renderList = (props: INavBarListProps[]) => {
    return props.map(({ children, collapse, ...rest }: INavBarListProps, key: number) => {
      if (children) {
        return (
          <MainNavBarItem key={key} dataIndex={key} path={"#"} collapse={collapse} {...rest}>
            {renderList(children)}
          </MainNavBarItem>
        );
      }
      return <MainNavBarItem key={key} dataIndex={key} {...rest} />;
    });
  };

  return (
    <>
      <div
        className={`nav-bar-main${state.open ? " opened" : ""}${state.mini ? " mini" : ""}${state.visible ? "" : " hide"}`}
        onClick={onClickBarListHandler} id={ID_APPLICATION_SIDE_BAR}>
        <div className={`nav-bar-main-close${state.open && state.visible ? " show" : ""}`}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className={"py-3 d-flex justify-content-center border-bottom relative"}>
          {translate.APP_NAME}
        </div>
        <div className={"bar-list-main"}>
          {renderList(menuList)}
        </div>
      </div>
    </>
  );
};

export default withRouter(MainNavBar);
