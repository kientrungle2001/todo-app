import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteRoom, fetchRooms, addRoom, updateRoom, setPagination, Room } from '../store/roomSlice';
import { Button, Container, Table, Pagination, Form } from 'react-bootstrap';
import RoomModals from '@/components/rooms/RoomModals';

export default function RoomList() {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector(state => state.rooms.items);
  const pagination = useAppSelector(state => state.rooms.pagination);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchRooms({ page: pagination.page, pageSize: pagination.pageSize, searchText }));
  }, [dispatch, pagination, searchText]);

  const handleDeleteRoom = (id: number) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      dispatch(deleteRoom(id));
    }
  };

  const handleShowEditModal = (room: Room) => {
    let currentRoom = { ...room };
    setCurrentRoom(currentRoom);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handlePageChange = (newPage: number) => {
    dispatch(setPagination({ page: newPage, pageSize: pagination.pageSize }));
  };

  return (
    <Container>
      <h1>Room List</h1>

      <Form.Group className="mb-3" controlId="search">
        <Form.Control
          type="text"
          placeholder="Search by Name or Status"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">Add Room</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Center</th>
            <th>Size</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.name}</td>
              <td>{room.status === 1 ? 'Active' : 'Inactive'}</td>
              <td>{room.centerName}</td> {/* Display center name */}
              <td>{room.size}</td>
              <td>{room.note}</td>
              <td>
                <Button variant="info" className="mx-2" onClick={() => handleShowEditModal(room)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteRoom(room.id ?? 0)}>Delete</Button>
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

      <RoomModals
        showAddModal={showAddModal}
        handleCloseAddModal={handleCloseAddModal}
        showEditModal={showEditModal}
        handleCloseEditModal={handleCloseEditModal}
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
        addRoom={room => dispatch(addRoom(room))}
        updateRoom={room => {
          dispatch(updateRoom(room)).then(() => {
            dispatch(fetchRooms({ page: pagination.page, pageSize: pagination.pageSize, searchText }));
          });
        }}
      />
    </Container>
  );
}
