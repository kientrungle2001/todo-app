import { TableGridSettings } from "@/components/grid/TableGrid";
import { QlhsStudentSettings } from "./qlhs/QlhsStudentSettings";

export const getSettingsByControllerForQLHS = (controller: string, hostname: string = 'localhost'): TableGridSettings | null => {
    if (controller === 'student') {
        return QlhsStudentSettings;
    }
    return null;
}