import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteClass, fetchClasses, addClass, updateClass, setPagination, Class } from '../store/classSlice';
import { Button, Container, Table, Pagination, Form } from 'react-bootstrap';
import ClassModals from '@/components/classes/ClassModals';
import Link from 'next/link';

const ClassList: React.FC = () => {
    const dispatch = useAppDispatch();
    const classes = useAppSelector(state => state.classes.items);
    const pagination = useAppSelector(state => state.classes.pagination);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentClass, setCurrentClass] = useState<Class | null>(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        dispatch(fetchClasses({ page: pagination.page, pageSize: pagination.pageSize, searchText }));
    }, [dispatch, pagination, searchText]);

    const handleDeleteClass = (id: number) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
            dispatch(deleteClass(id));
        }
    };

    const handleShowEditModal = (classItem: Class) => {
        setCurrentClass(classItem);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => setShowEditModal(false);
    const handleCloseAddModal = () => setShowAddModal(false);

    const handlePageChange = (newPage: number) => {
        dispatch(setPagination({ page: newPage, pageSize: pagination.pageSize }));
    };

    return (
        <Container>
            <h1>Class List</h1>

            <Form.Group className="mb-3" controlId="search">
                <Form.Control
                    type="text"
                    placeholder="Search by Name or Code"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">Add Class</Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Room Name</th>
                        <th>Subject Name</th>
                        <th>Teacher Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map(classItem => (
                        <tr key={classItem.id}>
                            <td>{classItem.id}</td>
                            <td>{classItem.name}</td>
                            <td>{classItem.startDate}</td>
                            <td>{classItem.endDate}</td>
                            <td>{classItem.roomName}</td>
                            <td>{classItem.subjectName}</td>
                            <td>{classItem.teacherName}</td>
                            <td>
                                <Link href={`/classes/${classItem.id}`}>Manage Class</Link>
                                <Button variant="info" className="mx-2" onClick={() => handleShowEditModal(classItem)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteClass(classItem.id ?? 0)}>Delete</Button>
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

            <ClassModals
                showAddModal={showAddModal}
                handleCloseAddModal={handleCloseAddModal}
                showEditModal={showEditModal}
                handleCloseEditModal={handleCloseEditModal}
                currentClass={currentClass}
                setCurrentClass={setCurrentClass}
                addClass={(classItem: any) => dispatch(addClass(classItem)).then(() => {
                    dispatch(fetchClasses({ page: pagination.page, pageSize: pagination.pageSize, searchText }));
                })}
                updateClass={(classItem: any) => {
                    dispatch(updateClass(classItem)).then(() => {
                        dispatch(fetchClasses({ page: pagination.page, pageSize: pagination.pageSize, searchText }));
                    });
                }}
            />
        </Container>
    );
};

export default ClassList;
