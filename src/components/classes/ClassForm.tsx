import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Class } from '@/store/classSlice';
import { Subject } from '@/store/subjectSlice';
import { Room } from '@/store/roomSlice';
import { Teacher } from '@/store/teacherSlice';

interface ClassFormProps {
  initialData: Class;
  onSubmit: (classItem: Class) => void;
  subjects: Subject[];
  rooms: Room[];
  teachers: Teacher[];
}

const ClassForm: React.FC<ClassFormProps> = ({ initialData, subjects, rooms, teachers, onSubmit }) => {
  const [name, setName] = useState(initialData.name);
  const [startDate, setStartDate] = useState(initialData.startDate);
  const [endDate, setEndDate] = useState(initialData.endDate);
  const [roomId, setRoomId] = useState(initialData.roomId);
  const [roomName, setRoomName] = useState(initialData.roomName);
  const [subjectId, setSubjectId] = useState(initialData.subjectId);
  const [subjectName, setSubjectName] = useState(initialData.subjectName);
  const [teacherId, setTeacherId] = useState(initialData.teacherId);
  const [teacherName, setTeacherName] = useState(initialData.teacherName);
  const [level, setLevel] = useState(initialData.level);
  const [amount, setAmount] = useState(initialData.amount);
  const [amountBy, setAmountBy] = useState(initialData.amountBy);
  const [status, setStatus] = useState(initialData.status);
  const [teacher2Id, setTeacher2Id] = useState(initialData.teacher2Id);
  const [teacher2Name, setTeacher2Name] = useState(initialData.teacher2Name);
  const [online, setOnline] = useState(initialData.online);
  const [classed, setClassed] = useState(initialData.classed);
  const [code, setCode] = useState(initialData.code);
  const [feeType, setFeeType] = useState(initialData.feeType);
  const [scheduleDays, setScheduleDays] = useState(initialData.scheduleDays);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name, startDate, endDate, roomId, roomName, subjectId, subjectName, teacherId, teacherName,
      level, amount, amountBy, status, teacher2Id, teacher2Name, online, classed, code, feeType, scheduleDays
    });
  };

  return (
    <Form id="classForm" onSubmit={handleSubmit}>
      <Form.Group controlId="formClassName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formClassStartDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formClassEndDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formClassRoomId">
        <Form.Label>Room</Form.Label>
        <Form.Select value={roomId} onChange={e => setRoomId(Number(e.target.value))}>
          <option value={0}>Select Room</option>
          {rooms.map(room => (
            <option key={room.id} value={room.id}>{room.name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="formClassSubjectId">
        <Form.Label>Subject</Form.Label>
        <Form.Select value={subjectId} onChange={e => setSubjectId(Number(e.target.value))}>
          <option value={0}>Select Subject</option>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>{subject.name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="formClassTeacherId">
        <Form.Label>Teacher</Form.Label>
        <Form.Select value={teacherId} onChange={e => setTeacherId(Number(e.target.value))}>
          <option value={0}>Select Teacher</option>
          {teachers.map(teacher => (
            <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Add remaining fields here similarly */}
    </Form>
  );
};

export default ClassForm;
