import { TUser } from "apollo-graphql/type_logic/types";
import { ACTIONS, TStateAction, TUserStore } from "./type";

export const initialState: TUserStore = {
  search: ""
} as TUserStore;

export default (state = initialState, action: TStateAction): TUserStore => {
  switch (action.type) {
    case ACTIONS.setUser:
      return {
        ...state,
        selected: action.payload as TUser
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

    case ACTIONS.clearUser: {
      return {
        ...initialState,
        search: state.search,
      };
    }

    default:
      return state;
    }
  }
