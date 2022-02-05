import { createSelector } from "reselect";
import { IReduxStore } from "store";



export const _selectorApplicationLoading = createSelector((state: IReduxStore) => state.application, application => application.loading)

export const _selectorApplicationUser = createSelector((state: IReduxStore) => state.application, application => application.loggedUser)