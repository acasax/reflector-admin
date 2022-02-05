import { faKey, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { get as _get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { _selectorUserSelected } from "store/user/helpers";
import { translate } from "translate/translate";
import ButtonShortcut from "../../../../../components/Button/ButtonShortcut";
import ConditionalRendering from "../../../../../components/Util/ConditionalRender";
import EmptyTag from "../../../../../components/Util/EmptyTag";
import { CONSTANT_USERS } from "../../../../constants";

interface IGeneralDetailsProps {
  notShowEditButton?: boolean;
  notShowReset?: boolean;
}

const GeneralDetails = ({ notShowEditButton, notShowReset }: IGeneralDetailsProps) => {

  const user = useSelector(_selectorUserSelected);

  return (
    <div className={"d-flex flex-column w-100 justify-content-start align-items-start mt-2"}>
      <ConditionalRendering condition={!notShowReset}>
        <div
          className={"absolute-right-top"}
          data-action={CONSTANT_USERS.EVENTS.RESET_PASSWORD}
          data-action-id={_get(user, "id")}
        >
          <ButtonShortcut
            icon={faKey}
            label={translate.RESET_LABEL}
            classNames={"shortcut-button primary sm button-border-color mr-3"}
          />
        </div>
      </ConditionalRendering>
      <div className={"d-flex justify-content-between mb-1 color-primary w-100"}>
        <div className={"d-flex font-smaller-2 align-items-center "}>
          <div className={"pr-2"}><FontAwesomeIcon icon={faInfoCircle} /></div>
          <div>{translate.USER_INFO_TITLE}</div>
        </div>
        <ConditionalRendering condition={!!user?.id}>
          <div
            data-action={CONSTANT_USERS.EVENTS.DELETE}
            data-action-id={_get(user, "id")}
          >
            <ButtonShortcut
              icon={faTimes}
              label={translate.DELETE_LABEL}
              classNames={"shortcut-button sm button-border-color mr-3"}
            />
          </div>
        </ConditionalRendering>
      </div>
      <div className={"d-flex flex-row flex-fill justify-content-start align-items-center color-primary w-100"}>
        <div
          className={"text-left font-smaller-4 opacity-6 min-width-120"}>{translate.USER_INFO_NICKNAME_LABEL}&nbsp;:
        </div>
        <div className={"px-1"}>
          <EmptyTag model={user} field={"nickname"} placeholder={"#########"} />
        </div>
      </div>
      <div className={"d-flex flex-row justify-content-start align-items-center color-primary w-100"}>
        <div
          className={"text-left font-smaller-4 opacity-6 min-width-120"}>{translate.USER_INFO_USERNAME_LABEL}&nbsp;:
        </div>
        <div className={"px-1"}>
          <EmptyTag model={user} field={"userName"} placeholder={"#########"} />
        </div>
      </div>
    </div>
  );

};

export default GeneralDetails;
