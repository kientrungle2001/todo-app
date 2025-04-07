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
            setItem(resp && resp.data ? resp.data : null);
        });
    }, [itemId]);
    if (!item)
        return <></>
    return <>
        {detail.label && <h2 className="text-center mb-3">{detail.label}</h2>}
        <Row>
            {detail.fields?.map((field: DataGridDetailField, index: number) => {
                return <React.Fragment key={index}>
                    <Col md={field.size ?? 12} className="mb-3 bordered">
                        <h5>
                            <strong>{field.label}</strong>: {' '}
                            {renderColumn(field, item, settings.table, {}, () => { }, () => { }, () => { }, () => { }, () => { })}</h5>
                    </Col>
                </React.Fragment>
            })}
        </Row>
    </>
}