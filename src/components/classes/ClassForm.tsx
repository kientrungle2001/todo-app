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

            <Form.Group controlId="formClassLevel">
                <Form.Label>Level</Form.Label>
                <Form.Control
                    type="number"
                    value={level}
                    onChange={(e) => setLevel(parseInt(e.target.value))}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formClassAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formClassAmountBy">
                <Form.Label>Amount By</Form.Label>
                <Form.Control
                    type="text"
                    value={amountBy}
                    onChange={(e) => setAmountBy(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formClassStatus">
                <Form.Label>Status</Form.Label>
                <Form.Check
                    type="switch"
                    label={status === 1 ? 'Active' : 'Inactive'}
                    checked={status === 1}
                    onChange={() => setStatus(status === 1 ? 0 : 1)}
                />
            </Form.Group>

            <Form.Group controlId="formClassTeacher2Id">
                <Form.Label>Secondary Teacher</Form.Label>
                <Form.Select value={teacher2Id} onChange={e => setTeacher2Id(Number(e.target.value))}>
                    <option value={0}>Select Teacher</option>
                    {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="formClassOnline">
                <Form.Label>Online</Form.Label>
                <Form.Check
                    type="switch"
                    label={online === 1 ? 'Yes' : 'No'}
                    checked={online === 1}
                    onChange={() => setOnline(online === 1 ? 0 : 1)}
                />
            </Form.Group>

            <Form.Group controlId="formClassClassed">
                <Form.Label>Classed</Form.Label>
                <Form.Check
                    type="switch"
                    label={classed === 1 ? 'Yes' : 'No'}
                    checked={classed === 1}
                    onChange={() => setClassed(classed === 1 ? 0 : 1)}
                />
            </Form.Group>

            <Form.Group controlId="formClassCode">
                <Form.Label>Code</Form.Label>
                <Form.Control
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formClassFeeType">
                <Form.Label>Fee Type</Form.Label>
                <Form.Control
                    type="number"
                    value={feeType}
                    onChange={(e) => setFeeType(parseInt(e.target.value))}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formClassScheduleDays">
                <Form.Label>Schedule Days</Form.Label>
                <Form.Control
                    type="text"
                    value={scheduleDays}
                    onChange={(e) => setScheduleDays(e.target.value)}
                    required
                />
            </Form.Group>
        </Form>
    );
};

export default ClassForm;
