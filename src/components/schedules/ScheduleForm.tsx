import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface ScheduleFormProps {
  initialData?: {
    classId: number;
    studyDate: string;
    studyTime: string;
    status: number;
  };
  onSubmit: (data: any) => void;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ initialData, onSubmit }) => {
  const [studyDate, setStudyDate] = useState(initialData?.studyDate || '');
  const [studyTime, setStudyTime] = useState(initialData?.studyTime || '');
  const [status, setStatus] = useState(initialData?.status || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ studyDate, studyTime, status });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="studyDate">
        <Form.Label>Study Date</Form.Label>
        <Form.Control
          type="date"
          value={studyDate}
          onChange={(e) => setStudyDate(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="studyTime">
        <Form.Label>Study Time</Form.Label>
        <Form.Control
          type="time"
          value={studyTime}
          onChange={(e) => setStudyTime(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
        >
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ScheduleForm;
