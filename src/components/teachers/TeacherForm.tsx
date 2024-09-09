import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

interface TeacherFormProps {
    initialData: {
        id?: number;
        name: string;
        phone: string;
        address: string;
        school: string;
        salary: number;
        password: string;
        subjectId: number;
        status: number;
        departmentId: number;
        type: string;
        code: string;
    };
    onSubmit: (teacher: TeacherFormProps['initialData']) => void;
}

const TeacherForm: React.FC<TeacherFormProps> = ({ initialData, onSubmit }) => {
    const [name, setName] = useState(initialData.name);
    const [phone, setPhone] = useState(initialData.phone);
    const [address, setAddress] = useState(initialData.address);
    const [school, setSchool] = useState(initialData.school);
    const [salary, setSalary] = useState(initialData.salary);
    const [password, setPassword] = useState(initialData.password);
    const [subjectId, setSubjectId] = useState(initialData.subjectId);
    const [status, setStatus] = useState(initialData.status);
    const [departmentId, setDepartmentId] = useState(initialData.departmentId);
    const [type, setType] = useState(initialData.type);
    const [code, setCode] = useState(initialData.code);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ id: initialData.id, name, phone, address, school, salary, password, subjectId, status, departmentId, type, code });
    };

    return (
        <Form id="teacherForm" onSubmit={handleSubmit}>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="formTeacherName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formTeacherPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group controlId="formTeacherAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formTeacherSchool">
                        <Form.Label>School</Form.Label>
                        <Form.Control
                            type="text"
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group controlId="formTeacherSalary">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control
                            type="number"
                            value={salary}
                            onChange={(e) => setSalary(Number(e.target.value))}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formTeacherPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group controlId="formTeacherSubject">
                        <Form.Label>Subject ID</Form.Label>
                        <Form.Control
                            type="number"
                            value={subjectId}
                            onChange={(e) => setSubjectId(Number(e.target.value))}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formTeacherDepartment">
                        <Form.Label>Department ID</Form.Label>
                        <Form.Control
                            type="number"
                            value={departmentId}
                            onChange={(e) => setDepartmentId(Number(e.target.value))}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group controlId="formTeacherType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formTeacherCode">
                        <Form.Label>Code</Form.Label>
                        <Form.Control
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group controlId="formTeacherStatus">
                <Form.Label>Status</Form.Label>
                <Form.Check
                    type="switch"
                    label={status === 1 ? 'Active' : 'Inactive'}
                    checked={status === 1}
                    onChange={() => setStatus(status === 1 ? 0 : 1)}
                />
            </Form.Group>
        </Form>
    );
};

export default TeacherForm;
