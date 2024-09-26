import { getSettingsByController } from "@/api/settings";
import { TableGridSettings } from "@/components/grid/TableGrid";
import { TableGridEdit } from "@/components/grid/TableGridEdit";
import { useRouter } from "next/router";
import React from "react";

export default function TableEdit(): React.ReactElement {
    let router = useRouter();
    const { controller } = router.query;
    const { id } = router.query;
    if (!id || typeof id !== "string") {
        return <div>Invalid ID</div>;
    }
    const itemId: number = parseInt(id);
    let settings: TableGridSettings | null = getSettingsByController(controller as string);
    if (settings) {
        return <TableGridEdit controller={controller as string} itemId={itemId} settings={settings} />;
    }
    return <div>Not found</div>;
}