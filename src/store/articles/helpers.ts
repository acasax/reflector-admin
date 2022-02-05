import { createSelector } from "reselect";
import { IReduxStore } from "store";

export const _selectorArticleId = createSelector((state: IReduxStore) => state.article,article => article.selectedId)

export const _selectorArticleSearch = createSelector((state: IReduxStore) => state.article,article => article.search)