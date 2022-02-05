import React, { useMemo } from "react";
import { CONSTANT_USERS } from "../../../constants";
import ButtonShortcut from "../../../../components/Button/ButtonShortcut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import ConditionalRendering from "../../../../components/Util/ConditionalRender";
import { KeyboardEventCodes } from "../../../../components/hooks/useExternalKeybaord";
import ComponentRender from "../../../../components/Util/ComponentRender";
import { IUseOptimizeEventData, useOptimizeEventClick } from "../../../../components/hooks/useOptimizeEventClick";
import { openDialogChangePassword } from "./form/ChangePassword";
import {
  useChangePasswordUserMutation,
  useGetUserImageUrlQuery,
  UserChangePasswordType,
  useUpdateUserMutation,
  useUserQuery
} from "apollo-graphql/graphql";
import { TUser } from "apollo-graphql/type_logic/types";
import { openDialogUserForm } from "../dashboard/form/User";
import { translate } from "../../../../translate/translate";
import { useApplication } from "../../../hooks/useApplication";
import { useQuery } from "../../../hooks/useQuery";
import { omit as _omit } from "lodash";
import { useToast } from "../../../hooks/useToast";

export interface TMyProfileProps {
  notShowEditButton?: boolean;
}

const MyProfile = ({ notShowEditButton }: TMyProfileProps) => {

  const { toastSuccess } = useToast();
  const [mutationChangePasswordUser] = useChangePasswordUserMutation();
  const [mutationEditUser] = useUpdateUserMutation();
  const { loggedUser } = useApplication();

  const { data, refetch: refetchUser } = useUserQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    variables: {
      id: Number(loggedUser?.id)
    },
    skip: !Number(loggedUser?.id)
  });

  const { data: dataImg, refetch: refetchLogo } = useQuery(useGetUserImageUrlQuery, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    variables: {
      userId: Number(loggedUser?.id)
    },
    skip: !Number(loggedUser?.id)
  });

  const user = React.useMemo(() => !data || !data.user ? {} as TUser : data.user, [data]);

  const changePassword = () => {
    const submitFun = async (data: UserChangePasswordType) => {
      if (user && user.id) {
        await mutationChangePasswordUser({
          variables: {
            data: data,
            userId: Number(user.id)
          }
        });
        toastSuccess(translate.USER_SUCCESS_CHANGED_PASSWORD_TEXT);
      }
    };
    openDialogChangePassword({ submitFun });
  };

  const userImage = useMemo(() => dataImg && dataImg.data && dataImg.data.length ? `${(process.env as any).REACT_APP_LOGO_PATH}/${dataImg.data}` : "", [dataImg]);

  const editMyProfile = () => {
    const submitFun = async (data: TUser) => {
      if (user && user.id) {
        await mutationEditUser({
          variables: {
            id: Number(user.id),
            data: _omit(data, ["id"])
          }
        });
        refetchUser().then();
        toastSuccess(translate.USER_SUCCESS_UPDATED_TEXT);
      }
    };
    openDialogUserForm({
      user: {
        ...user,
        image: userImage
      },
      submitFun
    });

  };

  const { onClickHandler } = useOptimizeEventClick({
    eventHandler (data: IUseOptimizeEventData) {
      if (data.action === CONSTANT_USERS.EVENTS.CHANGE_PASSWORD) {
        changePassword();
        return;
      }
      if (data.action === CONSTANT_USERS.EVENTS.EDIT) {
        editMyProfile();
        return;
      }
    }
  });

  return (
    <div className={"d-flex flex-column h-100 w-100 pt-2 px-2"} onClick={onClickHandler} data-action-root>
      <div className={"d-flex justify-content-start mb-1 color-primary w-100 mb-4"}>
        <div className={"d-flex font-bigger-1 align-items-center "}>
          <div className={"pr-2 shortcut-button"}><FontAwesomeIcon icon={faInfoCircle} /></div>
          <div>{translate.MY_PROFILE_TITLE_LABEL}</div>
        </div>
        <ConditionalRendering condition={!notShowEditButton}>
          <div
            data-action={CONSTANT_USERS.EVENTS.EDIT}
          >
            <ButtonShortcut
              icon={faInfoCircle}
              label={translate.BUTTON_ACTION_BUTTON_UPDATE_LABEL}
              shortcut={KeyboardEventCodes.F4}
              classNames={"shortcut-button sm button-border-color ml-3"}
            />
          </div>
        </ConditionalRendering>
      </div>
      <div className={"d-flex w-50"}>
        <div className={"d-flex justify-content-between color-primary w-100"}>
          <div className={"d-flex flex-column w-50"}>
            <ComponentRender label={translate.USER_FORM_USERNAME_LABEL} model={user} field={"userName"}
                             placeholder={translate.USER_FORM_USERNAME_LABEL} justify-content={"start"}
                             labelClass={"font-smaller-4"} />
            <ComponentRender label={translate.USER_FORM_NICKNAME_LABEL} model={user} field={"nickname"}
                             placeholder={translate.USER_FORM_NICKNAME_LABEL} justify-content={"start"}
                             labelClass={"font-smaller-4"} />
            <ComponentRender label={translate.USER_FORM_DESCRIPTION_LABEL} model={user} field={"description"}
                             placeholder={translate.USER_FORM_DESCRIPTION_LABEL} justify-content={"start"}
                             labelClass={"font-smaller-4"} />
            <ComponentRender
              label={translate.USER_FORM_PASSWORD_LABEL}
              model={user}
              field={"password"}
              placeholder={"*********"}
              action={{
                label: translate.USER_FORM_CHANGE_PASSWORD_LABEL
              }}
              data-action={CONSTANT_USERS.EVENTS.CHANGE_PASSWORD}
              justify-content={"start"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
