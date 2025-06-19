import { useRouter } from 'next/router';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

const MainMenu = () => {
    const router = useRouter();
    // Function to handle navigation
    const handleNavigation = (path: string) => {
        window.location.href = (path);
    };

    return (
        <Navbar bg="light" expand="lg" className="mb-4">
            <Navbar.Brand href="#">Admin Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link onClick={() => handleNavigation('/TeacherList')}>Manage Teachers</Nav.Link>
                    <Nav.Link onClick={() => handleNavigation('/SubjectList')}>Manage Subjects</Nav.Link>
                    <Nav.Link onClick={() => handleNavigation('/ClassList')}>Manage Classes</Nav.Link>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Center Management
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleNavigation('/CenterList')}>Center List</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleNavigation('/RoomList')}>Room List</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MainMenu;
