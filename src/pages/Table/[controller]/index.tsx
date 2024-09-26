import { getSettingsByController } from "@/api/settings";
import { TableGrid, TableGridSettings } from "@/components/grid/TableGrid";
import { useRouter } from "next/router";
import React from "react";

export default function TableIndex(): React.ReactElement {
    let router = useRouter();
    const { controller } = router.query;
    let settings: TableGridSettings | null = getSettingsByController(controller as string);
    if (settings) {
        return <TableGrid controller={controller as string} settings={settings} />;
    }
    return <div>Not found</div>;
}