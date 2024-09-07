import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import CenterForm from '@/components/centers/CenterForm';
import { Center } from '@/store/centerSlice';

interface CenterModalsProps {
  showAddModal: boolean;
  handleCloseAddModal: () => void;
  showEditModal: boolean;
  handleCloseEditModal: () => void;
  currentCenter: Center | null;
  setCurrentCenter: React.Dispatch<React.SetStateAction<Center | null>>;
  addCenter: (center: Center) => void;
  updateCenter: (center: Center) => void;
}

const CenterModals: React.FC<CenterModalsProps> = ({
  showAddModal,
  handleCloseAddModal,
  showEditModal,
  handleCloseEditModal,
  currentCenter,
  setCurrentCenter,
  addCenter,
  updateCenter
}) => {
  const handleAddCenter = (center: Center) => {
    addCenter(center);
    handleCloseAddModal();
  };

  const handleUpdateCenter = (center: Center) => {
    if (currentCenter) {
      updateCenter({ ...currentCenter, ...center });
      handleCloseEditModal();
    }
  };

  return (
    <>
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Center</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CenterForm
            initialData={{ name: '', code: '', address: '', status: 1 }}
            onSubmit={handleAddCenter}
          />
        </Modal.Body>
        <Modal.Footer>
          <Row className="w-100">
            <Col className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseAddModal}>Close</Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Center</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentCenter && (
            <CenterForm
              initialData={currentCenter}
              onSubmit={handleUpdateCenter}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Row className="w-100">
            <Col className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
              <Button variant="primary" type="submit" form="centerForm">Save Changes</Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CenterModals;
