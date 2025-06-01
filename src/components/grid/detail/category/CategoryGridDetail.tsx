import React, { useEffect } from "react";
import { TableGridSettings } from "../../../../types/TableGridSettings";
import { useRouter } from "next/router";
import CategoryGridEdit from "./CategoryGridEdit";
import { categoryRepository } from "@/api/repositories/Category";

interface TableGridProps {
    itemId: number;
    controller: string;
    settings: TableGridSettings
}

export const CategoryGridDetail: React.FC<TableGridProps> = ({ controller, settings, itemId }): React.ReactElement => {
    const router = useRouter();
    const [item, setItem] = React.useState<any>(null);

    useEffect(() => {
        categoryRepository.getCategory(itemId, settings).then((resp: any) => {
            setItem(resp.data);
            console.log("Fetched item:", resp.data);
        });
    }, [itemId]);

    if (!item) {
        return <>
            <h3>Loading...</h3>
        </>
    }

    const handleCancelEdit = (): void => {
        router.push(`/Table/${controller}`);
    }

    return <>
        <CategoryGridEdit
            itemId={itemId} item={item}
            handleCancelEdit={handleCancelEdit} />
    </>
};
