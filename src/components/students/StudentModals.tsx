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
            initialData={{ name: '', phone: '', address: '', school: '', status: 1,  code: '' }}
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
