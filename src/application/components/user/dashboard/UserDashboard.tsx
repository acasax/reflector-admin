import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import SearchView from '../../_common/SearchView'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { CONSTANT_USERS } from '../../../constants'
import { useUser } from '../../../hooks/useUser'
import { queryVariablesForUsers } from 'apollo-graphql/variablesQ'
import {
  useDeleteUserMutation,
  useGetUserImageUrlQuery,
  useInsertUserMutation,
  useUpdateUserMutation,
  useUserQuery,
  useUsersQuery
} from "apollo-graphql/graphql";
import { TUser } from 'apollo-graphql/type_logic/types'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
} from '../../../../components/hooks/useOptimizeEventClick'
import SearchViewUserRender from './SearchViewRender'
import {
  openDialogResetPassword,
  openDialogUserForm
} from './form/User'
import UserInfo from './info/UserInfo'
import { get as _get, omit } from 'lodash'
import { translate } from 'translate/translate'
import { useQuery } from 'application/hooks/useQuery'
import { processErrorGraphQL } from "../../../../apollo";
import { openDialogRemoveUser } from "./info/UserRemove";
import { useToast } from "../../../hooks/useToast";

const UserDashboard = () => {
  const [selectedId, setSelectedId] = useState(0)
  const { user, search, setSearch, setUser, clearUser  } = useUser()
  const {toastSuccess} = useToast()

  const [mutationInsertUser] = useInsertUserMutation()
  const [mutationUpdateUser] = useUpdateUserMutation()
  const [mutationDeleteUser] = useDeleteUserMutation()

  const {data:dataImg, refetch:refetchLogo} = useQuery(useGetUserImageUrlQuery, {
    notifyOnNetworkStatusChange:true,
    fetchPolicy:'network-only',
    variables: {
      userId: selectedId
    },
    skip: !selectedId
  })
  
  const userImage = useMemo(() => dataImg && dataImg.data && dataImg.data.length ? `${(process.env as any).REACT_APP_LOGO_PATH}/${dataImg.data}` : '', [dataImg])

  const queryVariables = React.useMemo(() => queryVariablesForUsers(search), [search])

  const { data: users, refetch: refetchUsers } = useQuery(useUsersQuery, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: queryVariables
  })

  const {refetch: refetchSelectedUser} = useQuery(useUserQuery, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onCompleted: (data: any) => {
      data && data.user && setUser({
       ...data.user as TUser,
       image: userImage
      })
    },
    variables: {
      id: selectedId
    },
    skip: !selectedId
  })

  const handlerSearch = useCallback((value: string) => {
    setSearch(value)
  },[setSearch])

  const addNewUser = () => {
    const submitFun = async (user: TUser) => {
      await mutationInsertUser({
        variables: {
          data: omit(user,['photoTmp', 'photoUrlTmp'])
        }
      })
      refetchUsers().then()
      refetchSelectedUser().then()
      refetchLogo().then()
      toastSuccess(translate.USER_SUCCESS_INSERTED_TEXT)
    }
    openDialogUserForm({ submitFun: submitFun })
  }

  const editUserData = async (user: TUser) => {
    if (user.id) {
      try {
        await mutationUpdateUser({
          variables: {
            id: Number(user?.id),
            data: {
              ...omit(user, ['id','photoTmp', 'photoUrlTmp'])
            }
          }
        })
        refetchUsers().then()
        refetchSelectedUser().then()
        refetchLogo().then()
        toastSuccess(translate.USER_SUCCESS_UPDATED_TEXT)
      } catch (e) {
          processErrorGraphQL(e)
      }
    
    }
  }

  const deleteUser = async (userId: string|number) => {
    if (userId) {
      try {
        await mutationDeleteUser({
          variables: {
            id: Number(userId)
          }
        })
       clearUser()
       await refetchUsers()
        toastSuccess(translate.USER_SUCCESS_DELETED_TEXT)
      } catch (e) {
        processErrorGraphQL(e)
      }
    }
  }

 /*  const editUserDetails = () => {
    const submitFun = async (user: TUser) => {
      await mutationUpdateUser({
        variables: {
          id: +_get(globalUserData, 'selected.id'),
          data: omit(user, ['photoTmp', 'photoUrlTmp'])
        }
      })
      refetchUsers().then()
      refetchSelectedUser().then()
      refetchLogo().then()
    }
    globalUserData.selected && globalUserData.selected.id &&
      openDialogUserForm({
        user: _get(globalUserData, 'selected') as TUser,
        submitFun: submitFun
      })
  } */

  /* const resetPassword = () => {
    const submitFun = async () => {
      await mutataionResetPassword({
        variables: {
          id: +_get(globalUserData, 'selected.id')
        }
      })
      refetchUsers().then()
      refetchSelectedUser().then()
    }
    globalUserData.selected && globalUserData.selected.id &&
        openDialogResetPassword({
          user: _get(globalUserData, 'selected'),
          submitFun: submitFun
        })
  }*/

  const { onClickHandler } = useOptimizeEventClick({
    eventHandler (data: IUseOptimizeEventData) {
      if (data.action === CONSTANT_USERS.EVENTS.SELECTED_ONE) {
        users && users.data && setSelectedId(Number(data.id))
        return
      }

      if (data.action === CONSTANT_USERS.EVENTS.ADD_NEW) {
        addNewUser()
        return
      }

      if (data.action === CONSTANT_USERS.EVENTS.EDIT) {
        // editUserDetails()
        return
      }

      if (data.action === CONSTANT_USERS.EVENTS.DELETE) {
        user && openDialogRemoveUser({
          user,
          submitFun: deleteUser
        })
        return
      }

      if (data.action === CONSTANT_USERS.EVENTS.RESET_PASSWORD) {

        const actionOnResetPassword = () => {
          refetchUsers().then()
          refetchSelectedUser().then()
        }
        user && openDialogResetPassword({
          user,
          submitFun: actionOnResetPassword
        })
      }
    }
  })

  useEffect(() => {
    if (user && user.id) {
      return
    }
    if (!users || !users.data || !users.data.items || users.data.items.length === 0) {
      return
    }
    const val = users.data.items[0]
    setSelectedId(Number(val.id))
  }, [user, users, setSelectedId])

  if (!users || !users.data) {
    return <></>
  }

  return (
    <div className={'d-flex h-100 w-100 pt-2 px-2'}>
      <div
        className={'d-flex text-center user-view-render'}
        onClick={onClickHandler}
        data-action-root
      >
        <SearchView
          handlerSearch={handlerSearch}
          data={users.data}
          helperText={translate.USER_DASHBOARD_SEARCH_INPUT_HELPER_TEXT}
          leftButtonIcon={faUserPlus}
          leftButtonEvent={CONSTANT_USERS.EVENTS.ADD_NEW}
          RenderComponent={SearchViewUserRender}
          selectedId={selectedId}
          className={'user-search-view'}
        />
      </div>
      <div className={'d-flex flex-2 justify-content-start relative'} onClick={onClickHandler}>
        <div className={'d-flex flex-row w-100 h-100 p-3'}>
          <UserInfo 
            user={user}
            submitAction={editUserData}
          />
        </div>
      </div>
    </div>
  )
}

export default UserDashboard

