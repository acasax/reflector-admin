import { TUser } from "apollo-graphql/type_logic/types";

export interface IApplicationStore {
  redirectLink: string
  loggedUser?: TUser | null,
  loading: boolean
}

export enum ACTIONS {
  setUser = "APPLICATION_SET_LOGGED_USER",
  clearUser = "APPLICATION_CLEAR_LOGGED_USER",
  setRedirectLink = "APPLICATION_SET_REDIRECT_LINK",
  setLoading = "APPLICATION_SET_LOADING",
  resetLoading = "APPLICATION_RESET_LOADING"
}

export interface IStateAction {
  type: ACTIONS,
  payload: {
    data?: string | TUser | boolean
  }
}
