import React             from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {  faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {useApplication}  from '../hooks/useApplication'

export interface ILoginStatus {
  changeStatus: () => void;
  label?: string;
}

const LoginStatus = ({changeStatus, label}: ILoginStatus) => {

  const {loggedUser} = useApplication()

  const userText = React.useMemo(() => {
    if (loggedUser?.userName) {
      return loggedUser.userName || ''
    }
    if (loggedUser?.userName) {
      return loggedUser.userName
    }
    return loggedUser?.nickname || ''
  }, [loggedUser])
  return (
    <div className={'logged-icon'}>
      <div className={'logged-user'}>{userText}</div>
      <div className={'login-icon'}>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={changeStatus}/>
      </div>

    </div>
  )
}

export default LoginStatus
