import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useArticles } from "../../../hooks/useArticles";
import { translate } from "../../../../translate/translate";
import EmptyTag from "../../../../components/Util/EmptyTag";
import articleImg from "../../../../assets/images/item-placeholder.png";
import ButtonShortcut from "../../../../components/Button/ButtonShortcut";
import { CONSTANT_ARTICLES, CONSTANT_USERS } from "../../../constants";
import { faNewspaper, faTimes } from "@fortawesome/free-solid-svg-icons";
import ConditionalRendering from "../../../../components/Util/ConditionalRender";
import ImageViewer from 'react-simple-image-viewer';
import ReactPlayer from 'react-player/youtube'

const ArticleInfo = () => {

  const { article } = useArticles();
  const [style,setStyle] = useState<any>({})

  const previewContent = useRef();

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const articleImgVideo = useMemo(() => {
    if (!article || !article?.articleImgVideo || !article?.articleImgVideo?.length) {
      return {
        url: articleImg
      }
    }
    return {
      ...article?.articleImgVideo[0],
      url: `${(process.env as any).REACT_APP_ARTICLES_PATH}${article?.articleImgVideo[0].url}`
    }
  },[article])
  
  const [useLink, link] = useMemo(() => [!!article.useLink, article.link], [article])

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  
  const articleContent = useMemo(() => article && article?.content ? article.content : '#########',[article])

  useEffect(() => {
    if (!previewContent || !previewContent.current) {
      return
    }
    const top = (previewContent.current as any)?.getBoundingClientRect()?.top || 0
    const height = window.innerHeight - top - 15
    setStyle((style: any) => {
      return {
        ...style,
        maxHeight: height
      }
    })
    if (previewContent.current) {
      (previewContent.current as any).innerHTML = articleContent
    }
  },[previewContent,setStyle,articleContent])

  return (
    <div className={"w-100 h-100 article-info-root"}>
      <div className={'d-flex flex-row justify-content-end align-items-center flex-fill'}>
        <div
          data-action={CONSTANT_ARTICLES.EVENTS.ADD_NEW}
        >
          <ButtonShortcut
            icon={faNewspaper}
            label={translate.ARTICLE_BUTTON_NEW_LABEL}
            classNames={"shortcut-button sm button-border-color mr-3"}
          />
        </div>
        <ConditionalRendering condition={article?.id}>
          <div
            data-action={CONSTANT_ARTICLES.EVENTS.EDIT}
          >
            <ButtonShortcut
              icon={faNewspaper}
              label={translate.ARTICLE_BUTTON_EDIT_LABEL}
              classNames={"shortcut-button sm button-border-color mr-3"}
            />
          </div>
        </ConditionalRendering>
        <ConditionalRendering condition={article?.id}>
          <div
            data-action={CONSTANT_ARTICLES.EVENTS.DELETE}
            data-action-id={article.id}
          >
            <ButtonShortcut
              icon={faTimes}
              label={translate.ARTICLE_BUTTON_DELETE_LABEL}
              classNames={"shortcut-button sm button-border-color mr-3"}
            />
          </div>
        </ConditionalRendering>
      </div>
      <div className={"d-flex flex-row flex-fill justify-content-start align-items-start color-primary w-100 article-header-part my-2"}>
        <div className={'d-flex flex-column flex-fill'}>
          <div className={"d-flex flex-row flex-fill justify-content-start align-items-center color-primary w-100  py-1"}>
            <div
              className={"text-left font-smaller-2 opacity-6 min-width-120"}>{translate.ARTICLE_INFO_CATEGORY_LABEL}&nbsp;:
            </div>
            <div className={"px-1"}>
              <EmptyTag model={article.category} field={"name"} placeholder={"#########"} />
            </div>
          </div>
          <div className={"d-flex flex-column flex-fill justify-content-start align-items-start color-primary w-100  py-1"}>
              <div
                className={"text-left font-smaller-2 opacity-6 min-width-120"}>{translate.ARTICLE_INFO_HEADER_LABEL}&nbsp;:
              </div>
              <div className={"px-1 flex-2"}>
                <EmptyTag model={article} field={"header"} placeholder={"#########"} />
              </div>
          </div>
          {useLink && link && <div className='article-player-wrapper'>
            <div
              className={"text-left font-smaller-2 pb-2 opacity-6 min-width-120"}>{translate.ARTICLE_INFO_LINK_LABEL}&nbsp;:
            </div>
            <ReactPlayer
              className='react-player'
                url={link}
              controls
              width='100%'
              height='100%'
            />
          </div>
          }
        </div>
        <div className={"d-flex flex-column justify-content-end align-items-center article-image-root"}>
            <div className={"text-left font-smaller-2 opacity-6 min-width-120"}>{translate.ARTICLE_INFO_IMAGE_LABEL}&nbsp;:
            </div>
            <div className={"p-1 flex-2 d-flex justify-content-center cursor-pointer"} >
              <div className={'circle'}>
                <img className={'logo-image'} src={articleImgVideo?.url} alt={'Članak'} onClick={() => openImageViewer(0)} />
              </div>
              {isViewerOpen && (
                <div className={'image-preview-root'}>
                <ImageViewer
                  src={ [articleImgVideo?.url] }
                  currentIndex={ currentImage }
                  disableScroll={ false }
                  closeOnClickOutside={ true }
                  onClose={ closeImageViewer }
                />
                </div>
              )}
            </div>
        </div>
      </div>

     <div className={"d-flex flex-column flex-fill justify-content-start align-items-start py-2 flex-2"}>
        <div
          className={"text-left font-smaller-2 opacity-6 min-width-120"}>{translate.ARTICLE_INFO_CONTENT_LABEL}&nbsp;:
        </div>
        <div ref={previewContent as any} style={style} className={"px-1 flex-2 article-content-preview"}>
         {/* <EmptyTag model={article} field={"content"} placeholder={"#########"} />*/}
        </div>
      </div>

    </div>
  );
};

export default ArticleInfo;