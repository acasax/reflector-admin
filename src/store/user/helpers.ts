import { createSelector } from "reselect";
import { IReduxStore } from "store";


export const _selectorUserSelected = createSelector((state:IReduxStore)=> state.user,user => user.selected)

export const _selectorUserSearch = createSelector((state:IReduxStore)=> state.user,user => user.search)