// pages/classes/[classId]/index.tsx
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Container, Nav, Tab } from 'react-bootstrap';
import Students from '@/components/class-management/Students';
import ClassSchedules from '@/components/class-management/ClassSchedules';
import Attendants from '@/components/class-management/Attendants';
import PaymentPeriods from '@/components/class-management/PaymentPeriods';
import TuitionFees from '@/components/class-management/TuitionFees';
import ClassInformation from '@/components/class-management/ClassInformation';

const ClassManagementPage = () => {
    const router = useRouter();
    const { classId } = router.query;

    const [activeTab, setActiveTab] = useState('classInformation');

    return (
        <Container fluid>
            <div className="d-flex">
                <div className="flex-shrink-0 bg-light p-3" style={{ width: '250px' }}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link
                                eventKey="classInformation"
                                active={activeTab === 'classInformation'}
                                onClick={() => setActiveTab('classInformation')}
                            >
                                Class Information
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="students"
                                active={activeTab === 'students'}
                                onClick={() => setActiveTab('students')}
                            >
                                Students
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="classSchedules"
                                active={activeTab === 'classSchedules'}
                                onClick={() => setActiveTab('classSchedules')}
                            >
                                Class Schedules
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="attendants"
                                active={activeTab === 'attendants'}
                                onClick={() => setActiveTab('attendants')}
                            >
                                Attendants
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="paymentPeriods"
                                active={activeTab === 'paymentPeriods'}
                                onClick={() => setActiveTab('paymentPeriods')}
                            >
                                Payment Periods
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="tuitionFees"
                                active={activeTab === 'tuitionFees'}
                                onClick={() => setActiveTab('tuitionFees')}
                            >
                                Tuition Fees
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className="flex-grow-1 p-3">
                    <Tab.Content>
                        {activeTab === 'classInformation' && <ClassInformation classId={classId ?? '0'} />}
                        {activeTab === 'students' && <Students classId={classId ?? '0'} />}
                        {activeTab === 'classSchedules' && <ClassSchedules />}
                        {activeTab === 'attendants' && <Attendants />}
                        {activeTab === 'paymentPeriods' && <PaymentPeriods />}
                        {activeTab === 'tuitionFees' && <TuitionFees />}
                    </Tab.Content>
                </div>
            </div>
        </Container>
    );
};

export default ClassManagementPage;
