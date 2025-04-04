import { TableGridSettings } from "@/components/grid/TableGrid";
import { QlhsStudentSettings } from "./qlhs/QlhsStudentSettings";
import { QlhsClassSettings } from "./qlhs/QlhsClassSettings";
import { QlhsSubjectSettings } from "./qlhs/QlhsSubjectSettings";

export const getSettingsByControllerForQLHS = (controller: string, hostname: string = 'localhost'): TableGridSettings | null => {
    if (controller === 'student') {
        return QlhsStudentSettings;
    }
    if (controller === 'class') {
        return QlhsClassSettings;
    }
    if (controller === 'subject') {
        return QlhsSubjectSettings;
    }
    return null;
}