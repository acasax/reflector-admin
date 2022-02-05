import React, { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { NavLink, useLocation } from "react-router-dom";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCaretDown, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "../Translation/useTranslation";

export interface INavBarItemProps extends RouteComponentProps, PropsWithChildren<any> {
  path: string;
  label: string;
  icon?: IconProp;
  children?: any;
  dataIndex?: number;
}

const MainNavBarItem = ({ path, label, icon, children, dataIndex }: INavBarItemProps) => {
  const location = useLocation();
  const [collapse, setCollapse]: [boolean, (r: boolean) => void] = useState(false as boolean);

  const onClickHandler = (e: any) => {
    if (children) {
      setCollapse(!collapse);
      return;
    }
  };

  const onMouseEnter = useCallback((e: any) => {
    setCollapse(true);
  }, []);

  const onMouseLeave = useCallback((e: any) => {
    setCollapse(false);
  }, []);

  const isActive = useMemo(() => {
    if (!children) {
      return location.pathname === path;
    }
    return children.find((x: any) => x.props.path === location.pathname);
  }, [children, location, path]);

  const { translated } = useTranslation(label);

  return (
    <div className={"relative w-100"}
         onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave}
    >
      <NavLink
        data-bar-list-item
        to={path}
        data-index={dataIndex}
        onClick={onClickHandler}
        activeClassName={isActive ? "active" : ""}
        className={"bar-list-item"}
      >
        {icon ? <FontAwesomeIcon icon={icon} /> : <FontAwesomeIcon icon={faBan} />}
        <div className={"label"}>
          {translated}
        </div>
        {
          children ?
            collapse ? <FontAwesomeIcon icon={faCaretDown} className={"list-item-caret active"} />
              : <FontAwesomeIcon icon={faCaretLeft} className={"list-item-caret active"} />
            : null
        }
      </NavLink>
      {
        children && (
          <div className={`collapse-container${collapse ? " active" : ""}`}>
            <div className={"collapse-wrapper"}>
              {children}
            </div>
          </div>
        )
      }
    </div>
  );

};

export default withRouter(MainNavBarItem);