import { Subject } from '@/store/subjectSlice';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface SubjectFormProps {
  initialData: {
    name: string;
    status: number;
    code: string;
  };
  onSubmit: (subject: Subject) => void;
}

const SubjectForm: React.FC<SubjectFormProps> = ({ initialData, onSubmit }) => {
  const [name, setName] = useState(initialData.name);
  const [status, setStatus] = useState(initialData.status);
  const [code, setCode] = useState(initialData.code);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, status, code });
  };

  return (
    <Form id="subjectForm" onSubmit={handleSubmit}>
      <Form.Group controlId="formSubjectName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formSubjectCode">
        <Form.Label>Code</Form.Label>
        <Form.Control
          type="text"
          name="code"
          value={code || ''}
          onChange={(e) => setCode(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formSubjectStatus">
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

export default SubjectForm;
