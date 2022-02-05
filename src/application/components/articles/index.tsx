import React, { useCallback, useEffect, useState } from "react";
import SearchView from "../_common/SearchView";
import { translate } from "../../../translate/translate";
import { CONSTANT_ARTICLES } from "../../constants";
import { IUseOptimizeEventData, useOptimizeEventClick } from "../../../components/hooks/useOptimizeEventClick";
import { useArticles } from "../../hooks/useArticles";
import { TArticle } from "../../../apollo-graphql/type_logic/types";
import SearchViewArticleRender from "./dashboard/SearchViewRender";
import ArticleForm from "./Form";
import { useLoading } from "../../hooks/useLoading";
import ArticleInfo from "./Info/ArticleInfo";
import { openDialogRemoveArticle } from "./ArticleRemove";
import { useToast } from "../../hooks/useToast";

type TOpenFormState = {
  open: boolean;
  isItem?: boolean;
}

const Articles = () => {

  const { setLoading, resetLoading } = useLoading();
  const {
    articleId,
    setArticleId,
    article,
    setSearch,
    articles,
    insertNewArticle,
    updateArticle,
    deleteArticle,
    loading
  } = useArticles();
  const [openForm, setOpenForm]: [TOpenFormState, (b: TOpenFormState) => void] = useState({
    open: false
  } as TOpenFormState);

  const handlerSearch = useCallback((value: string) => {
    setSearch(value);
  }, [setSearch]);

  const addNewItem = () => {
    setOpenForm({
      open: true,
      isItem: false
    });
  };

  const removeArticle = async (id: string|number) => {
    id && await deleteArticle(Number(id))
  }

  const editItemDetails = () => {
    article && article.id &&
    setOpenForm({
      open: true,
      isItem: true
    });
  };
  
  const removeArticleDialog =  () => {
    article && openDialogRemoveArticle({
      article,
      submitFun: removeArticle
    })
  }
  const { onClickHandler } = useOptimizeEventClick({
    eventHandler (data: IUseOptimizeEventData) {
      if (data.action === CONSTANT_ARTICLES.EVENTS.SELECTED_ONE) {
        articles && articles.data && setArticleId(`${data.id}`);
        return;
      }

      if (data.action === CONSTANT_ARTICLES.EVENTS.ADD_NEW) {
        addNewItem();
        return;
      }
      if (data.action === CONSTANT_ARTICLES.EVENTS.EDIT) {
        editItemDetails();
        return;
      }

      if (data.action === CONSTANT_ARTICLES.EVENTS.DELETE) {
        data.id && removeArticleDialog()
        return;
      }
    }
  });

  const closeItemForm = () => {
    setOpenForm({
      open: false
    });
  };

  const insertUpdateItem = (article: TArticle, callback?: () => void, errorFn?: (e: any) => void) => {
    return openForm.isItem ? updateArticle(article, callback, errorFn) : insertNewArticle(article, callback, errorFn);
  };

  useEffect(() => {
    if (!loading) {
      resetLoading();
      return;
    }
    setLoading();
  }, [loading]);

  useEffect(() => {
    if (article) {
      return;
    }
    if (!articles || !articles.data || !articles.data.items || articles.data.items.length === 0) {
      return;
    }
    const val = articles.data.items[0];
    setArticleId(`${val.id}`);
  }, [article, articles, setArticleId]);

  if (!articles || !articles.data) {
    return <></>;
  }

  return (
    <div className={"d-flex h-100 w-100 pt-2 px-2 article-dashboard"}>
      <div
        className={"d-flex text-center user-view-render"}
        onClick={onClickHandler}
        data-action-root
      >
        <SearchView
          handlerSearch={handlerSearch}
          data={articles.data}
          helperText={translate.ARTICLES_DASHBOARD_SEARCH_INPUT_HELPER_TEXT}
          RenderComponent={SearchViewArticleRender}
          selectedId={articleId as string}
          className={"user-search-view"}
        />
      </div>
      <div className={"d-flex flex-2 justify-content-start relative"} onClick={onClickHandler}>
        <div className={"d-flex flex-row w-100 h-100 p-2 ml-2"}>
          {
            openForm.open ?
              <div className={"w-100 h-100"}>
                <ArticleForm
                  submitFun={insertUpdateItem}
                  article={openForm.isItem ? article : void(0)}
                  cancelFun={closeItemForm}
                />
              </div>
              :
              <ArticleInfo />
          }
        </div>
      </div>
    </div>
  );
};

export default Articles;

