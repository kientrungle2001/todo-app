// src/components/schedule/ScheduleModals.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ScheduleForm from './ScheduleForm';

interface ScheduleModalsProps {
  show: boolean;
  handleClose: () => void;
  handleSave: () => void;
  scheduleData?: any; // Add appropriate type based on your data structure
}

const ScheduleModals: React.FC<ScheduleModalsProps> = ({ show, handleClose, handleSave, scheduleData }) => {
  const [schedule, setSchedule] = useState({
    classId: '',
    studyDate: '',
    studyTime: '',
    status: 1,
  });

  useEffect(() => {
    if (scheduleData) {
      setSchedule(scheduleData); // Prepopulate the form for editing
    } else {
      setSchedule({ classId: '', studyDate: '', studyTime: '', status: 1 }); // Reset for new schedule
    }
  }, [scheduleData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{scheduleData ? 'Edit Schedule' : 'Add Schedule'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ScheduleForm initialData={scheduleData} onSubmit={handleInputChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScheduleModals;
