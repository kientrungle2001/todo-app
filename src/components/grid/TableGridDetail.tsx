import React, { useEffect } from "react";
import { TableGridDetailType, TableGridSettings } from "./TableGrid";
import { TableGridDetail as GridDetail } from "./TableGrid";
import { Col, Container, Row } from "react-bootstrap";
import { TableGridDetailRendererDetail } from "./detail/renderer/TableGridDetailRendererDetail";
interface TableGridDetailProps {
    itemId: number;
    controller: string;
    settings: TableGridSettings
}

export const TableGridDetail: React.FC<TableGridDetailProps> = ({ controller, settings, itemId }): React.ReactElement => {
    return <>
        <Container fluid>
            {settings.details?.map((detail: GridDetail, index: number) => {
                return <React.Fragment key={index}>
                    <Row className="mb-3">
                        <Col md={12}>
                            {detail.type && detail.type == TableGridDetailType.GRID ?
                                'grid' : <TableGridDetailRendererDetail
                                    controller={controller}
                                    settings={settings}
                                    itemId={itemId}
                                    detail={detail} />}
                        </Col>
                    </Row>
                </React.Fragment>
            })}
        </Container>
    </>
}