// pages/login.tsx
import { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { storage } from '@/api/storage';
import Link from 'next/link';
import { TopMenuGrid } from '@/components/grid/TopMenuGrid';
import { replaceMediaUrl } from '@/api/defaultSettings';
import { menuRepository } from '@/api/repositories/Menu';

const Index = () => {
    const [items, setItems] = useState<any[]>([]);

    const router = useRouter();
    useEffect(() => {
        menuRepository.getMenu().then((response: any) => {
            setItems(response.data.items);
        }).catch((error: any) => {
            if (error.response && error.response.status === 401
                && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                router.push('/login');
            }
        });
    }, []);

    return <>
        <Container fluid className="mt-3 mb-3">
            <TopMenuGrid />
        </Container>
        <Container className="mt-5">
            <Row>
                {items.map(item => <Col sm={12} md="3" xl="2" key={item.id}>
                    <Card>
                        <Card.Body>
                            <Link href={"/Table/" + item.admin_controller}>
                                <Card.Img variant="top" src={replaceMediaUrl(item.thumbnail)} />
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
                </Col>)}
            </Row>
        </Container>
    </>
};

export default Index;
