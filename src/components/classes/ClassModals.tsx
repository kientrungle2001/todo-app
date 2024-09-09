import React, { useEffect, useState } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import ClassForm from '@/components/classes/ClassForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTeachers } from '@/store/teacherSlice';
import { fetchRooms } from '@/store/roomSlice';
import { fetchSubjects } from '@/store/subjectSlice';

import { Class } from '@/store/classSlice';

interface ClassModalsProps {
  showAddModal: boolean;
  handleCloseAddModal: () => void;
  showEditModal: boolean;
  handleCloseEditModal: () => void;
  currentClass: Class | null;
  setCurrentClass: React.Dispatch<React.SetStateAction<Class | null>>;
  addClass: (classItem: Class) => void;
  updateClass: (classItem: Class) => void;
}

const ClassModals: React.FC<ClassModalsProps> = ({
  showAddModal,
  handleCloseAddModal,
  showEditModal,
  handleCloseEditModal,
  currentClass,
  setCurrentClass,
  addClass,
  updateClass
}) => {
  const dispatch = useAppDispatch();
  const subjects = useAppSelector(state => state.subjects.items);
  const rooms = useAppSelector(state => state.rooms.items);
  const teachers = useAppSelector(state => state.teachers.items);

  useEffect(() => {
    dispatch(fetchSubjects({searchText:""}));
    dispatch(fetchRooms({searchText: "", page: 1, pageSize: 1000 }));
    dispatch(fetchTeachers({searchText: ""}));
  }, [dispatch]);

  const handleAddClass = (classItem: Class) => {
    addClass(classItem);
    handleCloseAddModal();
  };

  const handleUpdateClass = (classItem: Class) => {
    if (currentClass) {
      updateClass({ ...currentClass, ...classItem });
      handleCloseEditModal();
    }
  };

  return (
    <>
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClassForm
            subjects={subjects}
            rooms={rooms}
            teachers={teachers}
            initialData={{ name: '', startDate: '', endDate: '', roomId: 0, roomName: '', subjectId: 0, subjectName: '', teacherId: 0, teacherName: '', level: 0, amount: 0, amountBy: '', status: 1, teacher2Id: 0, teacher2Name: '', online: 0, classed: 1, code: '', feeType: 0, scheduleDays: '' }}
            onSubmit={handleAddClass}
          />
        </Modal.Body>
        <Modal.Footer>
          <Row className="w-100">
            <Col className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseAddModal}>Close</Button>
              <Button variant="primary" type="submit" form="classForm">Add Class</Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentClass && (
            <ClassForm
              subjects={subjects}
              rooms={rooms}
              teachers={teachers}
              initialData={currentClass}
              onSubmit={handleUpdateClass}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Row className="w-100">
            <Col className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
              <Button variant="primary" type="submit" form="classForm">Save Changes</Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClassModals;
