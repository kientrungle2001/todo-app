import React, { useEffect } from "react";
import TopMenu from "./TopMenu";
import axios from '@/api/axiosInstance';
import { buildTree } from "@/api/tree";
import { Nav, Navbar } from "react-bootstrap";

interface TopMenuGridProps {

}

export const TopMenuGrid: React.FC<TopMenuGridProps> = ({ }): React.ReactElement => {
    const [data, setData] = React.useState<any[]>([]);

    useEffect(() => {
        axios.post('/tables/admin_menu/map', {
            fields: ["id", "name", "parent", "admin_controller", "ordering", "status", "shortcut"],
            condition: "status = 1",
            orderBy: "ordering asc"
        }).then((resp) => {
            let items = resp.data;
            items = buildTree(items, 'parent');
            setData(items);
        });
    }, []);

    return <>
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <TopMenu data={data} />
            </Navbar.Collapse>
        </Navbar>
    </>
}