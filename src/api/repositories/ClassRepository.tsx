import { TableGridSettings } from "@/types/TableGridSettings";
import { tableRepository } from "./Table";

export const classRepository = {
    getClass: (classId: number) => {
        return tableRepository.get('classes', classId);
    },
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
                classId: classId,
                status: 1
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
                studyDate: { from: startDate, to: endDate }
            })),
            sorts: [
                { index: 'studyDate', direction: 'asc' },
            ],
            page: 0, pageSize: 1000,
        });
    },
    updateAttendance: (settings: TableGridSettings, classId: string | number, paymentPeriodId: string | number, studentId: string | number, studyDate: string, value: string | number) => {
        return tableRepository.updateAttendance(settings, classId, paymentPeriodId, studentId, studyDate, value);
    },
    updateAttendances: (settings: TableGridSettings, classId: string | number, paymentPeriodId: string | number, attendances: any[]) => {
        return tableRepository.updateAttendances(settings, classId, paymentPeriodId, attendances);
    },
    calculateInfoForCreatePhieuThu: (classId: string | number, paymentPeriodId: string | number, studentId: string | number) => {
        return tableRepository.calculateInfoForCreatePhieuThu(classId, paymentPeriodId, studentId);
    },
    createPhieuThu(classId: string | number, paymentPeriodId: string | number, studentId: string | number, orderData: {
        orderDate: string | number, additional: string | number, invoiceNum: string | number
    }) {
        return tableRepository.createPhieuThu(classId, paymentPeriodId, studentId, orderData);
    }
}