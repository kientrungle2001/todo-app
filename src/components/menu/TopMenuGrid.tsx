import React, { useEffect } from "react";
import TopMenu from "./TopMenu";
import axios, { getAxios } from '@/api/axiosInstance';
import { buildTree } from "@/api/tree";
import { Nav, Navbar } from "react-bootstrap";
import { storage } from "@/api/storage";
import { useRouter } from "next/router";

interface TopMenuGridProps {

}

export const TopMenuGrid: React.FC<TopMenuGridProps> = ({ }): React.ReactElement => {
    const [data, setData] = React.useState<any[]>([]);

    const router = useRouter();
    useEffect(() => {
        getAxios(window.location.hostname).post('/tables/admin_menu/map', {
            fields: ["id", "name", "parent", "admin_controller", "ordering", "status", "shortcut"],
            condition: "status = 1",
            orderBy: "ordering asc"
        }, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).then((resp: any) => {
            let items = resp.data;
            items = buildTree(items, 'parent');
            setData(items);
        }).catch((error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                window.location.href = ('/login');
            }
        });
    }, []);

    return <>
        <Navbar bg="light" expand="lg" className="mb-3">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <TopMenu data={data} />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
}
