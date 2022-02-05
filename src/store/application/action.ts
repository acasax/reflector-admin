import {ACTIONS} from './type'
import {TUser}   from '../../apollo-graphql/type_logic/types'

export const redirectLink = (link : string) =>
  ({
    type: ACTIONS.setRedirectLink, payload: {
      data: link
    }
  })

export const setLoggedUser = (user : TUser) => ({
  type: ACTIONS.setUser,
  payload:  user
})

export const clearLoggedUser = () => ({
  type: ACTIONS.clearUser
})

export const actionSetLoading = () => ({
  type: ACTIONS.setLoading
})

export const actionResetLoading = () => ({
  type: ACTIONS.resetLoading
})
