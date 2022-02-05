import { TUser } from "apollo-graphql/type_logic/types";

export enum ACTIONS {
    setUser = 'USER_DASHBOARD_SET_SELECTED',
    setSearch = 'USER_DASHBOARD_SET_SEARCH',
    clearSearch = 'USER_DASHBOARD_CLEAR_SEARCH',
    clearUser = 'USER_DASHBOARD_CLEAR_USER'
}

export type TStateAction = {
    type: ACTIONS;
    payload: {
        data?: string | TUser | number;
    };
}

export type TUserStore = {
    selected?: TUser;
    search: string;
}