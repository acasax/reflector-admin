import { useDispatch, useSelector } from "react-redux";
import { _selectorArticleId, _selectorArticleSearch } from "../../store/articles/helpers";
import React, { useCallback, useMemo } from "react";
import { actionArticleClearSearch, actionArticleSetSearch, actionSetArticle } from "../../store/articles/action";
import {
  useArticleQuery,
  useArticlesQuery, useDeleteArticleMutation,
  useInsertArticleMutation,
  useUpdateArticleMutation
} from "../../apollo-graphql/graphql";
import { useQuery } from "./useQuery";
import { IReduxStore } from "../../store";
import { TArticle } from "../../apollo-graphql/type_logic/types";
import { processErrorGraphQL } from "../../apollo";
import { omit as _omit } from "lodash";
import { useApplication } from "./useApplication";
import { queryVariablesForArticles } from "../../apollo-graphql/variablesQ";
import { useToast } from "./useToast";
import { translate } from "../../translate/translate";

export const useArticles = () => {

  const {toastSuccess} = useToast()
  const dispatch = useDispatch();
  const articleId = useSelector(_selectorArticleId);
  const search = useSelector(_selectorArticleSearch);
  const {isAdmin, loggedUser} = useApplication()

  const { selectedId } = useSelector((state: IReduxStore) => state.article);

  const [mutationInsert, { loading: insertLoading }] = useInsertArticleMutation();
  const [mutationUpdate, { loading: updateLoading }] = useUpdateArticleMutation();
  const [mutationDelete, {loading: deleteLoading}] = useDeleteArticleMutation()

  const queryVariables = React.useMemo(() => queryVariablesForArticles(search, !isAdmin && loggedUser ? loggedUser.id : undefined), [search,isAdmin,loggedUser]);

  const { data: articles, refetch: refetchArticles } = useQuery(useArticlesQuery, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    variables: queryVariables
  });

  const { refetch: refetchSelectedArticle, data } = useQuery(useArticleQuery, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    variables: {
      id: Number(selectedId)
    },
    skip: !Number(selectedId)
  });

  const article = useMemo(() => data && data.article ? data.article : {} as any, [data]);

  const setArticleId = useCallback((art: string) => {
    dispatch(actionSetArticle(art));
  }, [dispatch]);

  const setSearch = useCallback((search: string) => {
    dispatch(actionArticleSetSearch(search));
  }, [dispatch]);

  const clearSearch = useCallback(() => {
    dispatch(actionArticleClearSearch());
  }, [dispatch]);

  const insertNewArticle = (article: TArticle, callback?: () => void, errorFn?: (e: any) => void) => {
    mutationInsert({
      variables: {
        data: article
      }
    })
      .then((v) => {
        if (v && v.data && v.data.article) {
          setArticleId(v.data.article.id);
          refetchSelectedArticle().then();
          refetchArticles().then()
          toastSuccess(translate.ARTICLE_SUCCESS_INSERTED_TEXT)
          callback && callback();
        }
      })
      .catch(e => {
        errorFn ? errorFn(e) : processErrorGraphQL(e, {});
      });
  };
  
  const deleteArticle = async (id: number) => {
    try {
     await mutationDelete({
       variables: {
         id
       }
     })
      await refetchArticles()
      await refetchSelectedArticle()
      toastSuccess(translate.ARTICLE_SUCCESS_DELETED_TEXT)
    } catch (e) {
      processErrorGraphQL(e)
    } 
  }

  const updateArticle = (article: TArticle, callback?: () => void, errorFn?: (e: any) => void) => {
    mutationUpdate({
      variables: {
        id: Number(article.id),
        data: _omit(article, ["id"])
      }
    })
      .then(() => {
        refetchSelectedArticle().then();
        refetchArticles().then()
        toastSuccess(translate.ARTICLE_SUCCESS_UPDATED_TEXT)
        callback && callback();
      })
      .catch(e => {
        errorFn ? errorFn(e) : processErrorGraphQL(e, {});
      });
  };

  return {
    loading: insertLoading || updateLoading || deleteLoading,
    article,
    articleId,
    search,
    setArticleId,
    setSearch,
    clearSearch,
    articles,
    insertNewArticle,
    updateArticle,
    deleteArticle
  };
};