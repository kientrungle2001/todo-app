import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Modal, Form, InputGroup, Breadcrumb, Row, Col, Card } from 'react-bootstrap';
import { getAxios } from '@/api/mediaAxiosInstance';
import { storage } from '@/api/storage';
import { useRouter } from 'next/router';

interface GridDialogProps {
    show: boolean;
    value: any;
    onClose: () => void;
    onSelect: (item: any) => void;
}

export const GridDialog: React.FC<GridDialogProps> = ({ value, show, onClose, onSelect }) => {
    const [items, setItems] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<string | null>();
    const router = useRouter();

    // Handle folder navigation and file selection
    const handleItemClick = (item: any) => {

    };

    useEffect(() => {
        if (show) {

        }
    }, [show, selectedItem]);

    return (
        <Modal show={show} onHide={onClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Select Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Row>
                    {items.map((item, index) => (
                        <Col md={2}
                            key={index}
                            onClick={() => handleItemClick(item)}
                            className="mt-2 equal-height-col"
                        >
                            {/** create card */}
                            <Card style={{ cursor: 'pointer', width: '100%', height: "100%", border: selectedItem === item ? '2px solid blue' : '1px solid #ccc' }}>

                                <Card.Body>
                                    <span> {item.name}</span>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    disabled={!selectedItem}
                    onClick={() => selectedItem && onSelect(selectedItem)}
                >
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
