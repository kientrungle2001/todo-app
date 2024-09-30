import { storage } from '@/api/storage';
import { useRouter } from 'next/router';
import React from 'react';
import { NavDropdown, Dropdown } from 'react-bootstrap';

interface MenuItem {
    id: number;
    name: string;
    admin_controller: string;
    parent: number;
    __level: number;
    __children?: MenuItem[];
}

interface MenuProps {
    data: MenuItem[];
}

const TopMenu: React.FC<MenuProps> = ({ data }) => {
    // Recursive function to render submenus
    const renderSubMenu = (items: MenuItem[]) => {
        return items.map((item) => {
            if (item.__children && item.__children.length > 0) {
                return (
                    <NavDropdown
                        key={item.id}
                        title={item.name}
                        id={`nav-dropdown-${item.id}`}
                        className="dropdown-submenu"
                    >
                        {renderSubMenu(item.__children)}
                    </NavDropdown>
                );
            } else {
                return (
                    <Dropdown.Item key={item.id} href={`/Table/${item.admin_controller}`}>
                        {item.name}
                    </Dropdown.Item>
                );
            }
        });
    };

    const router = useRouter();

    return <>
        <Dropdown.Item href="/">Dashboard</Dropdown.Item>
        {renderSubMenu(data)}
        <Dropdown.Divider />
        <Dropdown.Item onClick={
            () => {
                storage.clearTokenInfo();
                router.push('/login');
            }
        }>Logout</Dropdown.Item>
    </>;
};

export default TopMenu;
