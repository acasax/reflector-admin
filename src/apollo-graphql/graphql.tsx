import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articles: ResponseArticles;
  articleImgVideo?: Maybe<ArticleImgVideo>;
  articleImgVideos: ResponseArticleImgVideos;
  category?: Maybe<Category>;
  categories: ResponseCategories;
  user?: Maybe<User>;
  users: ResponseUsers;
  triggerToken: LoginTokens;
  refreshToken: LoginTokens;
  login: LoginTokens;
  logged: User;
  getUserImageUrl?: Maybe<Scalars['String']>;
  authLogin: AuthLoginTokens;
};


export type QueryArticleArgs = {
  id: Scalars['Int'];
};


export type QueryArticlesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryArticleImgVideoArgs = {
  id: Scalars['Int'];
};


export type QueryArticleImgVideosArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryCategoriesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  group?: Maybe<Array<Scalars['String']>>;
  attributes?: Maybe<Array<Scalars['String']>>;
  include?: Maybe<Scalars['JSON']>;
};


export type QueryLoginArgs = {
  data: LoginType;
};


export type QueryGetUserImageUrlArgs = {
  userId: Scalars['Int'];
};


export type QueryAuthLoginArgs = {
  data: AuthUserLogin;
};

export type Article = {
  __typename?: 'Article';
  id: Scalars['ID'];
  header: Scalars['String'];
  content: Scalars['String'];
  categoryId: Scalars['Int'];
  userId: Scalars['Int'];
  views: Scalars['Float'];
  useLink?: Maybe<Scalars['Float']>;
  link?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
  category: Category;
  articleImgVideo?: Maybe<Array<ArticleImgVideo>>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  nickname: Scalars['String'];
  userName: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  role: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  articles?: Maybe<Array<Article>>;
};

export type ArticleImgVideo = {
  __typename?: 'ArticleImgVideo';
  id: Scalars['ID'];
  url: Scalars['String'];
  type?: Maybe<Scalars['Float']>;
  articleId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  article: Article;
};

export type Sorting = {
  direction?: Maybe<Scalars['String']>;
  field: Scalars['String'];
};


export type ResponseArticles = {
  __typename?: 'responseArticles';
  items: Array<Article>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseArticleImgVideos = {
  __typename?: 'responseArticleImgVideos';
  items: Array<ArticleImgVideo>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseCategories = {
  __typename?: 'responseCategories';
  items: Array<Category>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type ResponseUsers = {
  __typename?: 'responseUsers';
  items: Array<User>;
  count: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  hasMore: Scalars['Boolean'];
};

export type LoginTokens = {
  __typename?: 'loginTokens';
  token: Scalars['String'];
  refresh: Scalars['String'];
  refreshTime: Scalars['String'];
};

export type LoginType = {
  userName?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type AuthUserLogin = {
  accountCode?: Maybe<Scalars['String']>;
  userName: Scalars['String'];
  password: Scalars['String'];
};

export type AuthLoginTokens = {
  __typename?: 'AuthLoginTokens';
  token: Scalars['String'];
  refresh: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateArticle: Article;
  insertArticle: Article;
  updateArticleImgVideo: ArticleImgVideo;
  insertArticleImgVideo: ArticleImgVideo;
  updateCategory: Category;
  insertCategory: Category;
  updateUser: User;
  insertUser: User;
  resetPasswordByAdmin: Scalars['String'];
  userChangePassword: Scalars['String'];
  changePasswordUser: User;
  uploadImage: Scalars['String'];
  deleteUser: Scalars['String'];
  deleteCategory: Category;
  deleteArticleImgVideo: ArticleImgVideo;
  deleteArticle: Scalars['String'];
  updateArticleView: Article;
};


export type MutationUpdateArticleArgs = {
  data: ArticlesType;
  id: Scalars['Int'];
};


export type MutationInsertArticleArgs = {
  data: ArticlesType;
};


export type MutationUpdateArticleImgVideoArgs = {
  data: ArticlesVideo;
  id: Scalars['Int'];
};


export type MutationInsertArticleImgVideoArgs = {
  data: ArticlesVideo;
};


export type MutationUpdateCategoryArgs = {
  data: CategoryType;
  id: Scalars['Int'];
};


export type MutationInsertCategoryArgs = {
  data: CategoryType;
};


export type MutationUpdateUserArgs = {
  data: UserType;
  id: Scalars['Int'];
};


export type MutationInsertUserArgs = {
  data: UserType;
};


export type MutationResetPasswordByAdminArgs = {
  id: Scalars['Int'];
};


export type MutationUserChangePasswordArgs = {
  data: UserChangePasswordType;
};


export type MutationChangePasswordUserArgs = {
  userId: Scalars['Int'];
  data: UserChangePasswordType;
};


export type MutationUploadImageArgs = {
  userId: Scalars['Int'];
  file: Scalars['Upload'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteArticleImgVideoArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateArticleViewArgs = {
  id: Scalars['Int'];
};

export type ArticlesType = {
  header?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  useLink?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['Upload']>;
  categoryId?: Maybe<Scalars['Int']>;
};


export type ArticlesVideo = {
  image?: Maybe<Scalars['Upload']>;
  articleId: Scalars['Int'];
};

export type CategoryType = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type UserType = {
  userName?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['Upload']>;
  password?: Maybe<Scalars['String']>;
};

export type UserChangePasswordType = {
  password: Scalars['String'];
  currentPassword: Scalars['String'];
};

export type PaginationFilterSortPart = {
  direction: Scalars['String'];
  field: Scalars['String'];
};

export type PaginationFilterSearchPart = {
  value: Scalars['String'];
  fields: Array<Scalars['String']>;
};

export type PaginationFilterRequest = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<PaginationFilterSortPart>;
  filter?: Maybe<PaginationFilterSearchPart>;
};

export type AuthUserChangePassword = {
  password: Scalars['String'];
  key: Scalars['String'];
};

export type AuthUnlock = {
  pinCode?: Maybe<Scalars['String']>;
};

export type AuthUserRegister = {
  accountCode?: Maybe<Scalars['String']>;
  userName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserDetailsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'nickname' | 'userName' | 'image' | 'description' | 'role' | 'createdAt' | 'updatedAt'>
);

export type CategoryDetailsFragment = (
  { __typename?: 'Category' }
  & Pick<Category, 'id' | 'name' | 'description' | 'createdAt' | 'updatedAt'>
);

export type ArticleImgVideoDetailsFragment = (
  { __typename?: 'ArticleImgVideo' }
  & Pick<ArticleImgVideo, 'id' | 'url' | 'type' | 'articleId' | 'createdAt' | 'updatedAt'>
);

export type ArticleDetailsFragment = (
  { __typename?: 'Article' }
  & Pick<Article, 'id' | 'header' | 'content' | 'link' | 'useLink' | 'categoryId' | 'userId' | 'createdAt' | 'updatedAt'>
  & { category: (
    { __typename?: 'Category' }
    & CategoryDetailsFragment
  ), articleImgVideo?: Maybe<Array<(
    { __typename?: 'ArticleImgVideo' }
    & ArticleImgVideoDetailsFragment
  )>> }
);

export type ArticlesQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type ArticlesQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseArticles' }
    & Pick<ResponseArticles, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Article' }
      & ArticleDetailsFragment
    )> }
  ) }
);

export type ArticleQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ArticleQuery = (
  { __typename?: 'Query' }
  & { article?: Maybe<(
    { __typename?: 'Article' }
    & ArticleDetailsFragment
  )> }
);

export type InsertArticleMutationVariables = Exact<{
  data: ArticlesType;
}>;


export type InsertArticleMutation = (
  { __typename?: 'Mutation' }
  & { article: (
    { __typename?: 'Article' }
    & ArticleDetailsFragment
  ) }
);

export type UpdateArticleMutationVariables = Exact<{
  data: ArticlesType;
  id: Scalars['Int'];
}>;


export type UpdateArticleMutation = (
  { __typename?: 'Mutation' }
  & { article: (
    { __typename?: 'Article' }
    & ArticleDetailsFragment
  ) }
);

export type UpdateArticleViewMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UpdateArticleViewMutation = (
  { __typename?: 'Mutation' }
  & { article: (
    { __typename?: 'Article' }
    & ArticleDetailsFragment
  ) }
);

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteArticleMutation = (
  { __typename?: 'Mutation' }
  & { article: Mutation['deleteArticle'] }
);

export type AuthLoginQueryVariables = Exact<{
  data: AuthUserLogin;
}>;


export type AuthLoginQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'AuthLoginTokens' }
    & Pick<AuthLoginTokens, 'token'>
    & { user: (
      { __typename?: 'User' }
      & UserDetailsFragment
    ) }
  ) }
);

export type CategoriesQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
  include?: Maybe<Scalars['JSON']>;
}>;


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseCategories' }
    & Pick<ResponseCategories, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'Category' }
      & CategoryDetailsFragment
    )> }
  ) }
);

export type CategoryQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CategoryQuery = (
  { __typename?: 'Query' }
  & { category?: Maybe<(
    { __typename?: 'Category' }
    & CategoryDetailsFragment
  )> }
);

export type InsertCategoryMutationVariables = Exact<{
  data: CategoryType;
}>;


export type InsertCategoryMutation = (
  { __typename?: 'Mutation' }
  & { category: (
    { __typename?: 'Category' }
    & CategoryDetailsFragment
  ) }
);

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCategoryMutation = (
  { __typename?: 'Mutation' }
  & { category: (
    { __typename?: 'Category' }
    & CategoryDetailsFragment
  ) }
);

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['Int'];
  data: CategoryType;
}>;


export type UpdateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { category: (
    { __typename?: 'Category' }
    & CategoryDetailsFragment
  ) }
);

export type UsersQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<Sorting>;
  filter?: Maybe<Scalars['JSON']>;
}>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { data: (
    { __typename?: 'responseUsers' }
    & Pick<ResponseUsers, 'count' | 'perPage' | 'page'>
    & { items: Array<(
      { __typename?: 'User' }
      & UserDetailsFragment
    )> }
  ) }
);

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserDetailsFragment
  )> }
);

export type InsertUserMutationVariables = Exact<{
  data: UserType;
}>;


export type InsertUserMutation = (
  { __typename?: 'Mutation' }
  & { user: (
    { __typename?: 'User' }
    & UserDetailsFragment
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  data: UserType;
  id: Scalars['Int'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { user: (
    { __typename?: 'User' }
    & UserDetailsFragment
  ) }
);

export type ResetPasswordByAdminMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ResetPasswordByAdminMutation = (
  { __typename?: 'Mutation' }
  & { password: Mutation['resetPasswordByAdmin'] }
);

export type ChangePasswordUserMutationVariables = Exact<{
  data: UserChangePasswordType;
  userId: Scalars['Int'];
}>;


export type ChangePasswordUserMutation = (
  { __typename?: 'Mutation' }
  & { user: (
    { __typename?: 'User' }
    & UserDetailsFragment
  ) }
);

export type GetUserImageUrlQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetUserImageUrlQuery = (
  { __typename?: 'Query' }
  & { data: Query['getUserImageUrl'] }
);

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { user: Mutation['deleteUser'] }
);

export type UploadImageMutationVariables = Exact<{
  file: Scalars['Upload'];
  userId: Scalars['Int'];
}>;


export type UploadImageMutation = (
  { __typename?: 'Mutation' }
  & { data: Mutation['uploadImage'] }
);

export const UserDetailsFragmentDoc = gql`
    fragment userDetails on User {
  id
  nickname
  userName
  image
  description
  role
  createdAt
  updatedAt
}
    `;
export const CategoryDetailsFragmentDoc = gql`
    fragment categoryDetails on Category {
  id
  name
  description
  createdAt
  updatedAt
}
    `;
export const ArticleImgVideoDetailsFragmentDoc = gql`
    fragment articleImgVideoDetails on ArticleImgVideo {
  id
  url
  type
  articleId
  createdAt
  updatedAt
}
    `;
export const ArticleDetailsFragmentDoc = gql`
    fragment articleDetails on Article {
  id
  header
  content
  link
  useLink
  categoryId
  userId
  createdAt
  updatedAt
  category {
    ...categoryDetails
  }
  articleImgVideo {
    ...articleImgVideoDetails
  }
}
    ${CategoryDetailsFragmentDoc}
${ArticleImgVideoDetailsFragmentDoc}`;
export const ArticlesDocument = gql`
    query articles($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: articles(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...articleDetails
    }
    count
    perPage
    page
  }
}
    ${ArticleDetailsFragmentDoc}`;

/**
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useArticlesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
        return ApolloReactHooks.useQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, baseOptions);
      }
export function useArticlesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, baseOptions);
        }
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<typeof useArticlesLazyQuery>;
export type ArticlesQueryResult = ApolloReactCommon.QueryResult<ArticlesQuery, ArticlesQueryVariables>;
export const ArticleDocument = gql`
    query article($id: Int!) {
  article: article(id: $id) {
    ...articleDetails
  }
}
    ${ArticleDetailsFragmentDoc}`;

/**
 * __useArticleQuery__
 *
 * To run a query within a React component, call `useArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArticleQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
        return ApolloReactHooks.useQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, baseOptions);
      }
export function useArticleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, baseOptions);
        }
export type ArticleQueryHookResult = ReturnType<typeof useArticleQuery>;
export type ArticleLazyQueryHookResult = ReturnType<typeof useArticleLazyQuery>;
export type ArticleQueryResult = ApolloReactCommon.QueryResult<ArticleQuery, ArticleQueryVariables>;
export const InsertArticleDocument = gql`
    mutation insertArticle($data: ArticlesType!) {
  article: insertArticle(data: $data) {
    ...articleDetails
  }
}
    ${ArticleDetailsFragmentDoc}`;
export type InsertArticleMutationFn = ApolloReactCommon.MutationFunction<InsertArticleMutation, InsertArticleMutationVariables>;

/**
 * __useInsertArticleMutation__
 *
 * To run a mutation, you first call `useInsertArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertArticleMutation, { data, loading, error }] = useInsertArticleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertArticleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertArticleMutation, InsertArticleMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertArticleMutation, InsertArticleMutationVariables>(InsertArticleDocument, baseOptions);
      }
export type InsertArticleMutationHookResult = ReturnType<typeof useInsertArticleMutation>;
export type InsertArticleMutationResult = ApolloReactCommon.MutationResult<InsertArticleMutation>;
export type InsertArticleMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertArticleMutation, InsertArticleMutationVariables>;
export const UpdateArticleDocument = gql`
    mutation updateArticle($data: ArticlesType!, $id: Int!) {
  article: updateArticle(data: $data, id: $id) {
    ...articleDetails
  }
}
    ${ArticleDetailsFragmentDoc}`;
export type UpdateArticleMutationFn = ApolloReactCommon.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateArticleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateArticleMutation, UpdateArticleMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument, baseOptions);
      }
export type UpdateArticleMutationHookResult = ReturnType<typeof useUpdateArticleMutation>;
export type UpdateArticleMutationResult = ApolloReactCommon.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
export const UpdateArticleViewDocument = gql`
    mutation updateArticleView($id: Int!) {
  article: updateArticleView(id: $id) {
    ...articleDetails
  }
}
    ${ArticleDetailsFragmentDoc}`;
export type UpdateArticleViewMutationFn = ApolloReactCommon.MutationFunction<UpdateArticleViewMutation, UpdateArticleViewMutationVariables>;

/**
 * __useUpdateArticleViewMutation__
 *
 * To run a mutation, you first call `useUpdateArticleViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleViewMutation, { data, loading, error }] = useUpdateArticleViewMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateArticleViewMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateArticleViewMutation, UpdateArticleViewMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateArticleViewMutation, UpdateArticleViewMutationVariables>(UpdateArticleViewDocument, baseOptions);
      }
export type UpdateArticleViewMutationHookResult = ReturnType<typeof useUpdateArticleViewMutation>;
export type UpdateArticleViewMutationResult = ApolloReactCommon.MutationResult<UpdateArticleViewMutation>;
export type UpdateArticleViewMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateArticleViewMutation, UpdateArticleViewMutationVariables>;
export const DeleteArticleDocument = gql`
    mutation deleteArticle($id: Int!) {
  article: deleteArticle(id: $id)
}
    `;
export type DeleteArticleMutationFn = ApolloReactCommon.MutationFunction<DeleteArticleMutation, DeleteArticleMutationVariables>;

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleMutation, { data, loading, error }] = useDeleteArticleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteArticleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteArticleMutation, DeleteArticleMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(DeleteArticleDocument, baseOptions);
      }
export type DeleteArticleMutationHookResult = ReturnType<typeof useDeleteArticleMutation>;
export type DeleteArticleMutationResult = ApolloReactCommon.MutationResult<DeleteArticleMutation>;
export type DeleteArticleMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteArticleMutation, DeleteArticleMutationVariables>;
export const AuthLoginDocument = gql`
    query authLogin($data: AuthUserLogin!) {
  data: authLogin(data: $data) {
    token
    user {
      ...userDetails
    }
  }
}
    ${UserDetailsFragmentDoc}`;

/**
 * __useAuthLoginQuery__
 *
 * To run a query within a React component, call `useAuthLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthLoginQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAuthLoginQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthLoginQuery, AuthLoginQueryVariables>) {
        return ApolloReactHooks.useQuery<AuthLoginQuery, AuthLoginQueryVariables>(AuthLoginDocument, baseOptions);
      }
export function useAuthLoginLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthLoginQuery, AuthLoginQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuthLoginQuery, AuthLoginQueryVariables>(AuthLoginDocument, baseOptions);
        }
export type AuthLoginQueryHookResult = ReturnType<typeof useAuthLoginQuery>;
export type AuthLoginLazyQueryHookResult = ReturnType<typeof useAuthLoginLazyQuery>;
export type AuthLoginQueryResult = ApolloReactCommon.QueryResult<AuthLoginQuery, AuthLoginQueryVariables>;
export const CategoriesDocument = gql`
    query categories($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON, $include: JSON) {
  data: categories(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter, include: $include) {
    items {
      ...categoryDetails
    }
    count
    perPage
    page
  }
}
    ${CategoryDetailsFragmentDoc}`;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
      }
export function useCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = ApolloReactCommon.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const CategoryDocument = gql`
    query category($id: Int!) {
  category: category(id: $id) {
    ...categoryDetails
  }
}
    ${CategoryDetailsFragmentDoc}`;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCategoryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
        return ApolloReactHooks.useQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, baseOptions);
      }
export function useCategoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, baseOptions);
        }
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<typeof useCategoryLazyQuery>;
export type CategoryQueryResult = ApolloReactCommon.QueryResult<CategoryQuery, CategoryQueryVariables>;
export const InsertCategoryDocument = gql`
    mutation insertCategory($data: CategoryType!) {
  category: insertCategory(data: $data) {
    ...categoryDetails
  }
}
    ${CategoryDetailsFragmentDoc}`;
export type InsertCategoryMutationFn = ApolloReactCommon.MutationFunction<InsertCategoryMutation, InsertCategoryMutationVariables>;

/**
 * __useInsertCategoryMutation__
 *
 * To run a mutation, you first call `useInsertCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertCategoryMutation, { data, loading, error }] = useInsertCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertCategoryMutation, InsertCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertCategoryMutation, InsertCategoryMutationVariables>(InsertCategoryDocument, baseOptions);
      }
export type InsertCategoryMutationHookResult = ReturnType<typeof useInsertCategoryMutation>;
export type InsertCategoryMutationResult = ApolloReactCommon.MutationResult<InsertCategoryMutation>;
export type InsertCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertCategoryMutation, InsertCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation deleteCategory($id: Int!) {
  category: deleteCategory(id: $id) {
    ...categoryDetails
  }
}
    ${CategoryDetailsFragmentDoc}`;
export type DeleteCategoryMutationFn = ApolloReactCommon.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, baseOptions);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = ApolloReactCommon.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation updateCategory($id: Int!, $data: CategoryType!) {
  category: updateCategory(id: $id, data: $data) {
    ...categoryDetails
  }
}
    ${CategoryDetailsFragmentDoc}`;
export type UpdateCategoryMutationFn = ApolloReactCommon.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, baseOptions);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = ApolloReactCommon.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const UsersDocument = gql`
    query users($limit: Int, $offset: Int, $page: Int, $perPage: Int, $sort: Sorting, $filter: JSON) {
  data: users(limit: $limit, offset: $offset, page: $page, perPage: $perPage, sort: $sort, filter: $filter) {
    items {
      ...userDetails
    }
    count
    perPage
    page
  }
}
    ${UserDetailsFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sort: // value for 'sort'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserDocument = gql`
    query user($id: Int!) {
  user: user(id: $id) {
    ...userDetails
  }
}
    ${UserDetailsFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;
export const InsertUserDocument = gql`
    mutation insertUser($data: UserType!) {
  user: insertUser(data: $data) {
    ...userDetails
  }
}
    ${UserDetailsFragmentDoc}`;
export type InsertUserMutationFn = ApolloReactCommon.MutationFunction<InsertUserMutation, InsertUserMutationVariables>;

/**
 * __useInsertUserMutation__
 *
 * To run a mutation, you first call `useInsertUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertUserMutation, { data, loading, error }] = useInsertUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInsertUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertUserMutation, InsertUserMutationVariables>) {
        return ApolloReactHooks.useMutation<InsertUserMutation, InsertUserMutationVariables>(InsertUserDocument, baseOptions);
      }
export type InsertUserMutationHookResult = ReturnType<typeof useInsertUserMutation>;
export type InsertUserMutationResult = ApolloReactCommon.MutationResult<InsertUserMutation>;
export type InsertUserMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertUserMutation, InsertUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($data: UserType!, $id: Int!) {
  user: updateUser(data: $data, id: $id) {
    ...userDetails
  }
}
    ${UserDetailsFragmentDoc}`;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const ResetPasswordByAdminDocument = gql`
    mutation resetPasswordByAdmin($id: Int!) {
  password: resetPasswordByAdmin(id: $id)
}
    `;
export type ResetPasswordByAdminMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordByAdminMutation, ResetPasswordByAdminMutationVariables>;

/**
 * __useResetPasswordByAdminMutation__
 *
 * To run a mutation, you first call `useResetPasswordByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordByAdminMutation, { data, loading, error }] = useResetPasswordByAdminMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useResetPasswordByAdminMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordByAdminMutation, ResetPasswordByAdminMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetPasswordByAdminMutation, ResetPasswordByAdminMutationVariables>(ResetPasswordByAdminDocument, baseOptions);
      }
export type ResetPasswordByAdminMutationHookResult = ReturnType<typeof useResetPasswordByAdminMutation>;
export type ResetPasswordByAdminMutationResult = ApolloReactCommon.MutationResult<ResetPasswordByAdminMutation>;
export type ResetPasswordByAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordByAdminMutation, ResetPasswordByAdminMutationVariables>;
export const ChangePasswordUserDocument = gql`
    mutation changePasswordUser($data: UserChangePasswordType!, $userId: Int!) {
  user: changePasswordUser(data: $data, userId: $userId) {
    ...userDetails
  }
}
    ${UserDetailsFragmentDoc}`;
export type ChangePasswordUserMutationFn = ApolloReactCommon.MutationFunction<ChangePasswordUserMutation, ChangePasswordUserMutationVariables>;

/**
 * __useChangePasswordUserMutation__
 *
 * To run a mutation, you first call `useChangePasswordUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordUserMutation, { data, loading, error }] = useChangePasswordUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useChangePasswordUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordUserMutation, ChangePasswordUserMutationVariables>) {
        return ApolloReactHooks.useMutation<ChangePasswordUserMutation, ChangePasswordUserMutationVariables>(ChangePasswordUserDocument, baseOptions);
      }
export type ChangePasswordUserMutationHookResult = ReturnType<typeof useChangePasswordUserMutation>;
export type ChangePasswordUserMutationResult = ApolloReactCommon.MutationResult<ChangePasswordUserMutation>;
export type ChangePasswordUserMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangePasswordUserMutation, ChangePasswordUserMutationVariables>;
export const GetUserImageUrlDocument = gql`
    query getUserImageUrl($userId: Int!) {
  data: getUserImageUrl(userId: $userId)
}
    `;

/**
 * __useGetUserImageUrlQuery__
 *
 * To run a query within a React component, call `useGetUserImageUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserImageUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserImageUrlQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserImageUrlQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserImageUrlQuery, GetUserImageUrlQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserImageUrlQuery, GetUserImageUrlQueryVariables>(GetUserImageUrlDocument, baseOptions);
      }
export function useGetUserImageUrlLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserImageUrlQuery, GetUserImageUrlQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserImageUrlQuery, GetUserImageUrlQueryVariables>(GetUserImageUrlDocument, baseOptions);
        }
export type GetUserImageUrlQueryHookResult = ReturnType<typeof useGetUserImageUrlQuery>;
export type GetUserImageUrlLazyQueryHookResult = ReturnType<typeof useGetUserImageUrlLazyQuery>;
export type GetUserImageUrlQueryResult = ApolloReactCommon.QueryResult<GetUserImageUrlQuery, GetUserImageUrlQueryVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($id: Int!) {
  user: deleteUser(id: $id)
}
    `;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UploadImageDocument = gql`
    mutation uploadImage($file: Upload!, $userId: Int!) {
  data: uploadImage(file: $file, userId: $userId)
}
    `;
export type UploadImageMutationFn = ApolloReactCommon.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      file: // value for 'file'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, baseOptions);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = ApolloReactCommon.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;