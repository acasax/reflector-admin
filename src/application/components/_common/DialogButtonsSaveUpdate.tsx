import React                      from 'react'
import ButtonsForm                from '../../../components/Button/ButtonsForm'
import { IconProp }               from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon }        from '@fortawesome/react-fontawesome'
import DivExternalKeyboardRoot    from '../../../components/hooks/DivParentExternalKeybardRoot'
import { translate } from 'translate/translate'

interface IDialogButtonsSaveUpdateProps<T> {
  cancelFun?: () => void;
  submitFun: () => void;
  submitBtnLabel?: string;
  update?: boolean;
  icon?: IconProp;
  classNames?: string;
  iconClassNames?: string;
  cancelBtnLabel?: string;
}

const DialogButtonsSaveUpdate = <T extends any>({update, cancelFun, submitFun, icon, cancelBtnLabel, submitBtnLabel, classNames,iconClassNames}: IDialogButtonsSaveUpdateProps<T>) => {

  return (
    <div className={`pt-4${classNames ? ` ${classNames}` : ''}`}>
      <ButtonsForm
                buttonsCancel={ cancelFun ? {
                  classNames: 'text-upper',
                  label: cancelBtnLabel ? cancelBtnLabel : translate.BUTTON_ACTION_BUTTON_CANCEL_LABEL,
                  action: cancelFun
                } : void(0)}
                buttonSubmit={{
                  classNames: 'text-upper',
                  label: !update ? !submitBtnLabel ? translate.BUTTON_ACTION_BUTTON_SUBMIT_LABEL : submitBtnLabel : translate.BUTTON_ACTION_BUTTON_UPDATE_LABEL,
                  action: submitFun
                }}
      />
      {
        icon ? <FontAwesomeIcon className={`color-primary form-icon-opacity-view${iconClassNames ? ` ${iconClassNames}` : ''}`} icon={icon}/> : null
      }
    </div>
  )
}

export default DialogButtonsSaveUpdate
