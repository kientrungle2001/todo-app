import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { Student } from '@/store/studentSlice';
import DatePicker, { registerLocale } from 'react-datepicker';
import { vi } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from 'date-fns';

registerLocale("vi", vi);

interface StudentFormProps {
    initialData: Student;
    onSubmit: (student: Student) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ initialData, onSubmit }) => {
    const [studentData, setStudentData] = useState<Student>(initialData);

    // Parse date string from dd/mm/yyyy to Date object
    const parseDate = (dateString: string): Date | null => {
        if (dateString === '0000-00-00') {
            return null;
        }
        console.log('parseDate', dateString);
        console.log(new Date(dateString));
        try {
            return new Date(dateString);
        } catch {
            return null;
        }
    };

    // Format Date object to dd/mm/yyyy
    const formatDate = (date: Date | null): string => {
        if (date === null) {
            return '';
        }
        return format(date, 'yyyy-MM-dd');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setStudentData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(studentData);
    };

    return (
        <Form onSubmit={handleSubmit} id="studentForm">
            <Row>
                <Col>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={studentData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={studentData.phone}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="school">
                        <Form.Label>School</Form.Label>
                        <Form.Control
                            type="text"
                            name="school"
                            value={studentData.school}
                            onChange={handleChange}

                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="birthYear">
                        <Form.Label>Birth Year</Form.Label>
                        <Form.Control
                            type="number"
                            name="birthYear"
                            value={studentData.birthYear}
                            onChange={handleChange}

                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="schoolYear">
                        <Form.Label>School Year</Form.Label>
                        <Form.Control
                            type="number"
                            name="schoolYear"
                            value={studentData.schoolYear}
                            onChange={handleChange}

                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="birthDate">
                        <Form.Label>Birth Date</Form.Label>
                        <DatePicker className="form-control"
                            locale="vi"
                            selected={studentData.birthDate ? parseDate(studentData.birthDate) : null}
                            onChange={(date: Date | null) => {
                                setStudentData({ ...studentData, birthDate: date ? formatDate(date) : '' });
                            }}
                            dateFormat="dd/MMMM/yyyy"
                            placeholderText="Select date"
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={studentData.address}
                            onChange={handleChange}

                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="parentName">
                        <Form.Label>Parent Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="parentName"
                            value={studentData.parentName}
                            onChange={handleChange}

                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="startStudyDate">
                        <Form.Label>Start Study Date</Form.Label>
                        <DatePicker className="form-control"
                            locale="vi"
                            selected={studentData.startStudyDate ? parseDate(studentData.startStudyDate) : null}
                            onChange={(date: Date | null) => {
                                setStudentData({ ...studentData, startStudyDate: date ? formatDate(date) : '' });
                            }}
                            dateFormat="dd/MMMM/yyyy"
                            placeholderText="Select start date"
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="endStudyDate">
                        <Form.Label>End Study Date</Form.Label>
                        <DatePicker className="form-control"
                            locale="vi"
                            selected={studentData.endStudyDate ? parseDate(studentData.endStudyDate) : null}
                            onChange={(date: Date | null) => {
                                setStudentData({ ...studentData, endStudyDate: date ? formatDate(date) : '' });
                            }}
                            dateFormat="dd/MMMM/yyyy"
                            placeholderText="Select start date"
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="paid">
                        <Form.Label>Paid</Form.Label>
                        <Form.Control
                            type="number"
                            name="paid"
                            value={studentData.paid}
                            onChange={handleChange}

                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={studentData.status}
                            onChange={handleChange}

                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId="extraFields">
                        <Form.Label>Extra Fields</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="extraFields"
                            value={studentData.extraFields}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
};

export default StudentForm;
