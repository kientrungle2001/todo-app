import React, { useEffect, useState } from "react";
import { TableGridDetail } from "@/types/detail/TableGridDetail";
import { Table } from "react-bootstrap";
import { QlhsGridClassPaymentPeriodSettings } from "@/api/settings/qlhs/QlhsGridClassPaymentPeriodSettings";
import { QlhsGridClassScheduleSettings } from "@/api/settings/qlhs/QlhsGridClassScheduleSettings";
import { formatShortDate } from "@/api/defaultSettings";
import { classRepository } from "@/api/repositories/ClassRepository";
import { QlhsStudentAttendanceSettings } from "@/api/settings/qlhs/QlhsStudentAttendanceSettings";

interface ClassAttendanceProps {
    classId: number;
    detail: TableGridDetail;
}

const ClassAttendance: React.FC<ClassAttendanceProps> = ({ classId, detail }) => {
    const [klass, setKlass] = useState<any>();
    const [students, setStudents] = useState<any[]>([]);
    const [periods, setPeriods] = useState<any[]>([]);
    const [schedules, setSchedules] = useState<any[]>([]);
    const [selectedPeriodId, setSelectedPeriodId] = useState<number | string>('');
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

            let periodSettings = QlhsGridClassPaymentPeriodSettings;
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
        }
    }, [selectedPeriodId]);

    function loadSchedule(selectedPeriodId: string | number) {
        let selectedPeriod = periods.find(period => selectedPeriodId == period.paymentPeriodId[0].id);
        if (!selectedPeriod) return;

        let { startDate, endDate } = selectedPeriod;
        let scheduleSettings = QlhsGridClassScheduleSettings;
        classRepository.getSchedules(scheduleSettings, classId, startDate, endDate)
            .then((resp: any) => {
                setSchedules(resp.data.items);
            });
        let attendanceSettings = QlhsStudentAttendanceSettings;
        classRepository.getAttendances(attendanceSettings, classId, selectedPeriodId, startDate, endDate).then((resp: any) => {
            let mapAttendances: any = {};
            resp.data.items.forEach((attendance: any) => {
                let currentStudentId = attendance.studentId[0].id;
                if (typeof mapAttendances[currentStudentId] === 'undefined') {
                    mapAttendances[currentStudentId] = {};
                }
                mapAttendances[currentStudentId][attendance.studyDate] = attendance.status;
            });
            setAttendances(mapAttendances);
        })
    }

    function handleChangeAttendance(studentId: number, studyDate: string, value: string | number) {
        let mapAttendances: any = { ...attendances };
        if (typeof mapAttendances[studentId] === 'undefined') {
            mapAttendances[studentId] = {};
        }
        mapAttendances[studentId][studyDate] = value;
        setAttendances(mapAttendances);
        let attendanceSettings = QlhsStudentAttendanceSettings;
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

        let attendanceSettings = QlhsStudentAttendanceSettings;
        classRepository.updateAttendances(attendanceSettings, classId, selectedPeriodId, dateAttendances);
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
                            <select onChange={(evt: any) => {
                                handleAllAttendance(schedule.studyDate, evt.target.value);
                            }}>
                                <option value="">Chọn</option>
                                <option value="1">CM</option>
                                <option value="2">NTT</option>
                                <option value="3">NKT</option>
                                <option value="4">KTT</option>
                                <option value="5">DH</option>
                            </select>
                        </th>
                    })}
                    {schedules.length > 0 && <th>Tạo HĐ</th>}
                </tr>
            </thead>
            <tbody>
                {students.map(student => {
                    return <tr key={'attendance-' + student.id}>
                        <td>{student.id}</td>
                        <td>{student.studentName}</td>
                        {schedules.map((schedule) => {
                            return <td key={'schedule-' + schedule.id} className="text-center">
                                <select value={attendances[student.studentId] && attendances[student.studentId][schedule.studyDate]} onChange={(evt: any) => {
                                    handleChangeAttendance(student.studentId, schedule.studyDate, evt.target.value);
                                }}>
                                    <option value="">Chọn</option>
                                    <option value="1">CM</option>
                                    <option value="2">NTT</option>
                                    <option value="3">NKT</option>
                                    <option value="4">KTT</option>
                                    <option value="5">DH</option>
                                </select>
                            </td>
                        })}
                        {schedules.length > 0 && <td><a href={"/fee/create?centerId=" + klass.centerId + "&subjectId=" + klass.subjectId + "&classId=" + classId + "&studentId=" + student.studentId + "&periodId=" + selectedPeriodId}>Tạo HĐ</a></td>}
                    </tr>
                })}
            </tbody>
        </Table>
    </>
}

export default ClassAttendance;