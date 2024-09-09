// src/pages/SubjectList.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchSubjects, createSubject, updateSubject, deleteSubject, Subject } from '@/store/subjectSlice';
import { Container, Table, Form, Button, Accordion } from 'react-bootstrap';
import SubjectModals from '@/components/subjects/SubjectModal';

export default function SubjectList() {
    const dispatch = useAppDispatch();
    const subjects = useAppSelector((state) => state.subjects.items);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        dispatch(fetchSubjects({ searchText }));
    }, [dispatch, searchText]);

    const handleDeleteSubject = (id: number) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            dispatch(deleteSubject(id));
        }
    };

    const handleShowEditModal = (subject: Subject) => {
        let currentSubject = { ...subject };
        setCurrentSubject(currentSubject);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => setShowEditModal(false);
    const handleCloseAddModal = () => setShowAddModal(false);

    const onlines: any = {
        '0': 'Center',
        '1': 'Online',
        '-1': 'Book'
    };

    return (
        <Container>
            <h1>Subject List</h1>

            <Form.Group controlId="search" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search by Subject Name or Code"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">Add Subject</Button>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Active Classes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <tr key={'' + subject.id}>
                            <td>{subject.id}</td>
                            <td>{subject.name}</td>
                            <td>{subject.code}</td>
                            <td>{onlines['' + subject.online] ?? ''}</td>
                            <td>{subject.status === 1 ? 'Active' : 'Inactive'}</td>
                            <td>
                                <Accordion>
                                    {subject.classes && subject.classes.length > 0 ? (
                                        subject.classes.map((cls) => (
                                            cls.status === 1 && (
                                                <Accordion.Item eventKey={'' + cls.id?.toString()} key={cls.id}>
                                                    <Accordion.Header>{cls.name}</Accordion.Header>
                                                    <Accordion.Body>
                                                        {cls.startDate && <p>Start Date: {new Date(cls.startDate).toLocaleDateString()}</p>}
                                                        {cls.endDate && <p>End Date: {new Date(cls.endDate).toLocaleDateString()}</p>}
                                                        {cls.roomName && <p>Room: {cls.roomName}</p>}
                                                        {cls.teacherName && <p>Teacher: {cls.teacherName}</p>}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            )
                                        ))
                                    ) : (
                                        <p>No active classes</p>
                                    )}
                                </Accordion>
                            </td>
                            <td>
                                <Button variant="info" className="mx-2" onClick={() => handleShowEditModal(subject)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteSubject(subject.id ?? 0)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <SubjectModals
                showAddModal={showAddModal}
                handleCloseAddModal={handleCloseAddModal}
                showEditModal={showEditModal}
                handleCloseEditModal={handleCloseEditModal}
                currentSubject={currentSubject}
                setCurrentSubject={setCurrentSubject}
                addSubject={(subject: Subject) => dispatch(createSubject(subject)).then(() => {
                    dispatch(fetchSubjects({ searchText }));
                })}
                updateSubject={(subject: Subject) => {
                    dispatch(updateSubject(subject)).then(() => {
                        dispatch(fetchSubjects({ searchText }));
                    });
                }}
            />
        </Container>
    );
}
