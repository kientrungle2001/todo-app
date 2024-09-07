import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteCenter, fetchCenters, addCenter, updateCenter, setPagination, Center } from '../store/centerSlice';
import { Button, Container, Table, Pagination, Form } from 'react-bootstrap';
import CenterModals from '@/components/centers/CenterModals';

export default function CenterList() {
  const dispatch = useAppDispatch();
  const centers = useAppSelector(state => state.centers.items);
  const pagination = useAppSelector(state => state.centers.pagination);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCenter, setCurrentCenter] = useState<Center | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchCenters({ page: pagination.page, pageSize: pagination.pageSize, searchText }));
  }, [dispatch, pagination, searchText]);

  const handleDeleteCenter = (id: number) => {
    if (window.confirm('Are you sure you want to delete this center?')) {
      dispatch(deleteCenter(id));
    }
  };

  const handleShowEditModal = (center: Center) => {
    setCurrentCenter(center);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handlePageChange = (newPage: number) => {
    dispatch(setPagination({ page: newPage, pageSize: pagination.pageSize }));
  };

  return (
    <Container>
      <h1>Center List</h1>

      <Form.Group className="mb-3" controlId="search">
        <Form.Control
          type="text"
          placeholder="Search by Name or Code"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">Add Center</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {centers.map(center => (
            <tr key={center.id}>
              <td>{center.id}</td>
              <td>{center.name}</td>
              <td>{center.code}</td>
              <td>{center.address}</td>
              <td>{center.status}</td>
              <td>
                <Button variant="info" className="mx-2" onClick={() => handleShowEditModal(center)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteCenter(center.id ?? 0)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
        />
        <Pagination.Item active>{pagination.page}</Pagination.Item>
        <Pagination.Next onClick={() => handlePageChange(pagination.page + 1)} />
      </Pagination>

      <CenterModals
        showAddModal={showAddModal}
        handleCloseAddModal={handleCloseAddModal}
        showEditModal={showEditModal}
        handleCloseEditModal={handleCloseEditModal}
        currentCenter={currentCenter}
        setCurrentCenter={setCurrentCenter}
        addCenter={center => dispatch(addCenter(center))}
        updateCenter={center => dispatch(updateCenter(center))}
      />
    </Container>
  );
}
