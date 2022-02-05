import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import activeBackground from './active-background'
import { IStoreActiveBackground } from './active-background/type'
import application from './application'
import { IApplicationStore } from './application/type'
import category from './category'
import { IStoreCategory } from './category/type'
import dialogsUI from './dialog-ui'
import { IDialogUI } from './dialog-ui/type'
import user from './user'
import { TUserStore } from './user/type'
import { TArticlesStore } from "./articles/type";
import article from './articles'

export interface IReduxStore {
  application : IApplicationStore,
  activeBackground : IStoreActiveBackground,
  dialogsUI : IDialogUI[],
  category: IStoreCategory,
  user: TUserStore
  article: TArticlesStore
}

export const rootReducer = combineReducers( {
  application,
  activeBackground,
  dialogsUI,
  category,
  user,
  article
} )

export type RootState = ReturnType<typeof rootReducer>

const middleware = thunk as ThunkMiddleware

// const ReduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && ((window as any).__REDUX_DEVTOOLS_EXTENSION__() || compose)
const ReduxDevTools = typeof ( window as any ).__REDUX_DEVTOOLS_EXTENSION__ === 'undefined'
  ? ( a : any ) => a
  : ( window as any ).__REDUX_DEVTOOLS_EXTENSION__ &&
    ( window as any ).__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore( rootReducer, compose( applyMiddleware( middleware ), ReduxDevTools ) )

export default store
