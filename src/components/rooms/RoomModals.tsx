import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import RoomForm from '@/components/rooms/RoomForm';
import { fetchCenters, Room } from '@/store/roomSlice';

interface RoomModalsProps {
    showAddModal: boolean;
    handleCloseAddModal: () => void;
    showEditModal: boolean;
    handleCloseEditModal: () => void;
    currentRoom: Room | null;
    setCurrentRoom: React.Dispatch<React.SetStateAction<Room | null>>;
    addRoom: (room: Room) => void;
    updateRoom: (room: Room) => void;
}

const RoomModals: React.FC<RoomModalsProps> = ({
    showAddModal,
    handleCloseAddModal,
    showEditModal,
    handleCloseEditModal,
    currentRoom,
    setCurrentRoom,
    addRoom,
    updateRoom
}) => {
    const dispatch = useAppDispatch();
    const centers = useAppSelector(state => state.rooms.centers);
    useEffect(() => {
        dispatch(fetchCenters());  // Fetch centers when the component loads
    }, [dispatch]);
    const handleAddRoom = (room: Room) => {
        addRoom(room);
        handleCloseAddModal();
    };

    const handleUpdateRoom = (room: Room) => {
        if (currentRoom) {
            updateRoom({ ...currentRoom, ...room });
            handleCloseEditModal();
        }
    };

    return (
        <>
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RoomForm
                        centers={centers}
                        initialData={{ name: '', status: 1, centerId: 0, size: 0, note: '' }}
                        onSubmit={handleAddRoom}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Row className="w-100">
                        <Col className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={handleCloseAddModal}>Close</Button>
                            <Button variant="primary" type="submit" form="roomForm">Add Room</Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentRoom && (
                        <RoomForm
                            initialData={currentRoom}
                            centers={centers}
                            onSubmit={handleUpdateRoom}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Row className="w-100">
                        <Col className="d-flex justify-content-between">
                            <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
                            <Button variant="primary" type="submit" form="roomForm">Save Changes</Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RoomModals;
