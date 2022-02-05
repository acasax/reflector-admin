import React                           from 'react'
import InputTextPasswordWithValidation from '../../../../../components/withValidation/InputTextPasswordWithValidation'
import {
  areTheSame,
  IFieldsRefs,
  minLength,
  required,
  useValidation
}                                      from '../../../../../validation'
import DialogButtonsSaveUpdate         from '../../../_common/DialogButtonsSaveUpdate'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                      from '../../../../../components/EasyModel/EasyModal'
import {CenteredDialog}                from '../../../../../components/Dialog/DialogBasic'
import {
  get as _get,
  omit as _omit
}                            from 'lodash'
import {TUserChangePassword} from 'apollo-graphql/type_logic/types'
import {processErrorGraphQL} from 'apollo'
import { translate } from 'translate/translate'
import { useLoading } from "../../../../hooks/useLoading";

/*
customValidation: (value : string) => {
    if (!value) {
      return false
    }
    if (/[^a-z0-9#$@!+*%]/gi.exec(value)) {
      return 'Password must be in scope of A-Za-z0-9#$@!+*%'
    }

    if (!/[A-Z]/.exec(value)) {
      return 'Password must have at least one Upper case letter'
    }
    if (!/\d/.exec(value)) {
      return 'Password must have at least one number'
    }
    if (!/[a-z]/.exec(value)) {
      return 'Password must have at least one Small case letter'
    }
    return false
  }
*/
export const passwordRule = {
  required,
  minLength: minLength({
    message: translate.VALIDATION_USER_PASSWORD_MIN_LENGTH,
    min: 4
  }),
  areTheSame: areTheSame({
    message: translate.VALIDATION_PASSWORD_NOT_SAME,
    field: 'confirmPassword'
  })
}

export interface IChangePasswordProps {
  cancelFun: () => void;
  submitFun: (user: any) => Promise<any>;
}

const ChangePassword = ({cancelFun, submitFun}: IChangePasswordProps) => {
  const validation = useValidation<TUserChangePassword>()
  const {setLoading, resetLoading} = useLoading()

  const handlerOnSubmit = async () => {
    const {error, data,refs,validations} = await validation.validate()
    if (error) {
      const fieldRef: IFieldsRefs | undefined = refs.find(({field}) => _get(validations, `validations.${field}.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    setLoading()
    try {
      const obj = Object.assign({}, {
        ..._omit(data, ['confirmPassword']),
      })
      await submitFun(obj)
      cancelFun()
    } catch (e) {
          /** process the error */
      processErrorGraphQL(e,validation)
    } finally {
      resetLoading()
    }
  }

  return (
    <div className={'d-flex flex-column my-profile-change-password-form'}>
      <div className={'pt-2'}>
        <InputTextPasswordWithValidation
                        required
                        label={translate.USER_CHANGE_PASSWORD_CURRENT_PASSWORD_LABEL}
                        helperText={translate.USER_CHANGE_PASSWORD_CURRENT_PASSWORD_HELPER_TEXT}
                        validation={{
                          useValidation: validation,
                          model: 'currentPassword',
                          rule: {
                            required,
                            minLength: minLength({
                              message: translate.VALIDATION_PASSWORD_MIN_LENGTH,
                              min: 4
                            })
                          }
                        }}
        />
      </div>
      <div className={'pt-2'}>
        <InputTextPasswordWithValidation
                        required
                        label={translate.USER_CHANGE_PASSWORD_NEW_PASSWORD_LABEL}
                        helperText={translate.USER_CHANGE_PASSWORD_NEW_PASSWORD_HELPER_TEXT}
                        validation={{
                          useValidation: validation,
                          model: 'password',
                          rule: passwordRule
                        }}
        />
      </div>
      <div className={'pt-2'}>
        <InputTextPasswordWithValidation
                        required
                        label={translate.USER_CHANGE_PASSWORD_CONFIRM_PASSWORD_LABEL}
                        helperText={translate.USER_CHANGE_PASSWORD_CONFIRM_PASSWORD_HELPER_TEXT}
                        validation={{
                          useValidation: validation,
                          model: 'confirmPassword',
                          rule: {
                            required,
                            areTheSame: areTheSame({
                              message: translate.VALIDATION_PASSWORD_NOT_SAME,
                              field: 'password'
                            })
                          }
                        }}
        />
      </div>

      <DialogButtonsSaveUpdate
                    cancelFun={cancelFun}
                    submitFun={handlerOnSubmit}
      />
    </div>
  )
}

export default ChangePassword

export interface IOpenDialogChangePassword {
  submitFun: (password: any) => Promise<any>;
}

export const openDialogChangePassword = ({submitFun}: IOpenDialogChangePassword) => {
  EasyDialogApolloProvider((closeDialog: () => any, openDialog: (data: any) => any) => {
    openDialog(<DialogModalRootComponent name={'dialog-user-change-password-15648960546456'} closeFn={closeDialog}>
      <CenteredDialog
                title={translate.USER_CHANGE_PASSWORD_TITLE}
                closeAction={closeDialog}
                Component={ChangePassword}
                componentRenderProps={{
                  cancelFun:closeDialog,
                  submitFun
                }}
      />
    </DialogModalRootComponent>)
  })
}
