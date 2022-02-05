import {
 Scalars,
 Maybe,
 Article,
 User,
 Category,
 ArticleImgVideo,
 LoginType,
 UserChangePasswordType
} from '../graphql'

type MergeSubType<Base, SubBase> = {
    [Key in keyof SubBase]:
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
    undefined extends Base[Key] ? never : SubBase[Key]
  }
  type Merge<M, N> = Pick<M, Exclude<keyof M, keyof N>> & MergeSubType<M, N>
  type Composite<M, N, K> = Merge<M, N> & Pick<K, Exclude<keyof K, keyof M>>
  
  export type TResponseArray<T = any> = {
    items: Array<any>;
    count: Scalars['Int'];
    perPage?: Maybe<Scalars['Int']>;
    page?: Maybe<Scalars['Int']>;
    hasMore?: Scalars['Boolean'];
  }

  export type TLogin = Partial<LoginType>

  export type TUserChangePassword = Partial<Merge<UserChangePasswordType, {
    confirmPassword?: string;
  }>>
  
  export type TForgotPasswordType = {
    email: string;
  }
  
  export type TUser = Partial<User>
  export type TCategory = Partial<Category>
  export type TArticleImgVideo = Partial<ArticleImgVideo>
  
  export type TArticle = Partial<Merge<Article, {
    user: TUser;
    category?: TCategory;
    articleImgVideo?: TArticleImgVideo[];
  }>>

