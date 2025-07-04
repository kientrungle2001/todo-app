'use client';
import React from 'react';
import { Tabs, Tab, Button, Row, Col, Card, Container, Dropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getAxios } from '@/api/axiosInstance';
import { storage } from '@/api/storage';

interface MenuItem {
  id: number;
  name: string;
  admin_controller: string;
  parent: number;
  __level: number;
  __children?: MenuItem[];
}

interface RibbonMenuProps {
  data: MenuItem[];
}

const RibbonMenu: React.FC<RibbonMenuProps> = ({ data }) => {
  const router = useRouter();

  const [tab, setTab] = React.useState<string>('dashboard');
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false); // Mặc định ẩn
  const [hasVisitedDashboard, setHasVisitedDashboard] = React.useState<boolean>(false); // Theo dõi lần đầu

  React.useEffect(() => {
    const storedTab = localStorage.getItem('ribbonSelectedTab');
    const storedExpanded = localStorage.getItem('ribbonIsExpanded');
    const storedVisited = localStorage.getItem('ribbonVisitedDashboard');

    if (storedTab) setTab(storedTab);
    if (storedExpanded !== null) setIsExpanded(storedExpanded === 'true');
    if (storedVisited === 'true') setHasVisitedDashboard(true);
  }, []);

  React.useEffect(() => {
    localStorage.setItem('ribbonSelectedTab', tab);
    localStorage.setItem('ribbonIsExpanded', isExpanded.toString());
    localStorage.setItem('ribbonVisitedDashboard', hasVisitedDashboard.toString());
  }, [tab, isExpanded, hasVisitedDashboard]);

  React.useEffect(() => {
    const handleRouteChange = () => {
      const storedExpanded = localStorage.getItem('ribbonIsExpanded');
      if (storedExpanded === 'false') {
        setIsExpanded(false);
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const handleLogout = () => {
    storage.clearTokenInfo();
    window.location.href = ('/login');
  };

  const handleCron = () => {
    getAxios(window.location.hostname).post(`/cron/runJob`, {}, {
      headers: {
        'Authorization': `Bearer ${storage.get('token') || ''}`
      }
    }).catch((error: any) => {
      if (error.response?.status === 401 && error.response.data.error === 'Invalid token') {
        storage.clearTokenInfo();
        window.location.href = '/';
      }
    });
  };

  const topTabs = [
    { id: 0, name: 'Dashboard', admin_controller: '', parent: -1, __level: 0 },
    ...data.map(item => ({ ...item, __level: 0 }))
  ];

  const renderButtons = (items: MenuItem[]) => (
    <Row className="gx-3">
      {items.map(item => (
        <Col key={item.id} xs="auto">
          <Card className="p-2">
            <Card.Body className="p-2">
              {item.__children?.length ? (
                <DropdownButtonGroup parent={item} />
              ) : (
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => window.location.href = (`/Table/${item.admin_controller}`)}>
                  {item.name}
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const DropdownButtonGroup = ({ parent }: { parent: MenuItem }) => (
    <Dropdown>
      <Dropdown.Toggle size="sm" variant="outline-secondary">
        {parent.name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {parent.__children?.map(child => (
          child.__children?.length ? (
            <Dropdown drop="end" key={child.id}>
              <Dropdown.Toggle as="div" className="dropdown-item">
                {child.name} ▸
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {child.__children.map(grand => (
                  <Dropdown.Item key={grand.id} onClick={() => window.location.href = (`/Table/${grand.admin_controller}`)}>
                    {grand.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown.Item key={child.id} onClick={() => window.location.href = (`/Table/${child.admin_controller}`)}>
              {child.name}
            </Dropdown.Item>
          )
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );

  const getChildrenForTab = (tabName: string): MenuItem[] => {
    if (tabName === 'dashboard') return [];
    const found = data.find(item => item.name.toLowerCase() === tabName);
    return found?.__children || [];
  };

  return (
    <div className="bg-white border-bottom shadow-sm mb-3">
      <div className="d-flex justify-content-between align-items-center px-3 pt-2">
        <Tabs
          activeKey={tab}
          onSelect={(k) => {
            if (!k) return;

            if (tab === k) {
              setIsExpanded(prev => !prev); // toggle nếu nhấn lại
            } else {
              setTab(k);

              if (k === 'dashboard') {
                // Nếu đã từng vào thì mở, còn lần đầu thì ẩn
                if (hasVisitedDashboard) {
                  setIsExpanded(true);
                } else {
                  setIsExpanded(false);
                  setHasVisitedDashboard(true);
                }
              } else {
                setIsExpanded(true); // các tab khác luôn mở
              }
            }
          }}
          className="flex-grow-1"
        >
          {topTabs.map(item => (
            <Tab key={item.id} eventKey={item.name.toLowerCase()} title={item.name} />
          ))}
        </Tabs>
        <Button
          variant="outline-secondary"
          size="sm"
          className="ms-2"
          onClick={() => setIsExpanded(prev => !prev)}
        >
          {isExpanded ? '⬆ Ẩn nội dung' : '⬇ Hiện nội dung'}
        </Button>
      </div>

      {isExpanded && (
        <Container fluid className="bg-light border-top py-2">
          {tab === 'dashboard' ? (
            <Row>
              <Col xs="auto">
                <Card className="p-2">
                  <Card.Body className="p-2">
                    <Button variant="primary" size="sm" onClick={() => window.location.href = ('/')}>🏠 Dashboard</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs="auto">
                <Card className="p-2">
                  <Card.Body className="p-2">
                    <Button variant="danger" size="sm" onClick={handleLogout}>🚪 Logout</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs="auto">
                <Card className="p-2">
                  <Card.Body className="p-2">
                    <Button variant="warning" size="sm" onClick={handleCron}>⚙️ Cron</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : renderButtons(getChildrenForTab(tab))}
        </Container>
      )}
    </div>
  );
};

export default RibbonMenu;
