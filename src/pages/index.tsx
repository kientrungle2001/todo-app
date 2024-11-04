// pages/login.tsx
import { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from '@/api/axiosInstance';
import { useRouter } from 'next/router';
import { storage } from '@/api/storage';
import { FullLookAdminMenuSettings } from '@/api/settings/FullLookMenuSettings';
import { DataGridPagination, DataGridSort, DataGridSortDirection } from '@/components/grid/DataGrid';
import Link from 'next/link';
import { TopMenuGrid } from '@/components/grid/TopMenuGrid';

const Index = () => {
    const settings = FullLookAdminMenuSettings;
    const [items, setItems] = useState<any[]>([]);
    const sorts: DataGridSort[] = [
        { index: 'ordering', direction: DataGridSortDirection.ASCENDING },
    ];
    const pagination: DataGridPagination = {
        currentPage: 1,
        pageSize: 100
    };
    const router = useRouter();
    useEffect(() => {
        axios.post('/tables/search/admin_menu', {
            settings: JSON.parse(JSON.stringify(settings)),
            search: '',
            filterData: {
                status: 1,
                shortcut: 1
            },
            sorts: JSON.parse(JSON.stringify(sorts)),
            page: pagination.currentPage,
            pageSize: pagination.pageSize,
        }, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).then(response => {
            setItems(response.data.items);
        }).catch((error) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                router.push('/login');
            }
        });
    }, []);

    return (
        <>
            <Container fluid className="mt-3 mb-3">
                <TopMenuGrid />
            </Container>
            <Container className="mt-5">

                <Row>
                    {
                        items.map(item => (
                            <Col sm={12} md="3" xl="2" key={item.id}>
                                <Card>
                                    <Card.Body>
                                        <Link href={"/Table/" + item.admin_controller}>
                                            <Card.Img variant="top" src={'https://stg.media.nextnobels.com' + item.thumbnail} />
                                        </Link>
                                    </Card.Body>
                                    <Card.Footer>
                                        <div className="d-grid">
                                            <Button variant="primary" href={"/Table/" + item.admin_controller}>
                                                {item.name}
                                            </Button>
                                        </div>

                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))
                    }

                </Row>
            </Container>
        </>
    );
};

export default Index;
