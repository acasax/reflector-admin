import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { processErrorGraphQL } from "apollo";
import { useResetPasswordByAdminMutation } from "apollo-graphql/graphql";
import { TUser } from "apollo-graphql/type_logic/types";
import TextAreaWithValidation from "components/withValidation/TextAreaWithValidation";
import { get as _get, pick as _pick } from "lodash";
import React, { useEffect } from "react";
import { translate } from "translate/translate";
import { CenteredDialog, DialogComponentQuestions } from "../../../../../components/Dialog/DialogBasic";
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider,
  easyDialogInfo
} from "../../../../../components/EasyModel/EasyModal";
import InputTextWithValidation from "../../../../../components/withValidation/InputTextWithValidation";
import { areTheSame, IFieldsRefs, minLength, required, useValidation } from "../../../../../validation";
import DialogButtonsSaveUpdate from "../../../_common/DialogButtonsSaveUpdate";
import UserImage from "./UserImage";
import { useApplication } from "../../../../hooks/useApplication";
import ConditionalRendering from "../../../../../components/Util/ConditionalRender";
import InputTextPasswordWithValidation from "../../../../../components/withValidation/InputTextPasswordWithValidation";
import { toast } from "react-toastify";
import { useToast } from "../../../../hooks/useToast";

interface IUserFormProps {
  user?: TUser;
  cancelFun?: () => void;
  submitFun: (user: TUser) => void;
  isDialog?: boolean;
}

type TUserFormModel = {
  photoTmp?: File;
  photoUrlTmp?: string;
} & TUser

const passwordRule = {
  minLength: minLength({
    message: translate.VALIDATION_USER_PASSWORD_MIN_LENGTH,
    min: 4
  }),
  areTheSame: areTheSame({
    message: translate.VALIDATION_PASSWORD_NOT_SAME,
    field: "confirmPassword"
  }),
  customValidation: (value: string) => {
    if (!value) {
      return false;
    }
    if (!/[A-Z]/.exec(value)) {
      return translate.VALIDATION_USER_PASSWORD_CUSTOM_VALIDATION_MIN_UPPER_CASE;
    }
    if (!/\d/.exec(value)) {
      return translate.VALIDATION_USER_PASSWORD_CUSTOM_VALIDATION_MIN_NUMBER;
    }
    if (/[a-zA-Z0-9]$/.exec(value)) {
      return translate.VALIDATION_USER_PASSWORD_CUSTOM_VALIDATION;
    }
    return false;
  }
};

const UserForm = ({ user, submitFun, cancelFun, isDialog = false }: IUserFormProps) => {

  const { isAdmin } = useApplication();

  const validation = useValidation<TUserFormModel>({
    initialData: {
      userName: _get(user, "userName", ""),
      nickname: _get(user, "nickname", "")
    }
  });

  const { setFieldValue, state, getFieldRef, resetValidations } = validation;

  const changeImage = (file: any) => {
    setFieldValue("photoTmp", file as any, false);
    setFieldValue("photoUrlTmp", URL.createObjectURL(file) as any, false);
  };

  const handlerCancel = () => {
    cancelFun && cancelFun();
  };

  const handlerOnSubmit = async () => {
    const { error, data, refs, validations } = await validation.validate();
    if (error) {
      const fieldRef: IFieldsRefs | undefined = refs.find(({ field }) => _get(validations, `validations.${field}.error`));
      fieldRef && fieldRef.ref.current.focus();
      return;
    }
    try {
      const _data = Object.assign({},
        _pick(data, ["id", "nickname", "userName", "description"]),
        state.photoTmp ? { image: (state.photoTmp as any) } : {}, state.password ? {password: state.password} : {});
      await submitFun(_data);
    } catch (e) {
      processErrorGraphQL(e, validation);
    }
    handlerCancel();
  };

  const handlerOnClickImage = (e: any) => {
    const target = e.target;
    if (target.value.length === 0) {
      const fieldRef = getFieldRef("userName");
      if (fieldRef && fieldRef.ref && fieldRef.ref.current) {
        fieldRef.ref.current.focus();
      }
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    resetValidations(true);
    if (user.image) {
      setFieldValue("photoUrlTmp", user.image, false);
    }
    ["id", "nickname", "userName", "description"].forEach((s: string) => _get(user, s) ? setFieldValue(s, _get(user, s).toString(), false) : null);

  }, [user, setFieldValue, resetValidations]);

  return (
    <div className={"container user-form-root py-4 relative"}>
      <div className={"col-md-4"}>
        <UserImage onChange={changeImage} onClick={handlerOnClickImage} imagesTmp={state.photoUrlTmp} />
      </div>
      <div className={"col-md-8"}>
        <div className={"col-md-12  pr-0"}>
          <InputTextWithValidation
            required
            label={translate.USER_FORM_USERNAME_LABEL}
            helperText={translate.USER_FROM_USERNAME_HELPER_TEXT}
            selectOnFocus
            validation={{
              useValidation: validation,
              model: "userName",
              rule: {
                required
              }
            }}
          />
        </div>
        <div className={"col-md-12  pr-0"}>
          <InputTextWithValidation
            label={translate.USER_FORM_NICKNAME_LABEL}
            helperText={translate.USER_FORM_NICKNAME_HELPER_TEXT}
            selectOnFocus
            validation={{
              useValidation: validation,
              model: "nickname",
              rule: {
                required
              }
            }}
          />
        </div>
      </div>
      <ConditionalRendering condition={!!isAdmin}>
        <div className={"col-md-12  pr-0 row"}>
          <div className={"col-md-6"}>
            <InputTextPasswordWithValidation
              required
              label={translate.USER_FORM_PASSWORD_LABEL}
              helperText={translate.USER_FORM_PASSWORD_HELPER_TEXT}
              validation={{
                useValidation: validation,
                model: "password",
                rule: passwordRule
              }
              }
            />
          </div>
          <div className={"col-md-6 pr-0"}>
            <InputTextPasswordWithValidation
              required
              label={translate.USER_FORM_CONFIRM_PASSWORD_LABEL}
              helperText={translate.USER_FORM_CONFIRM_PASSWORD_HELPER_TEXT}
              validation={{
                useValidation: validation,
                model: "confirmPassword",
                rule: {
                  areTheSame: areTheSame({
                    message: translate.VALIDATION_PASSWORD_NOT_SAME,
                    field: "password"
                  })
                }
              }}
            />
          </div>
        </div>
      </ConditionalRendering>
      <div className={"col-md-12"}>
        <TextAreaWithValidation
          fullWidth
          label={translate.USER_FORM_DESCRIPTION_LABEL}
          helperText={translate.USER_FORM_DESCRIPTION_HELPER_TEXT}
          selectOnFocus
          validation={{
            useValidation: validation,
            model: "description"
          }}
        />
      </div>

          <DialogButtonsSaveUpdate
            cancelFun={isDialog ? handlerCancel : undefined}
            submitFun={handlerOnSubmit}
            update={!!user}
            icon={faUserAlt}
          />

    </div>
  );

};

export default UserForm;

export interface IOpenDialogUser {
  isAdmin?: boolean | null;
  user?: TUser;
  submitFun: (user: TUser) => Promise<any>;
}

export const openDialogUserForm = ({ isAdmin, user, submitFun }: IOpenDialogUser) => {
  EasyDialogApolloProvider((closeDialog: () => any, openDialog: (data: any) => any) => {
    openDialog(<DialogModalRootComponent name={"dialog-user-add-edit-162545145156"} closeFn={closeDialog}>
      <CenteredDialog
        title={user ? translate.USER_FORM_EDIT_TITLE : translate.USER_FORM_NEW_TITLE}
        closeAction={closeDialog}
        Component={UserForm}
        componentRenderProps={{
          cancelFun: closeDialog,
          submitFun: submitFun,
          isDialog: true,
          user,
          isAdmin
        }}
      />
    </DialogModalRootComponent>);
  });

};

export interface IDialogResetPassword {
  user: TUser;
  submitFun: () => void;
}

export const openDialogResetPassword = ({ user, submitFun }: IDialogResetPassword) => {
  EasyDialogApolloProvider((closeDialog: () => any, openDialog: (data: any) => any) => {
    const Component = () => {
      const [mutationResetPassword] = useResetPasswordByAdminMutation();
      const handlerConfirm = async () => {
        const result = await mutationResetPassword({
          variables: {
            id: +_get(user, "id", "")
          }
        });
        submitFun && await submitFun();
        closeDialog();
        const password = _get(result, "data.password");
        easyDialogInfo(`Username: ${user.userName} \r\n New password : ${password}`);
      };
      const messages: string[] = React.useMemo(() => [
        translate.USER_FORM_RESET_PASSWORD_TEXT,
        `${translate.USERNAME_LABEL} : ${_get(user, "userName", "")}`,
        `${translate.USER_INFO_NICKNAME_LABEL} : ${_get(user, "nickname", "")}`
      ], []);

      return (
        <DialogComponentQuestions
          closeFun={closeDialog}
          confirmFun={handlerConfirm}
          messages={messages}
        />
      );
    };
    openDialog(<DialogModalRootComponent name={"dialog-user-reset-password-3216544744561687484"} closeFn={closeDialog}>
      <CenteredDialog
        title={translate.USER_FORM_RESET_PASSWORD_TITLE}
        closeAction={closeDialog}
        Component={Component}
      />
    </DialogModalRootComponent>);
  });
};
