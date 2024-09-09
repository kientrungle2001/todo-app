import { Student } from '@/store/studentSlice';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

interface StudentFormProps {
  initialData: Student;
  onSubmit: (student: Student) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ initialData, onSubmit }) => {
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
    onSubmit({ name, phone, address, school, salary, password, subjectId, status, departmentId, type, code, password, departmentId, subjectId });
  };

  return (
    <Form id="studentForm" onSubmit={handleSubmit}>
      <Form.Group controlId="formStudentName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formStudentPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formStudentAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formStudentSchool">
        <Form.Label>School</Form.Label>
        <Form.Control
          type="text"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formStudentSalary">
        <Form.Label>Salary</Form.Label>
        <Form.Control
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formStudentPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formStudentSubjectId">
        <Form.Label>Subject ID</Form.Label>
        <Form.Control
          type="text"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formStudentStatus">
        <Form.Label>Status</Form.Label>
        <Form.Check
          type="switch"
          label={status === 1 ? 'Active' : 'Inactive'}
          checked={status === 1}
          onChange={() => setStatus(status === 1 ? 0 : 1)}
        />
      </Form.Group>

      <Form.Group controlId="formStudentDepartmentId">
        <Form.Label>Department</Form.Label>
        <Form.Select value={departmentId} onChange={e => setDepartmentId(e.target.value)}>
          <option value="">Select Department</option>
          {departments.map(department => (
            <option key={department.id} value={department.id}>{department.name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="formStudentType">
        <Form.Label>Type</Form.Label>
        <Form.Control
          type="text"
          value={type}
          onChange={(e) => setType(parseInt(e.target.value) ?? 0)}
        />
      </Form.Group>

      <Form.Group controlId="formStudentCode">
        <Form.Label>Code</Form.Label>
        <Form.Control
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

export default StudentForm;
