import { TableGridSettings } from "@/types/TableGridSettings";
import { getAxios } from "../axiosInstance";
import { storage } from "../storage";
import { DataGridColumn } from "@/types/grid/DataGridColumn";
import { tableRepository } from "./Table";

export const classRepository = {
    getStudents: (settings: TableGridSettings, classId: number) => {
        return tableRepository.getList(settings, {
            settings: JSON.parse(JSON.stringify(settings)),
            search: '', defaultFilters: JSON.parse(JSON.stringify({
                classId: classId
            })),
            sorts: settings.defaultSorts,
            page: 0, pageSize: 100,
        })
    },
    getPaymentPeriods: (settings: TableGridSettings, classId: number) => {
        return tableRepository.getList(settings, {
            settings: JSON.parse(JSON.stringify(settings)),
            search: '', defaultFilters: JSON.parse(JSON.stringify({
                classId: classId
            })),
            sorts: settings.defaultSorts,
            page: 0, pageSize: 100,
        })
    },
    getSchedules: (settings: TableGridSettings, classId: number, startDate: string, endDate: string) => {
        return tableRepository.getList(settings, {
            settings: JSON.parse(JSON.stringify(settings)),
            search: '', defaultFilters: JSON.parse(JSON.stringify({
                classId: classId,
                studyDate: { from: startDate, to: endDate }
            })),
            sorts: [
                { index: 'studyDate', direction: 'asc' },
                { index: 'studyTime', direction: 'asc' },
            ],
            page: 0, pageSize: 100,
        })
    },
    getAttendances: (settings: TableGridSettings, classId: number, paymentPeriodId: string | number, startDate: string, endDate: string) => {
        return tableRepository.getList(settings, {
            settings: JSON.parse(JSON.stringify(settings)),
            search: '', defaultFilters: JSON.parse(JSON.stringify({
                classId: classId,
                paymentPeriodId: paymentPeriodId,
                attendanceDate: { from: startDate, to: endDate }
            })),
            sorts: [
                { index: 'attendanceDate', direction: 'asc' },
            ],
            page: 0, pageSize: 1000,
        });
    },
    updateAttendance: (settings: TableGridSettings, classId: string | number, paymentPeriodId: string | number, studentId: string | number, attendanceDate: string, value: string | number) => {
        return tableRepository.updateAttendance(settings, classId, paymentPeriodId, studentId, attendanceDate, value);
    },
    updateAttendances: (settings: TableGridSettings, classId: string | number, paymentPeriodId: string | number, attendances: any[]) => {
        return tableRepository.updateAttendances(settings, classId, paymentPeriodId, attendances);
    } 
}