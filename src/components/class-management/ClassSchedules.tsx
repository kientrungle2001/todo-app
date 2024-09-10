import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import ScheduleModals from '@/components/schedules/ScheduleModals';
import { Schedule, fetchSchedules } from '@/store/scheduleSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';


const ClassSchedules: React.FC<{classId: string | string[]}> = ({ classId }) => {
  const schedules = useAppSelector(state => state.schedules.schedules);
  const [showModal, setShowModal] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState<Schedule | null>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSchedules(classId));
  }, [dispatch]);

  const handleAddSchedule = () => {
    setCurrentSchedule(null);
    setShowModal(true);
  };

  const handleEditSchedule = (schedule: Schedule) => {
    setCurrentSchedule(schedule);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSaveSchedule = () => {
    // Add logic to save schedule
    setShowModal(false);
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Class Schedules</h1>
        </Col>
        <Col className="text-right">
          <Button variant="primary" onClick={handleAddSchedule}>Add Schedule</Button>
        </Col>
      </Row>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Class ID</th>
            <th>Study Date</th>
            <th>Study Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={schedule.id}>
              <td>{index + 1}</td>
              <td>{schedule.classId}</td>
              <td>{new Date(schedule.studyDate).toLocaleDateString()}</td>
              <td>{schedule.studyTime}</td>
              <td>{schedule.status === 1 ? 'Active' : 'Inactive'}</td>
              <td>
                <Button variant="info" onClick={() => handleEditSchedule(schedule)} size="sm" className="mr-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for adding/editing schedule */}
      <ScheduleModals
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveSchedule}
        scheduleData={currentSchedule}
      />
    </Container>
  );
};

export default ClassSchedules;
