import {
  DialogModalRootComponent,
  EasyDialogApolloProvider,
  easyDialogInfo
} from "../../../components/EasyModel/EasyModal";
import { useResetPasswordByAdminMutation } from "../../../apollo-graphql/graphql";
import { get as _get } from "lodash";
import React from "react";
import { translate } from "../../../translate/translate";
import { CenteredDialog, DialogComponentQuestions } from "../../../components/Dialog/DialogBasic";
import { TArticle } from "../../../apollo-graphql/type_logic/types";

export type TRemoveArticleProps = {
  article: TArticle;
  submitFun: (id: string|number) => Promise<any>;
};

export const openDialogRemoveArticle = ({ article, submitFun }: TRemoveArticleProps) => {
  EasyDialogApolloProvider((closeDialog: () => any, openDialog: (data: any) => any) => {
    const Component = () => {
      const handlerConfirm = async () => {
        submitFun && await submitFun(article.id as string);
        closeDialog();
       };
      const messages: string[] = React.useMemo(() => [
        translate.ARTICLE_FORM_REMOVE_TEXT,
        `${translate.ARTICLE_INFO_CATEGORY_LABEL} : ${_get(article, "category.name", "")}`,
        `${translate.ARTICLE_INFO_HEADER_LABEL} : ${_get(article, "header", "")}`
      ], []);

      return (
        <DialogComponentQuestions
          closeFun={closeDialog}
          confirmFun={handlerConfirm}
          messages={messages}
        />
      );
    };
    openDialog(<DialogModalRootComponent name={"dialog-article-remove-3216544744561687484"} closeFn={closeDialog}>
      <CenteredDialog
        title={translate.ARTICLE_FORM_REMOVE_TITLE}
        closeAction={closeDialog}
        Component={Component}
      />
    </DialogModalRootComponent>);
  });
};