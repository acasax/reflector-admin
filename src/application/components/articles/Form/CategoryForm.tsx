import React, { useEffect } from "react";
import { DialogModalRootComponent, EasyDialogApolloProvider } from "../../../../components/EasyModel/EasyModal";
import { CenteredDialog } from "../../../../components/Dialog/DialogBasic";
import { translate } from "../../../../translate/translate";
import { TCategory } from "../../../../apollo-graphql/type_logic/types";
import { IFieldsRefs, required, useValidation } from "../../../../validation";
import { get as _get } from "lodash";
import { processErrorGraphQL } from "../../../../apollo";
import InputTextWithValidation from "../../../../components/withValidation/InputTextWithValidation";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import DialogButtonsSaveUpdate from "../../_common/DialogButtonsSaveUpdate";
import { useLoading } from "../../../hooks/useLoading";

type TCategoryFormProps = {
  cancelFun?: () => void;
  category?: TCategory;
  submitFun: (category: TCategory) => Promise<any>;
}

const CategoryForm = ({ cancelFun, category, submitFun }: TCategoryFormProps) => {

  const {setLoading, resetLoading} = useLoading()
  const validation = useValidation<TCategory>({
    initialData: {
      name: ""
    }
  });

  const { setFieldValue, state, getFieldRef, resetValidations } = validation;

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
    setLoading()
    try {
       await submitFun(data)
    } catch (e) {
      processErrorGraphQL(e, validation);
    } finally {
      resetLoading()
    }
    handlerCancel();
  };

  useEffect(() => {
    if (!category) {
      return;
    }
    resetValidations(true);

    ["name","description"].forEach((s: string) => _get(category, s) ? setFieldValue(s, _get(category, s).toString(), false) : null);

  }, [category, setFieldValue, resetValidations]);

  return (
    <div className={"container user-form-root py-4 relative"}>
      <div className={"col-md-6"}>
        <InputTextWithValidation
          required
          focusOnMount
          label={translate.CATEGORY_FORM_INPUT_NAME_LABEL}
          helperText={translate.CATEGORY_FORM_INPUT_NAME_HELPER_TEXT}
          selectOnFocus
          maxLength={64}
          validation={{
            useValidation: validation,
            model: "name",
            rule: {
              required
            }
          }}
        />
      </div>
      <div className={"col-md-6"}>
        <InputTextWithValidation
          label={translate.CATEGORY_FORM_INPUT_DESCRIPTION_LABEL}
          helperText={translate.CATEGORY_FORM_INPUT_DESCRIPTION_HELPER_TEXT}
          selectOnFocus
          maxLength={64}
          validation={{
            useValidation: validation,
            model: "description"
          }}
        />
      </div>
      <DialogButtonsSaveUpdate
        cancelFun={handlerCancel}
        submitFun={handlerOnSubmit}
        update={!!category}
        icon={faListAlt}
      />
    </div>
  );
};

export default CategoryForm;

export interface TOpenDialogCategory {
  category?: TCategory;
  submitFun: (category: TCategory) => Promise<any>;
}

export const openDialogUserForm = ({ category, submitFun }: TOpenDialogCategory) => {
  EasyDialogApolloProvider((closeDialog: () => any, openDialog: (data: any) => any) => {
    openDialog(<DialogModalRootComponent name={"dialog-category-add-edit-02541820"} closeFn={closeDialog}>
      <CenteredDialog
        title={category ? translate.CATEGORY_FORM_TITLE_EDIT : translate.CATEGORY_FORM_TITLE_DEFINE}
        closeAction={closeDialog}
        Component={CategoryForm}
        componentRenderProps={{
          cancelFun: closeDialog,
          submitFun: submitFun,
          category
        }}
      />
    </DialogModalRootComponent>);
  });

};