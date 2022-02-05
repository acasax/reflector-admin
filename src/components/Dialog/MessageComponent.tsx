import React                  from 'react'
import {FontAwesomeIcon}      from '@fortawesome/react-fontawesome'
import {faCheckCircle}        from '@fortawesome/free-regular-svg-icons'
import {faExclamationCircle,} from '@fortawesome/free-solid-svg-icons'

export interface IRegistrationDialog {
  error ?: boolean,
  success ?: boolean,
  title ?: string,
  text : string,
  logo ?: string,
  sub ?: string
}

interface IRegistrationDialogHeaderProps {
  title ?: string,
  logo ?: string,

}

const RegistrationDialogHeader = ({title, logo} : IRegistrationDialogHeaderProps) => {
  return (

    <div className={`registration-dialog-header${logo ? ' dialog-logo' : ''}`}>
      {logo ? 'LOGO' : title}

    </div>
  )
}

const MessageComponent = ({title, text, error, logo, sub} : IRegistrationDialog) => {

  return (
    <div className={`registration-dialog-root${error ? ' error' : ''}`}>
      <RegistrationDialogHeader title={title} logo={logo}/>
      <div className={'registration-dialog-content'}>
        <div className={'registration-dialog-icon'}>{error ?
          <FontAwesomeIcon className={'error'} icon={faExclamationCircle}/> :
          <FontAwesomeIcon className={'success'} icon={faCheckCircle}/>}</div>
        {text}
      </div>
      <div className={'registration-dialog-sub-content'}>
        {sub}
      </div>
    </div>
  )

}

export default MessageComponent
