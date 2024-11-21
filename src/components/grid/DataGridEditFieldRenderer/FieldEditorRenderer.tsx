import { EventHandler, SyntheticEvent, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ImageSelector } from "@/components/media/ImageSelector";
import { DataGridEditField } from "../DataGridEditTypes";
import { event } from "jquery";
import { replaceMediaUrl } from "@/api/defaultSettings";

export const FieldEditorRenderer = (field: DataGridEditField, item: any, setItem: (item: any) => void) => {
    const [selectedImage, setSelectedImage] = useState<string>("");
    const editorRef = useRef<any>(null); // Initialize the editorRef
    const handleImageInsert = (imagePath: string) => {
        if (editorRef.current) {
            editorRef.current.insertContent(`<img src="${imagePath}" alt="Selected Image"/>`);
        }
        setSelectedImage(imagePath); // Save selected image path
    };
    return (
        <>
            <Editor
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                initialValue={replaceMediaUrl(item[field.index])}
                onInit={(evt, editor) => (editorRef.current = editor)} // Store the editor instance in the ref
                init={{
                    height: 400,
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

                    toolbar_sticky: true, // Sticky toolbar
                    menubar: 'file edit view insert format tools table help', // Menubar options

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
                    statusbar: false,
                    convert_urls: true,
                    relative_urls: false, // Ensures URLs are absolute
                }}
                // onBlur={(event) => {
                //     let updatedItem = { ...item };
                //     updatedItem[field.index] = event.target.getContent() as string;
                //     setItem(updatedItem);
                // }}
                onEditorChange={(value: string) => {
                    item[field.index] = value;
                }}
            />
            <div className="mt-2 mb-3">
                <ImageSelector
                    selectedImage={selectedImage}
                    setSelectedImage={handleImageInsert}
                    hideInput={true}
                    selectImageLabel="Insert Image"
                />
            </div>

        </>
    );
};