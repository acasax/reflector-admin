import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionClearSearch, actionClearUser, actionSetSearch, actionSetUser } from "store/user/action";
import { _selectorUserSearch, _selectorUserSelected } from "store/user/helpers";
import { TUser } from "../../apollo-graphql/type_logic/types";

export const useUser = () => {

  const dispatch = useDispatch()
  const user = useSelector(_selectorUserSelected)
  const search = useSelector(_selectorUserSearch)

  const setUser =  useCallback((user: TUser) => {
    dispatch(actionSetUser(user))
  }, [dispatch])

  const setSearch = useCallback((search: string) => {
    dispatch(actionSetSearch(search))
  },[dispatch])

  const clearSearch = useCallback(() => {
    dispatch(actionClearSearch())
  },[dispatch])

  const clearUser = useCallback(() => {
    dispatch(actionClearUser())
  },[dispatch])

  return {
    user: user || {},
    search,
    setUser,
    setSearch,
    clearSearch,
    clearUser
  }

}