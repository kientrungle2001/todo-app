import Link from 'next/link';
import { useState } from 'react';
import { Tab, Tabs, Button, ButtonGroup, Container, Row, Col, Card, Nav } from 'react-bootstrap';

export function RibbonUI() {
    const [key, setKey] = useState<string>('home');

    return (
        <div className="bg-white border-bottom shadow-sm">
            <Nav variant="tabs" activeKey={key} className="px-3 pt-2">
                <Nav.Item>
                    <Nav.Link eventKey="home" onClick={() => setKey('home')}>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="insert" onClick={() => setKey('insert')}>Insert</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="layout" onClick={() => setKey('layout')}>Layout</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Link href="/Table/admin_user/" passHref legacyBehavior>
                        <Nav.Link eventKey="user">User</Nav.Link>
                    </Link>
                </Nav.Item>
            </Nav>

            <Container fluid className="bg-light border-top py-2">
                {key === 'home' && (
                    <Row className="gx-4">
                        <Col xs="auto">
                            <RibbonGroup title="Clipboard">
                                <ButtonGroup size="sm">
                                    <Button variant="secondary">Paste</Button>
                                    <Button variant="outline-secondary">Cut</Button>
                                    <Button variant="outline-secondary">Copy</Button>
                                </ButtonGroup>
                            </RibbonGroup>
                        </Col>
                        <Col xs="auto">
                            <RibbonGroup title="Font">
                                <ButtonGroup size="sm">
                                    <Button variant="outline-secondary"><strong>B</strong></Button>
                                    <Button variant="outline-secondary"><em>I</em></Button>
                                    <Button variant="outline-secondary"><u>U</u></Button>
                                </ButtonGroup>
                            </RibbonGroup>
                        </Col>
                    </Row>
                )}

                {key === 'insert' && (
                    <Row className="gx-4">
                        <Col xs="auto">
                            <RibbonGroup title="Tables">
                                <Button variant="outline-primary" size="sm">Insert Table</Button>
                            </RibbonGroup>
                        </Col>
                        <Col xs="auto">
                            <RibbonGroup title="Images">
                                <Button variant="outline-primary" size="sm">Insert Image</Button>
                            </RibbonGroup>
                        </Col>
                    </Row>
                )}

                {key === 'layout' && (
                    <Row className="gx-4">
                        <Col xs="auto">
                            <RibbonGroup title="Page Setup">
                                <ButtonGroup size="sm">
                                    <Button variant="outline-secondary">Margins</Button>
                                    <Button variant="outline-secondary">Orientation</Button>
                                </ButtonGroup>
                            </RibbonGroup>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
}

function RibbonGroup({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <Card className="p-2" style={{ minWidth: '120px' }}>
            <Card.Body className="p-2">
                {children}
            </Card.Body>
            <Card.Footer className="text-center p-1 small fw-bold bg-white border-top">
                {title}
            </Card.Footer>
        </Card>
    );
}
