import React, { useRef } from "react";
import { IButtonProps } from "./Button";
import { Button } from "./index";
import { required, useValidation } from "../../validation";
import { ICheckBoxProps } from "../CheckBox";
import CheckBoxWithValidation from "../withValidation/CheckBoxWithValidation";
import ConditionalRendering from "../Util/ConditionalRender";

interface IButtonActionProps extends IButtonProps {
  action?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface IButtonsFormProps {
  buttonsCancel?: IButtonActionProps;
  buttonSubmit: IButtonActionProps;
  term?: ICheckBoxProps;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export interface IButtonsFormModel {
  term: boolean;
}

const ButtonsForm = ({ buttonsCancel, buttonSubmit, term, size }: IButtonsFormProps) => {

  const refOk = useRef(null);
  const refCancel = useRef(null);

  const validation = useValidation<IButtonsFormModel>({
    initialData: {
      term: false
    }
  });

  const handlerOnSubmit = async (e: any) => {
    if (term) {
      const { error } = await validation.validate();
      if (error) {
        return;
      }
    }
    buttonSubmit.action && buttonSubmit.action(e as any);
  };

  return (
    <div className={"d-flex justify-content-center container pt-2"}>
      <div className={`d-flex flex-column p-0 justify-content-center${size ? ` col-${size}` : " col-12"}`}>
        {
          term ?
            <div className={"d-flex flex-fill pb-2"}>
              <CheckBoxWithValidation
                {...term}
                validation={{
                  useValidation: validation,
                  model: "term",
                  rule: {
                    required,
                    customValidation: (value: boolean) => {
                      if (!value) {
                        return true;
                      }
                      return false;
                    }
                  }
                }}
                classNames={"font-smaller-3"}
              />
            </div> : <></>
        }

        <div className={"d-flex flex-fill justify-content-around"}>
          <div className={"col-md-6"}>
            <Button
              ref={refOk}
              classNames={`hw-form-button-root text-upper${buttonSubmit.classNames ? ` ${buttonSubmit.classNames}` : ""}`}
              label={buttonSubmit.label ? buttonSubmit.label : "SUBMIT"}
              onClick={handlerOnSubmit}
              outline
              fullWidth
              color={buttonSubmit.color ? buttonSubmit.color : "primary"}
            />
          </div>
          <div className={"col-md-6"}>
            <ConditionalRendering condition={!!buttonsCancel}>
              <Button
                ref={refCancel}
                classNames={`hw-form-button-root text-upper${buttonsCancel?.classNames ? ` ${buttonsCancel.classNames}` : ""}`}
                label={buttonsCancel?.label ? buttonsCancel.label : "CANCEL"}
                onClick={buttonsCancel?.action}
                outline
                fullWidth
                color={buttonsCancel?.color ? buttonsCancel.color : "danger"}
              />
            </ConditionalRendering>
          </div>
        </div>

      </div>
    </div>

  );
};

ButtonsForm.defaultProps = {
  size: 12
};

export default ButtonsForm;
