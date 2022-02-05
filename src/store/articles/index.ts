import { ACTIONS, TArticlesStore, TStateAction } from "./type";

export const initialState: TArticlesStore = {
  search: ""
} as TArticlesStore;

export default (state = initialState, action: TStateAction): TArticlesStore => {
  switch (action.type) {
    case ACTIONS.setArticle:
      return {
        ...state,
        selectedId: action.payload as string
      };

    case ACTIONS.setSearch:
      return {
        ...state,
        search: action.payload as string
      };

    case ACTIONS.clearSearch:
      return {
        ...state,
        search: ""
      };

    default:
      return state;
  }
}
