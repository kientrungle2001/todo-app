import React, { useEffect } from "react";
import { TableGridSettings } from "../../TableGrid";
import { useRouter } from "next/router";
import ResourceGridEdit from "./ResourceGridEdit";
import { resourceRepository } from "@/api/repositories/Resource";

interface TableGridProps {
    itemId: number;
    controller: string;
    settings: TableGridSettings
}

export const ResourceGridDetail: React.FC<TableGridProps> = ({ controller, settings, itemId }): React.ReactElement => {
    const router = useRouter();
    const [item, setItem] = React.useState<any>(null);

    useEffect(() => {
        resourceRepository.getResource(itemId, settings).then((resp: any) => {
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
        <ResourceGridEdit
            itemId={itemId} item={item}
            handleCancelEdit={handleCancelEdit} />
    </>
};
