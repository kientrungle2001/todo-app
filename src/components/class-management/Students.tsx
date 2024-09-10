import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteStudent, fetchStudents, addStudent, updateStudent, setPagination, Student } from '../../store/studentSlice';
import { Button, Container, Table, Pagination, Form, Spinner, Modal } from 'react-bootstrap';
import StudentModals from '@/components/students/StudentModals';

interface StudentsProps {
  classId: string | string[];
}

const Students: React.FC<StudentsProps> = ({ classId }) => {
  const dispatch = useAppDispatch();
  const students = useAppSelector(state => state.students.items);
  const pagination = useAppSelector(state => state.students.pagination);
  const loading = useAppSelector(state => state.students.loading);
  const error = useAppSelector(state => state.students.error);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchStudents({ page: pagination.page, pageSize: pagination.pageSize, searchText, classId: Number(classId) }));
  }, [dispatch, pagination, searchText, classId]);

  const handleDeleteStudent = (id: number) => {
    setCurrentStudent(students.find(student => student.id === id) || null);
    setShowConfirmModal(true);
  };

  const confirmDeleteStudent = () => {
    if (currentStudent?.id) {
      dispatch(deleteStudent(currentStudent.id)).then(() => {
        dispatch(fetchStudents({ page: pagination.page, pageSize: pagination.pageSize, searchText, classId: Number(classId) }));
      });
    }
    setShowConfirmModal(false);
  };

  const handleShowEditModal = (student: Student) => {
    setCurrentStudent(student);
    setShowEditModal(true);
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPagination({ page: newPage, pageSize: pagination.pageSize }));
  };

  return (
    <Container>
      <h1>Students Management</h1>

      {loading && <Spinner animation="border" />}
      {error && <p className="text-danger">Error: {error}</p>}

      <Form.Group className="mb-3" controlId="search">
        <Form.Control
          type="text"
          placeholder="Search by Name or Code"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">Add Student</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>School</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.phone}</td>
              <td>{student.school}</td>
              <td>{student.address}</td>
              <td>
                <Button variant="info" className="mx-2" onClick={() => handleShowEditModal(student)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteStudent(student.id ?? 0)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
        />
        <Pagination.Item active>{pagination.page}</Pagination.Item>
        <Pagination.Next onClick={() => handlePageChange(pagination.page + 1)} />
      </Pagination>

      <StudentModals
        showAddModal={showAddModal}
        handleCloseAddModal={() => setShowAddModal(false)}
        showEditModal={showEditModal}
        handleCloseEditModal={() => setShowEditModal(false)}
        currentStudent={currentStudent}
        setCurrentStudent={setCurrentStudent}
        addStudent={(student: Student) => dispatch(addStudent(student)).then(() => {
          dispatch(fetchStudents({ page: pagination.page, pageSize: pagination.pageSize, searchText, classId: Number(classId) }));
        })}
        updateStudent={(student: Student) => {
          dispatch(updateStudent(student)).then(() => {
            dispatch(fetchStudents({ page: pagination.page, pageSize: pagination.pageSize, searchText, classId: Number(classId) }));
          });
        }}
      />

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {currentStudent?.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDeleteStudent}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Students;
