import React, { useEffect, useState } from "react";
import { TableGridDetail } from "@/types/detail/TableGridDetail";
import { tableRepository } from "@/api/repositories/Table";
import { Table } from "react-bootstrap";
import { QlhsGridClassPaymentPeriodSettings } from "@/api/settings/qlhs/QlhsGridClassPaymentPeriodSettings";
import { QlhsGridClassScheduleSettings } from "@/api/settings/qlhs/QlhsGridClassScheduleSettings";

interface ClassAttendanceProps {
    itemId: number;
    detail: TableGridDetail;
}

const ClassAttendance: React.FC<ClassAttendanceProps> = ({ itemId, detail }) => {
    const [items, setItems] = useState<any[]>([]);
    const [periods, setPeriods] = useState<any[]>([]);
    const [schedules, setSchedules] = useState<any[]>([]);
    const [selectedPeriodId, setSelectedPeriodId] = useState<number | string>('');
    useEffect(() => {
        if (detail.settings) {
            tableRepository.getList(detail.settings, {
                settings: JSON.parse(JSON.stringify(detail.settings)),
                search: '', defaultFilters: JSON.parse(JSON.stringify({
                    classId: itemId
                })),
                sorts: detail.settings.defaultSorts,
                page: 0, pageSize: 100,
            }).then((resp: any) => {
                setItems(resp.data.items);
            });

            let periodSettings = QlhsGridClassPaymentPeriodSettings;
            tableRepository.getList(detail.settings, {
                settings: JSON.parse(JSON.stringify(periodSettings)),
                search: '', defaultFilters: JSON.parse(JSON.stringify({
                    classId: itemId
                })),
                sorts: periodSettings.defaultSorts,
                page: 0, pageSize: 100,
            }).then((resp: any) => {
                setPeriods(resp.data.items);
            });
        }

    }, [itemId]);
    useEffect(() => {
        if (selectedPeriodId) {
            periods.forEach(period => {
                if (selectedPeriodId == period.paymentPeriodId[0].id) {
                    let startDate = period.startDate;
                    let endDate = period.endDate;
                    let scheduleSettings = QlhsGridClassScheduleSettings;
                    tableRepository.getList(scheduleSettings, {
                        settings: JSON.parse(JSON.stringify(scheduleSettings)),
                        search: '', defaultFilters: JSON.parse(JSON.stringify({
                            classId: itemId,
                            studyDate: {
                                from: startDate,
                                to: endDate
                            }
                        })),
                        sorts: [
                            {
                                index: 'studyDate', direction: 'asc'
                            },
                            {
                                index: 'studyTime', direction: 'asc'
                            },
                        ],
                        page: 0, pageSize: 100,
                    }).then((resp: any) => {
                        setSchedules(resp.data.items);
                    });
                }
            });
        } else {
            setSchedules([]);
        }
    }, [selectedPeriodId]);
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
                        return <th key={'schedule-' + schedule.id}>{schedule.studyDate}</th>
                    })}

                </tr>
            </thead>
            <tbody>
                {items.map(item => {
                    return <tr key={'attendance-' + item.id}>
                        <td>{item.id}</td>
                        <td>{item.studentName}</td>
                        {schedules.map((schedule) => {
                            return <td key={'schedule-' + schedule.id}>
                                <select>
                                    <option value="">Chọn</option>
                                </select>
                            </td>
                        })}
                    </tr>
                })}
            </tbody>
        </Table>
    </>
}

export default ClassAttendance;