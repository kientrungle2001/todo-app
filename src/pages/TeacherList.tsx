import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTeachers, addTeacher, editTeacher, deleteTeacher, Teacher } from '@/store/teacherSlice';
import { Container, Table, Form, Button } from 'react-bootstrap';
import TeacherModals from '@/components/teachers/TeacherModals';

export default function TeacherList() {
    const dispatch = useAppDispatch();
    const teachers = useAppSelector((state) => state.teachers.items);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentTeacher, setCurrentTeacher] = useState<Teacher | null>(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        dispatch(fetchTeachers({ searchText }));
    }, [dispatch, searchText]);

    const handleDeleteTeacher = (id: number) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            dispatch(deleteTeacher(id));
        }
    };

    const handleShowEditModal = (teacher: Teacher) => {
        setCurrentTeacher({ ...teacher });
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => setShowEditModal(false);
    const handleCloseAddModal = () => setShowAddModal(false);

    return (
        <Container>
            <h1>Teacher List</h1>

            <Form.Group controlId="search" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search by Name, Phone or Code"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">Add Teacher</Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>School</th>
                        <th>Salary</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher.id}>
                            <td>{teacher.id}</td>
                            <td>{teacher.name}</td>
                            <td>{teacher.phone}</td>
                            <td>{teacher.school}</td>
                            <td>{teacher.salary}</td>
                            <td>{teacher.status === 1 ? 'Active' : 'Inactive'}</td>
                            <td>
                                <Button variant="info" className="mx-2" onClick={() => handleShowEditModal(teacher)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteTeacher(teacher.id ?? 0)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <TeacherModals
                showAddModal={showAddModal}
                handleCloseAddModal={handleCloseAddModal}
                showEditModal={showEditModal}
                handleCloseEditModal={handleCloseEditModal}
                currentTeacher={currentTeacher}
                setCurrentTeacher={setCurrentTeacher}
                addTeacher={(teacher: Teacher) => dispatch(addTeacher(teacher))}
                updateTeacher={(teacher: Teacher) => dispatch(editTeacher(teacher))}
            />
        </Container>
    );
}
