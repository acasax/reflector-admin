import { DialogModalRootComponent, EasyDialogApolloProvider } from "components/EasyModel/EasyModal";
import { get as _get } from "lodash";
import React from "react";
import { translate } from "translate/translate";
import { CenteredDialog, DialogComponentQuestions } from "components/Dialog/DialogBasic";
import { TUser } from "../../../../../apollo-graphql/type_logic/types";

export type TRemoveUserProps = {
  user: TUser;
  submitFun: (id: string | number) => Promise<any>;
};

export const openDialogRemoveUser = ({ user, submitFun }: TRemoveUserProps) => {
  EasyDialogApolloProvider((closeDialog: () => any, openDialog: (data: any) => any) => {
    const Component = () => {
      const handlerConfirm = async () => {
        submitFun && await submitFun(user.id as string);
        closeDialog();
      };
      const messages: string[] = React.useMemo(() => [
        translate.USER_FORM_REMOVE_TEXT,
        `${translate.USER_INFO_NICKNAME_LABEL} : ${_get(user, "nickname", "")}`,
        `${translate.USER_INFO_USERNAME_LABEL} : ${_get(user, "userName", "")}`
      ], []);

      return (
        <DialogComponentQuestions
          closeFun={closeDialog}
          confirmFun={handlerConfirm}
          messages={messages}
        />
      );
    };
    openDialog(<DialogModalRootComponent name={"dialog-user-remove-452041050141502421041"} closeFn={closeDialog}>
      <CenteredDialog
        title={translate.USER_FORM_REMOVE_TITLE}
        closeAction={closeDialog}
        Component={Component}
      />
    </DialogModalRootComponent>);
  });
};