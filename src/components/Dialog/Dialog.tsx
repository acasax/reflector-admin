import React             from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faExclamationCircle,
  faInfo,
  faTimes
}                        from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  IButtonProps
}                        from '../Button'
import {faCheckCircle}   from '@fortawesome/free-regular-svg-icons'

export interface IDialogProps {
  error ?: boolean,
  success ?: boolean,
  title ?: string,
  closeAction : () => void,
  text : string,
  button ?: IButtonProps,
  logo ?: string
}

interface IDialogHeaderProps {
  title ?: string,
  logo ?: string,
  closeAction : () => void
}

const DialogHeader = ({title, closeAction, logo} : IDialogHeaderProps) => {
  return (
    <div className={`dialog-header d-flex justify-content-between flex-fill ${logo ? ' dialog-logo' : ''}`}>
      {logo ? 'LOGO' : title}
      <div className={'close-dialog'} onClick={closeAction}>
        <FontAwesomeIcon icon={faTimes}/>
      </div>
    </div>
  )
}

const Dialog = ({title, closeAction, button, text, error, logo, success} : IDialogProps) => {
  return (
    <div className={`dialog-root${error ? ' error' : ''}`}>
      <div className={'dialog-icon'}>{error ?
        <FontAwesomeIcon className={'error'} icon={faExclamationCircle}/> : (success ?
          <FontAwesomeIcon className={'success'} icon={faCheckCircle}/> :
          <FontAwesomeIcon className={'tabs'} icon={faInfo}/>)}</div>
      <DialogHeader title={title} logo={logo} closeAction={closeAction}/>
      <div className={'dialog-content'}>
        {text}
      </div>
      {button ? (
        <div className={'dialog-action'}>
          <Button color={button.color} outline={button.outline} size={button.size} label={button.label}/>
        </div>
      ) : null}
    </div>
  )
}

export default Dialog
