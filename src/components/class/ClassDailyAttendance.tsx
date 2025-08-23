import React, { useEffect, useState } from "react";
import { TableGridDetail as GridDetail } from "@/types/detail/TableGridDetail";
import { Col, Row, Table } from "react-bootstrap";
import { QlhsGridClassPaymentPeriodSettings as ClassPaymentPeriodSettings } from "@/api/settings/qlhs/QlhsGridClassPaymentPeriodSettings";
import { QlhsGridClassScheduleSettings as ClassScheduleSettings } from "@/api/settings/qlhs/QlhsGridClassScheduleSettings";
import { formatShortDate } from "@/api/defaultSettings";
import { classRepository } from "@/api/repositories/ClassRepository";
import { QlhsStudentAttendanceSettings as StudentAttendanceSettings } from "@/api/settings/qlhs/QlhsStudentAttendanceSettings";
interface ClassAttendanceProps {
    classId: number;
    detail: GridDetail;
}

const ClassDailyAttendance: React.FC<ClassAttendanceProps> = ({ classId, detail }) => {
    const [klass, setKlass] = useState<any>();
    const [students, setStudents] = useState<any[]>([]);
    const [periods, setPeriods] = useState<any[]>([]);
    const [schedules, setSchedules] = useState<any[]>([]);
    const [selectedPeriodId, setSelectedPeriodId] = useState<number | string>('');
    const [selectedScheduleDate, setSelectedScheduleDate] = useState<string>('');
    const [attendances, setAttendances] = useState<any>({});
    useEffect(() => {
        if (detail.settings) {
            classRepository.getClass(classId).then((resp: any) => {
                setKlass(resp.data);
            });
            classRepository.getStudents(detail.settings, classId)
                .then((resp: any) => {
                    setStudents(resp.data.items);
                });

            let periodSettings = ClassPaymentPeriodSettings;
            classRepository.getPaymentPeriods(periodSettings, classId)
                .then((resp: any) => {
                    setPeriods(resp.data.items);
                });
        }
    }, [classId]);

    useEffect(() => {
        if (selectedPeriodId) {
            loadSchedule(selectedPeriodId);
        } else {
            setSchedules([]);
            setAttendances([]);
        }
        setSelectedScheduleDate('');
    }, [selectedPeriodId]);

    useEffect(() => {
        if (selectedScheduleDate) {
            loadDailySchedule(selectedScheduleDate);
        } else {
            setAttendances([]);
        }
    }, [selectedScheduleDate]);

    function loadSchedule(selectedPeriodId: string | number) {
        let selectedPeriod = periods.find(period => selectedPeriodId == period.paymentPeriodId[0].id);
        if (!selectedPeriod) return;

        let { startDate, endDate } = selectedPeriod;
        let scheduleSettings = ClassScheduleSettings;
        classRepository.getSchedules(scheduleSettings, classId, startDate, endDate)
            .then((resp: any) => {
                setSchedules(resp.data.items);
            });
    }

    function loadDailySchedule(scheduleDate: string) {
        let attendanceSettings = StudentAttendanceSettings;
        classRepository.getAttendances(attendanceSettings, classId, selectedPeriodId, scheduleDate, scheduleDate).then((resp: any) => {
            let mapAttendances: any = {};
            resp.data.items.forEach((attendance: any) => {
                let currentStudentId = attendance.studentId[0].id;
                if (typeof mapAttendances[currentStudentId] === 'undefined') {
                    mapAttendances[currentStudentId] = {};
                }
                mapAttendances[currentStudentId][attendance.studyDate] = attendance.status;
            });
            setAttendances(mapAttendances);
        });
    }

    function handleChangeAttendance(studentId: number, studyDate: string, value: string | number) {
        let mapAttendances: any = { ...attendances };
        if (typeof mapAttendances[studentId] === 'undefined') {
            mapAttendances[studentId] = {};
        }
        mapAttendances[studentId][studyDate] = value;
        setAttendances(mapAttendances);
        let attendanceSettings = StudentAttendanceSettings;
        classRepository.updateAttendance(attendanceSettings, classId, selectedPeriodId, studentId, studyDate, value);
    }
    function handleAllAttendance(studyDate: string, value: string | number) {
        let dateAttendances: any = [];
        let mapAttendances: any = { ...attendances };
        students.forEach((student: any) => {
            let studentId = student.studentId;
            if (typeof mapAttendances[studentId] === 'undefined') {
                mapAttendances[studentId] = {};
            }
            mapAttendances[studentId][studyDate] = value;
            dateAttendances.push({
                studentId: studentId,
                studyDate,
                status: value,
            });
        });


        setAttendances(mapAttendances);

        let attendanceSettings = StudentAttendanceSettings;
        classRepository.updateAttendances(attendanceSettings, classId, selectedPeriodId, dateAttendances);
    }
    return <>
        <div className="d-flex align-items-center justify-content-between">
            <h1>{detail.label}</h1>
            <div style={{ width: "40rem" }}>
                <Row>
                    <Col>
                        <select className="form-select" value={selectedPeriodId} onChange={(evt: any) => {
                            setSelectedPeriodId(evt.target.value);
                        }}>
                            <option value={""}>Chọn kỳ học phí</option>
                            {periods.map((period) => {
                                return <option key={'period-' + period.id} value={period.paymentPeriodId[0].id}>{period.paymentPeriodName}</option>
                            })}
                        </select>
                    </Col>
                    <Col>
                        <select className="form-select" value={selectedScheduleDate} onChange={(evt: any) => {
                            setSelectedScheduleDate(evt.target.value);
                        }}>
                            <option value={""}>Chọn Ngày học</option>
                            {schedules.map((schedule) => {
                                return <option key={'date-' + schedule.id} value={schedule.studyDate}>{schedule.studyDate}</option>
                            })}
                        </select>
                    </Col>
                </Row>


            </div>
        </div>
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Họ và tên</th>
                    {selectedScheduleDate && 
                        <th key={'schedule-' + selectedScheduleDate} className="text-center">{formatShortDate(new Date(selectedScheduleDate))}<br />
                            <select onChange={(evt: any) => {
                                handleAllAttendance(selectedScheduleDate, evt.target.value);
                            }}>
                                <option value="">Chọn</option>
                                <option value="1">CM</option>
                                <option value="2">NTT</option>
                                <option value="3">NKT</option>
                                <option value="4">KTT</option>
                                <option value="5">DH</option>
                            </select>
                        </th>
                    }
                </tr>
            </thead>
            <tbody>
                {students.map(student => {
                    return <tr key={'attendance-' + student.id}>
                        <td>{student.id}</td>
                        <td>{student.studentName}</td>
                        {selectedScheduleDate && 
                            <td key={'schedule-' + selectedScheduleDate} className="text-center">
                                <select value={attendances[student.studentId] && attendances[student.studentId][selectedScheduleDate]} onChange={(evt: any) => {
                                    handleChangeAttendance(student.studentId, selectedScheduleDate, evt.target.value);
                                }}>
                                    <option value="">Chọn</option>
                                    <option value="1">CM</option>
                                    <option value="2">NTT</option>
                                    <option value="3">NKT</option>
                                    <option value="4">KTT</option>
                                    <option value="5">DH</option>
                                </select>
                            </td>
                        }
                    </tr>
                })}
            </tbody>
        </Table>
    </>
}

export default ClassDailyAttendance;