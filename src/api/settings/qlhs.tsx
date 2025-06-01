import { TableGridSettings } from "@/types/TableGridSettings";
import { QlhsStudentSettings } from "./qlhs/QlhsStudentSettings";
import { QlhsClassSettings } from "./qlhs/QlhsClassSettings";
import { QlhsSubjectSettings } from "./qlhs/QlhsSubjectSettings";
import { QlhsCenterSettings } from "./qlhs/QlhsCenterSettings";
import { QlhsClassStudentSettings } from "./qlhs/QlhsClassStudentSettings";
import { QlhsRoomSettings } from "./qlhs/QlhsRoomSettings";
import { QlhsTeacherSettings } from "./qlhs/QlhsTeacherSettings";
import { QlhsPaymentPeriodSettings } from "./qlhs/QlhsPaymentPeriodSettings";
import { QlhsClassScheduleSettings } from "./qlhs/QlhsClassScheduleSettings";
import { QlhsClassPaymentPeriodSettings } from "./qlhs/QlhsClassPaymentPeriodSettings";
import { QlhsStudentAttendanceSettings } from "./qlhs/QlhsStudentAttendanceSettings";

export const getSettingsByControllerForQLHS = (controller: string, hostname: string = 'localhost'): TableGridSettings | null => {
    if (controller === 'center') {
        return QlhsCenterSettings;
    }
    if (controller === 'room') {
        return QlhsRoomSettings;
    }
    if (controller === 'subject') {
        return QlhsSubjectSettings;
    }
    if (controller === 'class') {
        return QlhsClassSettings;
    }
    if (controller === 'student') {
        return QlhsStudentSettings;
    }
    if (controller === 'class_student') {
        return QlhsClassStudentSettings;
    }
    if (controller === 'teacher') {
        return QlhsTeacherSettings;
    }
    if (controller === 'payment_period') {
        return QlhsPaymentPeriodSettings;
    }
    if (controller === 'class_payment_period') {
        return QlhsClassPaymentPeriodSettings;
    }
    if (controller === 'class_schedule') {
        return QlhsClassScheduleSettings;
    }
    if (controller === 'student_attendance') {
        return QlhsStudentAttendanceSettings;
    }
    return null;
}