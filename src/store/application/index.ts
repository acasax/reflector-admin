import {
  ACTIONS,
  IApplicationStore,
  IStateAction
}              from './type'
import {TUser} from 'apollo-graphql/type_logic/types'

export const initialState : IApplicationStore = {
  loading: false
} as IApplicationStore

export default (state = initialState, action : IStateAction) : IApplicationStore => {
  switch (action.type) {
    case ACTIONS.setRedirectLink:
      return {
        ...state,
        redirectLink: action.payload.data as string
      }

    case ACTIONS.setUser:
      return {
        ...state,
        loggedUser: action.payload as TUser
      }

      case ACTIONS.setLoading:
        return {
          ...state,
          loading: true
        }

    case ACTIONS.resetLoading:
      return {
        ...state,
        loading: false
      }

    case ACTIONS.clearUser:
      return {
        ...state,
        loggedUser: null
      }

    default:
      return state
  }
}
