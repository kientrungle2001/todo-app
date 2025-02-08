import { ImageSelector } from "@/components/media/ImageSelector";
import { DataGridEditField } from "../DataGridEditTypes";

export const FieldImageRenderer = (field: DataGridEditField, item: any, setItem: (item: any) => void) => {
    return (
        <ImageSelector
            selectedImage={item[field.index]}
            setSelectedImage={(imageUrl: string) => {
                let updatedItem: any = { ...item };
                updatedItem[field.index] = imageUrl;
                setItem(updatedItem);
            }}
        />
    );
};