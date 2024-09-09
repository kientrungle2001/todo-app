// components/class-management/Students.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteStudent, fetchStudents, addStudent, updateStudent, setPagination, Student } from '../../store/studentSlice';
import { Button, Container, Table, Pagination, Form } from 'react-bootstrap';
import StudentModals from '@/components/students/StudentModals';

interface StudentsProps {
  classId: string | string[];
}

const Students: React.FC<StudentsProps> = ({ classId }) => {
  const dispatch = useAppDispatch();
  const students = useAppSelector(state => state.students.items);
  const pagination = useAppSelector(state => state.students.pagination);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchStudents({ page: pagination.page, pageSize: pagination.pageSize, searchText, classId: Number(classId) }));
  }, [dispatch, pagination, searchText, classId]);

  const handleDeleteStudent = (id: number) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  const handleShowEditModal = (student: Student) => {
    setCurrentStudent(student);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handlePageChange = (newPage: number) => {
    dispatch(setPagination({ page: newPage, pageSize: pagination.pageSize }));
  };

  return (
    <Container>
      <h1>Students Management</h1>

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
            <th>Current Class Names</th>
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
              <td>{student.currentClassNames}</td>
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
        handleCloseAddModal={handleCloseAddModal}
        showEditModal={showEditModal}
        handleCloseEditModal={handleCloseEditModal}
        currentStudent={currentStudent}
        setCurrentStudent={setCurrentStudent}
        addStudent={student => dispatch(addStudent(student)).then(() => {
          dispatch(fetchStudents({ page: pagination.page, pageSize: pagination.pageSize, searchText, classId: Number(classId) }));
        })}
        updateStudent={student => {
          dispatch(updateStudent(student)).then(() => {
            dispatch(fetchStudents({ page: pagination.page, pageSize: pagination.pageSize, searchText, classId: Number(classId) }));
          });
        }}
      />
    </Container>
  );
};

export default Students;
