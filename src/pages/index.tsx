// pages/index.tsx - dashboard
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { TopMenuGrid } from '@/components/grid/TopMenuGrid';
import { menuRepository } from '@/api/repositories/Menu';
import DashboardItems from '@/components/dashboard/DashboardItems';

const Index = () => {
    const [items, setItems] = useState<any[]>([]);

    const router = useRouter();
    useEffect(() => {
        menuRepository.getMenu(router).then((response: any) => {
            setItems(response.data.items);
        });
    }, []);

    return <>
        <Container fluid className="mt-3 mb-3">
            <TopMenuGrid />
        </Container>
        <Container className="mt-5">
            <DashboardItems items={items} />
        </Container>
    </>
};

export default Index;
