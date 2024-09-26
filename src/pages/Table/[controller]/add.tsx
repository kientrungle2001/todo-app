import { getSettingsByController } from "@/api/settings";
import { TableGridSettings } from "@/components/grid/TableGrid";
import { TableGridAdd } from "@/components/grid/TableGridAdd";
import { useRouter } from "next/router";
import React from "react";

export default function TableAdd(): React.ReactElement {
    let router = useRouter();
    const { controller } = router.query;
    let settings: TableGridSettings | null = getSettingsByController(controller as string);
    if (settings) {
        return <TableGridAdd controller={controller as string} settings={settings} />;
    }
    return <div>Not found</div>;
}