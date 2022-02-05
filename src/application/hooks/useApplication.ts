import { TUser } from 'apollo-graphql/type_logic/types'
import { useCallback, useMemo } from "react";
import {
  useDispatch,
  useSelector
}                    from 'react-redux'
import {IReduxStore} from '../../store'
import { redirectLink as actionRedirectLink, setLoggedUser as actionSetLoggedUser, clearLoggedUser as actionClearLoggedUser} from '../../store/application/action'

enum UserRole {
  WRITER,
  ADMINISTRATOR 
}

export const useApplication = () => {

  const dispatch = useDispatch()

  const setRedirectLink = useCallback((data: string) => {
    dispatch(actionRedirectLink(data))
  }, [dispatch])

  const setLoggedUser = useCallback((loggedUser: TUser) => {
    dispatch(actionSetLoggedUser(loggedUser))
  }, [dispatch])

  const clearLoggedUser = useCallback(() => {
    dispatch(actionClearLoggedUser())
  }, [dispatch])

  const redirectLink = useSelector((state: IReduxStore) => state.application.redirectLink)
  const loggedUser = useSelector((state: IReduxStore) => state.application.loggedUser)
  const isAdmin = useMemo(() => loggedUser && loggedUser?.role === UserRole.ADMINISTRATOR,[loggedUser])

  return useMemo(() => ({
    redirectLink,
    loggedUser,
    setRedirectLink,
    setLoggedUser,
    clearLoggedUser,
    isAdmin
  }),[
    redirectLink,
    loggedUser,
    setRedirectLink,
    setLoggedUser,
    clearLoggedUser,
    isAdmin
  ])
}
