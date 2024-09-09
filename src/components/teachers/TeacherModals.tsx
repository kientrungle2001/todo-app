import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import TeacherForm from './TeacherForm';
import { Teacher } from '@/store/teacherSlice';

interface TeacherModalsProps {
    showAddModal: boolean;
    handleCloseAddModal: () => void;
    showEditModal: boolean;
    handleCloseEditModal: () => void;
    currentTeacher: Teacher | null;
    setCurrentTeacher: React.Dispatch<React.SetStateAction<Teacher | null>>;
    addTeacher: (teacher: Teacher) => void;
    updateTeacher: (teacher: Teacher) => void;
}

const TeacherModals: React.FC<TeacherModalsProps> = ({
    showAddModal,
    handleCloseAddModal,
    showEditModal,
    handleCloseEditModal,
    currentTeacher,
    setCurrentTeacher,
    addTeacher,
    updateTeacher,
}) => {
    const handleAddTeacher = (teacher: Teacher) => {
        addTeacher(teacher);
        handleCloseAddModal();
    };

    const handleUpdateTeacher = (teacher: Teacher) => {
        if (currentTeacher) {
            updateTeacher({ ...currentTeacher, ...teacher });
            handleCloseEditModal();
        }
    };

    return (
        <>
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Teacher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TeacherForm
                        initialData={{
                            id: undefined, // Optional field, can be omitted or set as undefined
                            name: '',
                            phone: '',
                            address: '',
                            school: '',
                            salary: 0,
                            password: '',
                            subjectId: 0,
                            status: 1,
                            departmentId: 0,
                            type: '',
                            code: ''
                        }}
                        onSubmit={handleAddTeacher}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Row className="w-100">
                        <Col className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={handleCloseAddModal}>Close</Button>
                            <Button variant="primary" type="submit" form="teacherForm">Add Teacher</Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Teacher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentTeacher && <TeacherForm initialData={currentTeacher} onSubmit={handleUpdateTeacher} />}
                </Modal.Body>
                <Modal.Footer>
                    <Row className="w-100">
                        <Col className="d-flex justify-content-between">
                            <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
                            <Button variant="primary" type="submit" form="teacherForm">Save Changes</Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TeacherModals;
