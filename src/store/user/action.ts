import { TUser } from "apollo-graphql/type_logic/types";
import { ACTIONS } from "./type";

export const actionSetUser = (user: TUser) => ({
    type: ACTIONS.setUser,
    payload: user
})

export const actionSetSearch = (search: string) => ({
    type: ACTIONS.setSearch,
    payload: search
})

export const actionClearSearch = () => ({
    type: ACTIONS.clearSearch
})

export const actionClearUser = () => ({
    type: ACTIONS.clearUser
})