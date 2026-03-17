import React, { useEffect, useState } from "react";
import { TableGrid, TableGridDetail, TableGridSettings } from "../../TableGrid";
import { tableRepository } from "@/api/repositories/Table";
import { Row } from "react-bootstrap";

interface TableGridDetailRendererGridProps {
    itemId: number;
    controller: string;
    settings: TableGridSettings;
    detail: TableGridDetail;
}

export const TableGridDetailRendererGrid: React.FC<TableGridDetailRendererGridProps> = ({ controller, settings, itemId, detail }): React.ReactElement => {
    const [item, setItem] = useState<any>(null);
    useEffect(() => {
        tableRepository.getItem(settings, itemId).then((resp: any) => {
            setItem(resp.data);
        });
    }, [itemId]);
    if (!item)
        return <></>
    let defaultFilters: any = {};
    defaultFilters[detail.referenceField as string] = itemId;
    return <>
        <Row>
            {detail.settings ?
                <TableGrid controller={detail.controller as string} settings={detail.settings} defaultFilters={defaultFilters} parentController={controller} parentSettings={settings} parentItem={item} /> : <></>}
        </Row>
    </>
}