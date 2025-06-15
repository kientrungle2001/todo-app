// pages/index.tsx - dashboard
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { menuRepository } from '@/api/repositories/Menu';
import DashboardItems from '@/components/dashboard/DashboardItems';
import RibbonMenuGrid from '@/components/menu/RibbonMenuGrid';

const Index = () => {
    const [items, setItems] = useState<any[]>([]);

    const router = useRouter();
    useEffect(() => {
        menuRepository.getMenu(router).then((response: any) => {
            setItems(response && response.data ? response.data.items : []);
        });
    }, []);

    return <>
        <Container fluid>
            {/* <TopMenuGrid /> */}
            <RibbonMenuGrid />
        </Container>
        <Container className="mt-5">
            <DashboardItems items={items} />
        </Container>
    </>
};

export default Index;
