import React, { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { translate } from "../../../../translate/translate";

const thumbInner = {
  width: "100%",
  padding: 5,
  height: "100%",
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  borderWidth: "3px",
  borderRadius: "2px",
  borderColor: "#c40606",
  borderStyle: "dashed"
} as any;

const img = {
  display: "block",
  zIndex: -1
} as any;

const ImagePart = ({ validation }: { validation: any }) => {
  const { state, setFieldValue } = validation;
  const changeImage = (file: any) => {
    setFieldValue("imagesTmp", file as any, false);
  };

  const image = useMemo(() => !state.imagesTmp && state?.imagesTmpUrl ? `${(process.env as any).REACT_APP_ARTICLES_PATH}${state.imagesTmpUrl}` : state.imagesTmp?.preview, [state]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/jpg,  image/png",
    multiple: false,
    maxFiles: 1,
    onDrop: (acceptedFiles: any) => {
      changeImage(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }));
    }
  });

  useEffect(() => () => {
    if (!state.imagesTmp || !state.imagesTmp.preview) {
      return;
    }
    // Make sure to revoke the data uris to avoid memory leaks
    URL.revokeObjectURL(state.imagesTmp.preview);
  }, [state.imagesTmp]);

  return (
    <section className={`image-part-root${!image ? " show" : ""}`}>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {!image && <p>{translate.ARTICLE_FORM_DRAG_AND_DROP_TEXT}</p>}
        {!image && <FontAwesomeIcon icon={faPlus} />}
        {image && <div style={thumbInner}>
          <img
            src={image}
            style={img}
            alt={translate.ARTICLE_FORM_DRAG_AND_DROP_ALT_TEXT}
          />
        </div>}
      </div>
    </section>
  );
};

export default ImagePart;
