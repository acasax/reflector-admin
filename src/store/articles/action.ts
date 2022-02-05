import { TArticle } from "../../apollo-graphql/type_logic/types";
import { ACTIONS } from "./type";

export const actionSetArticle = (artId: string) => ({
  type: ACTIONS.setArticle,
  payload: artId
})


export const actionArticleSetSearch = (search: string) => ({
  type: ACTIONS.setSearch,
  payload: search
})

export const actionArticleClearSearch = ()=> ({
  type: ACTIONS.clearSearch
})