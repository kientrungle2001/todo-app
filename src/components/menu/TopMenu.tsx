import { storage } from '@/api/storage';
import { useRouter } from 'next/router';
import React from 'react';
import { NavDropdown } from 'react-bootstrap';

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
                    <NavDropdown.Item className="mt-2 me-2" key={item.id} href={`/Table/${item.admin_controller}`}>
                        [ {item.name} ]
                    </NavDropdown.Item>
                );
            }
        });
    };

    const router = useRouter();

    return <>
        <NavDropdown.Item className="mt-2 me-2" href="/">Dashboard</NavDropdown.Item>
        {renderSubMenu(data)}
        <NavDropdown.Divider />
        <NavDropdown.Item className="mt-2 me-2" onClick={
            () => {
                storage.clearTokenInfo();
                router.push('/login');
            }
        }>Logout</NavDropdown.Item>
    </>;
};

export default TopMenu;
