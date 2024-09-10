// src/components/students/StudentModals.tsx 
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import StudentForm from '@/components/students/StudentForm';
import { Student } from '@/store/studentSlice';

interface StudentModalsProps {
    showAddModal: boolean;
    handleCloseAddModal: () => void;
    showEditModal: boolean;
    handleCloseEditModal: () => void;
    currentStudent: Student | null;
    setCurrentStudent: React.Dispatch<React.SetStateAction<Student | null>>;
    addStudent: (student: Student) => void;
    updateStudent: (student: Student) => void;
}

const StudentModals: React.FC<StudentModalsProps> = ({
    showAddModal,
    handleCloseAddModal,
    showEditModal,
    handleCloseEditModal,
    currentStudent,
    setCurrentStudent,
    addStudent,
    updateStudent
}) => {
    const dispatch = useAppDispatch();

    const handleAddStudent = (student: Student) => {
        addStudent(student);
        handleCloseAddModal();
    };

    const handleUpdateStudent = (student: Student) => {
        if (currentStudent) {
            updateStudent({ ...currentStudent, ...student });
            handleCloseEditModal();
        }
    };

    return (
        <>
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StudentForm
                        initialData={{
                            name: '',
                            phone: '',
                            school: '',
                            extraFields: '',
                            birthYear: 0,
                            schoolYear: 0,
                            classes: '',
                            address: '',
                            birthDate: '',
                            parentName: '',
                            paid: 0,
                            startStudyDate: '',
                            endStudyDate: '',
                            currentClassNames: '',
                            periodNames: '',
                            periodIds: '',
                            note: '',
                            online: 0,
                            classed: 0,
                            type: 0,
                            status: 1,
                            rating: 0,
                            assignId: 0,
                            assignName: '',
                            color: '',
                            fontStyle: '',
                            currentClassIds: '',
                            subjectIds: '',
                            subjectNames: '',
                            teacherIds: '',
                            code: '',
                            adviceStatus: 0,
                            adviceNote: '',
                            grade: 0,
                            email: '',
                            zalo: '',
                            facebook: ''
                        }}
                        onSubmit={handleAddStudent}
                    />


                </Modal.Body>
                <Modal.Footer>
                    <Row className="w-100">
                        <Col className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={handleCloseAddModal}>Close</Button>
                            <Button variant="primary" type="submit" form="studentForm">Add Student</Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentStudent && (
                        <StudentForm
                            initialData={currentStudent}
                            onSubmit={handleUpdateStudent}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Row className="w-100">
                        <Col className="d-flex justify-content-between">
                            <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
                            <Button variant="primary" type="submit" form="studentForm">Save Changes</Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default StudentModals;
