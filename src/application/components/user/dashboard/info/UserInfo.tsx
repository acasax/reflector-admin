import React          from 'react'
import UserForm from '../form/User'
import GeneralDetails from './GeneralDetails'

const UserInfo = ({user,submitAction}: any) => {
    
  return (
    <div className={'d-flex flex-column w-100 '}>
        <div className={'user-tabs-general-details pb-3'}>
          <GeneralDetails notShowEditButton notShowReset/>
        </div>
        <div className={'flex-2'}>
          <UserForm
            user={user}
            submitFun={submitAction}
          />
        </div>
    </div>
  )
}

export default UserInfo
