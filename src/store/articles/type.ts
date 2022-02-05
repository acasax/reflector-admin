import { TArticle } from "../../apollo-graphql/type_logic/types";

export enum ACTIONS {
  setArticle = "ARTICLE_DASHBOARD_SET_SELECTED",
  setSearch = "ARTICLE_DASHBOARD_SET_SEARCH",
  clearSearch = "ARTICLE_DASHBOARD_CLEAR_SEARCH"
}

export type TStateAction = {
  type: ACTIONS;
  payload: {
    data?: string | TArticle | number;
  };
}

export type TArticlesStore = {
  selectedId: string;
  search: string;
}