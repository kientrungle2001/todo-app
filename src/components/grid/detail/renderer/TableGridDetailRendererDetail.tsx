import React, { useEffect, useState } from "react";
import { DataGridDetailField, TableGridDetail, TableGridSettings } from "../../TableGrid";
import { tableRepository } from "@/api/repositories/Table";
import { Col, Row } from "react-bootstrap";
import { renderColumn } from "../../columns/renderColumn";

interface TableGridDetailRendererDetailProps {
    itemId: number;
    controller: string;
    settings: TableGridSettings;
    detail: TableGridDetail;
}

export const TableGridDetailRendererDetail: React.FC<TableGridDetailRendererDetailProps> = ({ controller, settings, itemId, detail }): React.ReactElement => {
    const [item, setItem] = useState<any>(null);
    useEffect(() => {
        tableRepository.getItem(settings, itemId).then((resp: any) => {
            setItem(resp.data);
        });
    }, [itemId]);
    if (!item)
        return <></>
    return <>
        <Row>
            {detail.fields?.map((field: DataGridDetailField, index: number) => {
                return <React.Fragment key={index}>
                    <Col md={field.size ?? 12} className="mb-3 bordered">
                        <strong>{field.label}</strong>: {' '}
                        {renderColumn(field, item, settings.table, {}, () => {}, () => {}, () => {}, () => {}, () => {})}
                    </Col>
                </React.Fragment>
            })}
        </Row>
    </>
}