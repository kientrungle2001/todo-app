import React, { useEffect, useState } from "react";
import { TableGridDetail } from "@/types/detail/TableGridDetail";
import { Table } from "react-bootstrap";
import { QlhsGridClassPaymentPeriodSettings } from "@/api/settings/qlhs/QlhsGridClassPaymentPeriodSettings";
import { QlhsGridClassScheduleSettings } from "@/api/settings/qlhs/QlhsGridClassScheduleSettings";
import { formatShortDate } from "@/api/defaultSettings";
import { classRepository } from "@/api/repositories/ClassRepository";
import { QlhsStudentAttendanceSettings } from "@/api/settings/qlhs/QlhsStudentAttendanceSettings";

interface ClassAttendanceProps {
    itemId: number;
    detail: TableGridDetail;
}

const ClassAttendance: React.FC<ClassAttendanceProps> = ({ itemId, detail }) => {
    const [items, setItems] = useState<any[]>([]);
    const [periods, setPeriods] = useState<any[]>([]);
    const [schedules, setSchedules] = useState<any[]>([]);
    const [selectedPeriodId, setSelectedPeriodId] = useState<number | string>('');
    const [attendances, setAttendances] = useState<any>({});
    useEffect(() => {
        if (detail.settings) {
            classRepository.getStudents(detail.settings, itemId)
                .then((resp: any) => {
                    setItems(resp.data.items);
                });

            let periodSettings = QlhsGridClassPaymentPeriodSettings;
            classRepository.getPaymentPeriods(periodSettings, itemId)
                .then((resp: any) => {
                    setPeriods(resp.data.items);
                });
        }
    }, [itemId]);

    useEffect(() => {
        if (selectedPeriodId) {
            loadSchedule(selectedPeriodId);
        } else {
            setSchedules([]);
        }
    }, [selectedPeriodId]);

    function loadSchedule(selectedPeriodId: string | number) {
        let selectedPeriod = periods.find(period => selectedPeriodId == period.paymentPeriodId[0].id);
        if (!selectedPeriod) return;

        let { startDate, endDate } = selectedPeriod;
        let scheduleSettings = QlhsGridClassScheduleSettings;
        classRepository.getSchedules(scheduleSettings, itemId, startDate, endDate)
            .then((resp: any) => {
                setSchedules(resp.data.items);
            });
        let attendanceSettings = QlhsStudentAttendanceSettings;
        classRepository.getAttendances(attendanceSettings, itemId, selectedPeriodId, startDate, endDate).then((resp: any) => {
            let mapAttendances: any = {};
            resp.data.items.forEach((attendance: any) => {
                let currentStudentId = attendance.studentId[0].id;
                if (typeof mapAttendances[currentStudentId] === 'undefined') {
                    mapAttendances[currentStudentId] = {};
                }
                mapAttendances[currentStudentId][attendance.attendanceDate] = attendance.status;
            });
            setAttendances(mapAttendances);
        })
    }

    function handleChangeAttendance(studentId: number, attendanceDate: string, value: string | number) {
        let mapAttendances: any = { ...attendances };
        if (typeof mapAttendances[studentId] === 'undefined') {
            mapAttendances[studentId] = {};
        }
        mapAttendances[studentId][attendanceDate] = value;
        setAttendances(mapAttendances);
        let attendanceSettings = QlhsStudentAttendanceSettings;
        classRepository.updateAttendance(attendanceSettings, itemId, selectedPeriodId, studentId, attendanceDate, value);
    }
    return <>
        <div className="d-flex align-items-center justify-content-between">
            <h1>{detail.label}</h1>
            <div style={{ width: "20rem" }}>
                <select className="form-select" value={selectedPeriodId} onChange={(evt: any) => {
                    setSelectedPeriodId(evt.target.value);
                }}>
                    <option value={""}>Chọn kỳ học phí</option>
                    {periods.map((period) => {
                        return <option key={'period-' + period.id} value={period.paymentPeriodId[0].id}>{period.paymentPeriodName}</option>
                    })}
                </select>
            </div>
        </div>
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Họ và tên</th>
                    {schedules.map((schedule) => {
                        return <th key={'schedule-' + schedule.id} className="text-center">{formatShortDate(new Date(schedule.studyDate))}<br />
                            <select>
                                <option value="">Chọn</option>
                                <option value="1">CM</option>
                                <option value="2">NTT</option>
                                <option value="3">NKT</option>
                            </select>
                        </th>
                    })}
                    {schedules.length > 0 && <th>Tạo HĐ</th>}
                </tr>
            </thead>
            <tbody>
                {items.map(item => {
                    return <tr key={'attendance-' + item.id}>
                        <td>{item.id}</td>
                        <td>{item.studentName}</td>
                        {schedules.map((schedule) => {
                            return <td key={'schedule-' + schedule.id} className="text-center">
                                <select value={attendances[item.studentId] && attendances[item.studentId][schedule.studyDate]} onChange={(evt: any) => {
                                    handleChangeAttendance(item.studentId, schedule.studyDate, evt.target.value);
                                }}>
                                    <option value="">Chọn</option>
                                    <option value="1">CM</option>
                                    <option value="2">NTT</option>
                                    <option value="3">NKT</option>
                                </select>
                            </td>
                        })}
                        {schedules.length > 0 && <td><a href={"/fee/create?classId=" + itemId + "&studentId=" + item.studentId + "&periodId=" + selectedPeriodId}>Tạo HĐ</a></td>}
                    </tr>
                })}
            </tbody>
        </Table>
    </>
}

export default ClassAttendance;