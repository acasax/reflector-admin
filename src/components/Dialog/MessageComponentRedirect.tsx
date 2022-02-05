import React                  from 'react'
import {FontAwesomeIcon}      from '@fortawesome/react-fontawesome'
import {faExclamationCircle,} from '@fortawesome/free-solid-svg-icons'
import {Button}               from '../Button'
import {faCheckCircle}        from '@fortawesome/free-regular-svg-icons'
import {
  RouteComponentProps,
  withRouter
}                             from 'react-router'

export interface IActivationDialog extends RouteComponentProps {
  error ?: boolean,
  success ?: boolean,
  title ?: string,
  text : string,
  buttonLabel ?: string,
  logo ?: string
}

interface IActivationDialogHeaderProps {
  title ?: string,
  logo ?: string,

}

const ActivationDialogHeader = ({title, logo} : IActivationDialogHeaderProps) => {
  return (

    <div className={`activation-dialog-header${logo ? ' dialog-logo' : ''}`}>
      {logo ? 'LOGO' : title}

    </div>
  )
}

const MessageComponentRedirect = ({title, text, error, logo, buttonLabel, ...props} : IActivationDialog) => {
  const handleOnClick = () => {
    props.history.replace('login')
  }
  return (
    <div className={`activation-dialog-root${error ? ' error' : ''}`}>
      <ActivationDialogHeader title={title} logo={logo}/>
      <div className={'activation-dialog-content'}>
        <div className={'activation-dialog-icon'}>{error ?
          <FontAwesomeIcon className={'error'} icon={faExclamationCircle}/> :
          <FontAwesomeIcon className={'success'} icon={faCheckCircle}/>}</div>
        {text}
      </div>
      {!error ? (
        <div className={'activation-dialog-action'}>
          <Button color={'primary'} outline size={'sm'} label={buttonLabel ? buttonLabel : 'GO TO LOGIN'}
                            onClick={handleOnClick}/>
        </div>
      ) : null}
    </div>
  )
}

export default withRouter(MessageComponentRedirect)
