import React, { useEffect } from 'react';

interface TinyMCEEditorProps {
    value: string;  // The initial content of the editor
    onEditorChange: (content: string) => void;  // Callback function to handle content changes
}



const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({ value, onEditorChange }) => {
    useEffect(() => {
        if (typeof window.tinymce !== 'undefined') {

            let tinymce: any = window.tinymce;
            // Load TinyMCE from the local directory
            const script = document.createElement('script');
            script.src = '/tinymce/tinymce.min.js'; // Path to your self-hosted TinyMCE
            script.onload = () => {
                tinymce.init({
                    selector: '#editor',
                    height: 500,
                    menubar: false,
                    plugins: 'link image code',
                    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | code',
                    setup: function (editor: any) {
                        editor.on('change', function () {
                            onEditorChange(editor.getContent());
                        });
                    }
                });
            };
            document.body.appendChild(script);

            return () => {
                // Clean up TinyMCE instance when the component is unmounted
                if (tinymce) {
                    tinymce.remove();
                }
            };
        }
    }, [onEditorChange]);

    return <textarea id="editor" defaultValue={value}></textarea>;
};

export default TinyMCEEditor;
