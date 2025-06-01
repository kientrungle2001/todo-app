import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { replaceMediaUrl } from "@/api/defaultSettings";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const TinyMCEEditor: React.FC<Props> = ({ value, onChange }) => {
  const editorRef = useRef<any>(null);

  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      initialValue={replaceMediaUrl(value)}
      onInit={(evt, editor) => (editorRef.current = editor)}
      onEditorChange={onChange}
      init={{
        height: 400,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | code preview fullscreen",
        menubar: "file edit view insert format tools table help",
        toolbar_sticky: true,
        promotion: false,
        statusbar: false,
        convert_urls: true,
        relative_urls: false,
      }}
    />
  );
};
