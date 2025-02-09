import { Editor } from "@tinymce/tinymce-react";

interface QuestionAnswerEditorProps {
    value: string;
    updateValue: (value: string) => void;
}

export const QuestionAnswerEditor: React.FC<QuestionAnswerEditorProps> = ({value, updateValue}) => {
    return <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        initialValue={value}
        init={{
            height: 200,
            plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar:
                'undo redo | ' +
                'bold italic underline | alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | ' +
                'link image table | ' +
                'code preview fullscreen',

            toolbar_sticky: false, // Sticky toolbar
            menubar: false, // Menubar options

            // Provide the path to your local TinyMCE installation
            script_url: '/tinymce/tinymce.min.js',
            external_plugins: {
                advlist: '/tinymce/plugins/advlist/plugin.min.js',
                autolink: '/tinymce/plugins/autolink/plugin.min.js',
                lists: '/tinymce/plugins/lists/plugin.min.js',
                link: '/tinymce/plugins/link/plugin.min.js',
                image: '/tinymce/plugins/image/plugin.min.js',
                charmap: '/tinymce/plugins/charmap/plugin.min.js',
                preview: '/tinymce/plugins/preview/plugin.min.js',
                anchor: '/tinymce/plugins/anchor/plugin.min.js',
            },
            promotion: false,
            statusbar: false
        }}
        onBlur={(event) => {
            updateValue(event.target.getContent() as string)
        }}
    />
}