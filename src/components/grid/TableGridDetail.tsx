'use client'; // cần thiết nếu bạn dùng Next.js App Router (với Server Component mặc định)

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TableGridDetailType } from "../../types/grid/TableGridDetailType";
import { TableGridSettings } from "../../types/TableGridSettings";
import { TableGridDetail as GridDetail } from "./TableGrid";
import { Container, Row, Col, Nav, Tab, Button } from "react-bootstrap";
import { TableGridDetailRendererDetail } from "./detail/renderer/TableGridDetailRendererDetail";
import { TableGridDetailRendererGrid } from "./detail/renderer/TableGridDetailRendererGrid";

interface TableGridDetailProps {
    itemId: number;
    controller: string;
    settings: TableGridSettings;
}

export const TableGridDetail: React.FC<TableGridDetailProps> = ({ controller, settings, itemId }): React.ReactElement => {
    const router = useRouter();
    const [activeKey, setActiveKey] = useState<string>("0");

    // Đọc hash từ URL khi load
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash;
            if (hash.startsWith('#tab-')) {
                const tabIndex = hash.replace('#tab-', '');
                setActiveKey(tabIndex);
            }
        }
    }, []);

    // Khi đổi tab, cập nhật hash URL
    const handleTabSelect = (key: string | null) => {
        if (key) {
            setActiveKey(key);
            if (typeof window !== 'undefined') {
                window.history.replaceState(null, '', `#tab-${key}`);
            }
        }
    };

    // Quay lại trang danh sách
    const handleBack = () => {
        router.push(`/Table/${controller}`);
    };

    return (
        <Container fluid>
            <Row className="mb-3">
                <Col>
                    <Button variant="secondary" onClick={handleBack}>
                        ← Quay lại danh sách
                    </Button>
                </Col>
            </Row>

            <Tab.Container activeKey={activeKey} onSelect={handleTabSelect}>
                <Row>
                    <Col sm={3} md={2} className="border-end">
                        <Nav variant="pills" className="flex-column">
                            {settings.details?.map((detail: GridDetail, index: number) => (
                                <Nav.Item key={`${controller}-${detail.controller}-${index}`}>
                                    <Nav.Link eventKey={index.toString()}>
                                        {detail.label || `Chi tiết ${index + 1}`}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Col>

                    <Col sm={9} md={10}>
                        <Tab.Content>
                            {settings.details?.map((detail: GridDetail, index: number) => (
                                <Tab.Pane eventKey={index.toString()} key={index}>
                                    {detail.type === TableGridDetailType.GRID ? (
                                        <TableGridDetailRendererGrid
                                            controller={controller}
                                            settings={settings}
                                            itemId={itemId}
                                            detail={detail}
                                        />
                                    ) : (
                                        <TableGridDetailRendererDetail
                                            controller={controller}
                                            settings={settings}
                                            itemId={itemId}
                                            detail={detail}
                                        />
                                    )}
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};
