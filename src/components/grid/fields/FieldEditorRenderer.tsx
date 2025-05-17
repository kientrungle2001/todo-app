import { useState } from "react";
import { ImageSelector } from "@/components/media/ImageSelector";
import { DataGridEditField } from "../DataGridEditTypes";
import { TinyMCEEditor } from "./TinyMCEEditor";

export const FieldEditorRenderer = (
    field: DataGridEditField,
    item: any,
    setItem: (item: any) => void
) => {
    const [selectedImage, setSelectedImage] = useState<string>("");

    const handleImageInsert = (imagePath: string) => {
        if (window.tinymce?.activeEditor) {
            window.tinymce.activeEditor.insertContent(`<img src="${imagePath}" alt="Selected Image"/>`);
        }
        setSelectedImage(imagePath);
    };

    return (
        <>
            <TinyMCEEditor
                value={item[field.index]}
                onChange={(value: string) => {
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
