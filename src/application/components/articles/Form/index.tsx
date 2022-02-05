import React, { useCallback, useEffect } from "react";
import { IFieldsRefs, required, useValidation } from "../../../../validation";
import { TArticle } from "../../../../apollo-graphql/type_logic/types";
import * as _ from "lodash";
import { processErrorGraphQL } from "../../../../apollo";
import { Button } from "../../../../components/Button";
import { translate } from "translate/translate";
import InputTextWithValidation from "../../../../components/withValidation/InputTextWithValidation";
import TextEditor from "../Editor";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import CategoryPart from "./CategoryPart";
import ImagePart from "./ImagePart";
import category from "../../../../store/category";
// @ts-ignore
import draftToHtml from "draftjs-to-html";
// @ts-ignore
import htmlToDraft from "html-to-draftjs";
import CheckBoxWithValidation from "../../../../components/withValidation/CheckBoxWithValidation";

type TArticleForm = TArticle & {
  imagesTmp?: any;
  editorState?: any;
  isLink?: boolean;
  link?: string;
}

interface TArticleFormProps {
  article?: TArticle;
  cancelFun: () => void;
  submitFun: (article: TArticle, callback?: () => void, errorFn?: (e: any) => void) => Promise<any> | void;
}

export const getDataFromHTML = (data: any) => {
  const blocksFromHtml = htmlToDraft(data);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  return EditorState.createWithContent(contentState);
};

const ArticleForm = ({ article, cancelFun, submitFun }: TArticleFormProps) => {

  const validation = useValidation<TArticleForm>({
    initialData: {
      editorState: EditorState.createEmpty()
    }
  });
  const { setFieldValue, state } = validation;

  const handlerChangeEditor = useCallback((editor: EditorState) => {
    setFieldValue("editorState", editor as any, false);
  }, [setFieldValue]);

  const handlerOnSubmit = async () => {
    const { error, data, validations, refs } = await validation.validate();
    if (error) {
      const fieldRef: IFieldsRefs | undefined = refs.find(({ field }) => _.get(validations, `validations.${field}.error`));
      fieldRef && fieldRef.ref.current.focus();
      return;
    }
    try {
      const rawContentState = convertToRaw(data.editorState.getCurrentContent());

      const content = draftToHtml(rawContentState, {
        trigger: "#",
        separator: " "
      }, false, ({ type, data }: any) => {
        // entity.data.alignment is for float using the LCR options on the image 'none' means the user clicked center
        if (type === "IMAGE") {
          const alignment = data.alignment || "none";
          const textAlign = alignment === "none" ? "center" : alignment;
          return `<p style="text-align:${textAlign};"><img src="${data.src}" alt="${data.alt}" style="height: ${data.height};width: ${data.width}"/></p>`;
        }
      });

      const obj = Object.assign({}, {
          ..._.omit(data, ["category", "imagesTmp", "imagesTmpUrl", "images", "editorState", "isLink"]),
          categoryId: Number(data.categoryId),
          content
        },
        state.imagesTmp ? { image: (state.imagesTmp as any) } : {},
        state.isLink ? {
          useLink: Number(data.isLink),
          link: data.link
        } : {}) as TArticle;
      
      const errorFn = (e: any) => {
        processErrorGraphQL(e, validation);
      };
      await submitFun(obj, cancelFun, errorFn);

    } catch (e) {
      /** process the error */
      processErrorGraphQL(e, validation);
    }
  };

  useEffect(() => {
    if (!article) {
      return;
    }

    if (_.get(article, "articleImgVideo")) {
      const imagesUrl = (article.articleImgVideo as any)?.[0]?.url || "";
      setFieldValue("imagesTmpUrl", imagesUrl as any, true);
    }

    if (article?.content) {
      const editorState = getDataFromHTML(article.content);
      setFieldValue("editorState", editorState as any, true);
    }
    
    if (article?.useLink) {
      setFieldValue("isLink", !!article?.useLink as any, true);
    }

    ["id", "header", "content", "categoryId", 'link'].forEach((s: string) => _.get(article, s) ? setFieldValue(s, _.get(article, s).toString(), false) : null);
  }, [article, setFieldValue]);

  return (
    <div className={"py-1 article-form-root"}>
      <div className={"w-100"}>
        <div
          className={"d-flex justify-content-between align-items-center pb-2 mb-4 border-bottom-double border-color-white"}>
          <Button
            classNames={"text-upper"}
            label={translate.ARTICLE_FORM_BUTTON_BACK_LABEL}
            onClick={cancelFun}
            size={"sm"}
            outline
            color={"danger"}
          />
          <div
            className={"color-primary"}>{article ? translate.ARTICLE_FORM_EDIT_TITLE_LABEL : translate.ARTICLE_FORM_ADD_TITLE_LABEL}</div>
          <Button
            classNames={"text-upper"}
            size={"sm"}
            label={article ? translate.EDIT_LABEL : translate.SAVE_LABEL}
            onClick={handlerOnSubmit}
            outline
            color={"primary"}
          />
        </div>
      </div>

      <div className={"container"}>
        <div className={"w-100 d-flex justify-start items-center flex-wrap"}>
          <div className={"col-3"}>
            <CategoryPart
              validation={validation}
            />
          </div>
          <div className={"col-9"}>
            <InputTextWithValidation
              label={translate.ARTICLE_FORM_INPUT_HEADER_LABEL}
              selectOnFocus
              helperText={translate.ARTICLE_FORM_INPUT_HEADER_HELPER_TEXT}
              maxLength={512}
              validation={{
                useValidation: validation,
                model: "header",
                rule: {
                  required
                }
              }}
            />
          </div>
          <div className={"w-100 py-2 d-flex justify-content-between align-items-start"}>
            <div className={"col-6 relative"}>
              <CheckBoxWithValidation
                label={translate.ARTICLE_FORM_INPUT_USE_LINK_LABEL}
                selectOnFocus
                maxLength={512}
                component-direction={"row-reverse"}
                classNames={"article-use-link"}
                validation={{
                  useValidation: validation,
                  model: "isLink"
                }}
              />
              <InputTextWithValidation
                label={translate.ARTICLE_FORM_INPUT_LINK_LABEL}
                selectOnFocus
                helperText={translate.ARTICLE_FORM_INPUT_LINK_HELPER_TEXT}
                maxLength={512}
                disabled={!state.isLink}
                validation={{
                  useValidation: validation,
                  model: "link"
                }}
              />
            </div>
            <div className={"flex-2  d-flex justify-content-center align-items-center"}>
              <ImagePart validation={validation} />
            </div>
          </div>
        </div>
        <div className={"pt-2 flex-2"}>
          <TextEditor label={translate.ARTICLE_FORM_INPUT_CONTENT_LABEL} state={state.editorState}
                      setState={handlerChangeEditor} />
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;