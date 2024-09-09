import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import SubjectForm from '@/components/subjects/SubjectForm';
import { Subject } from '@/store/subjectSlice';

interface SubjectModalsProps {
    showAddModal: boolean;
    handleCloseAddModal: () => void;
    showEditModal: boolean;
    handleCloseEditModal: () => void;
    currentSubject: Subject | null;
    setCurrentSubject: React.Dispatch<React.SetStateAction<Subject | null>>;
    addSubject: (subject: Subject) => void;
    updateSubject: (subject: Subject) => void;
}

const SubjectModals: React.FC<SubjectModalsProps> = ({
    showAddModal,
    handleCloseAddModal,
    showEditModal,
    handleCloseEditModal,
    currentSubject,
    setCurrentSubject,
    addSubject,
    updateSubject
}) => {
    const handleAddSubject = (subject: Subject) => {
        addSubject(subject);
        handleCloseAddModal();
    };

    const handleUpdateSubject = (subject: Subject) => {
        if (currentSubject) {
            updateSubject({ ...currentSubject, ...subject });
            handleCloseEditModal();
        }
    };

    return (
        <>
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Subject</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SubjectForm
                        initialData={{ name: '', code: '', online: 0, status: 1 }}
                        onSubmit={handleAddSubject}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Row className="w-100">
                        <Col className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={handleCloseAddModal}>Close</Button>
                            <Button variant="primary" type="submit" form="subjectForm">Add Subject</Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Subject</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentSubject && (
                        <SubjectForm
                            initialData={currentSubject}
                            onSubmit={handleUpdateSubject}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Row className="w-100">
                        <Col className="d-flex justify-content-between">
                            <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
                            <Button variant="primary" type="submit" form="subjectForm">Save Changes</Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SubjectModals;
