import React, { useEffect, useRef, useState } from "react";
import { EditorState  } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { getSelectionCustomInlineStyle, } from 'draftjs-utils';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Label from "../../../../components/basic/Label";
import HelperText from "../../../../components/basic/HelperText";

type TTextEditorProps = {
  state: EditorState;
  setState: (editor: EditorState) => void;
  label: string;
  error?: string|boolean;
  defaultValue?: EditorState;
}

const TextEditor = ({state, setState, label, error, defaultValue}: TTextEditorProps) => {

  const [style,setStyle] = useState<any>(defaultValue)
  const editorReference = useRef();
  useEffect(() => {
    editorReference.current && (editorReference.current as any).focusEditor();
  }, [editorReference]);

  useEffect(() => {
    if (!editorReference || !editorReference.current) {
      return
    }
    const top = (editorReference.current as any)?.wrapper?.getBoundingClientRect()?.top || 0
    const height = window.innerHeight - top
    setStyle((style: any) => {
      return {
        ...style,
        maxHeight: height
      }
    })
  },[editorReference,setStyle])

  return (
    <div className="editor">
      <Label label={label} />
      <Editor
        toolbar={{
          options:  ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'image', 'history'],
        }}
        wrapperStyle={style}
        editorState={state}
        editorStyle={{
          fontFamily: "Sura"
        }}
        ref={editorReference as any}
        onEditorStateChange={setState}
        wrapperClassName="editor-wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="editor-toolbar-class"
      />
      <HelperText error={error} />
    </div>
  );
};

export default TextEditor