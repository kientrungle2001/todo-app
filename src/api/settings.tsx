import { TableGridSettings } from "@/components/grid/TableGrid";
import { StudentSettings } from "./settings/StudentSettings";
import { UserSettings } from "./settings/UserSettings";
import { AdminCategoriesSettings } from "./settings/CategoriesSettings";
import { AdminQuestionSettings } from "./settings/QuestionSettings";
import { ServicePackagesSettings } from "./settings/ServicePackagesSettings";
import { AdminTestSettings } from "./settings/TestSettings";
import { HistoryPaymentSettings } from "./settings/HistoryPaymentSettings";
import { AdminMenuSettings } from "./settings/AdminMenuSettings";
import { AdminDocumentSettings } from "./settings/DocumentSettings";
import { AdminBookSettings } from "./settings/BookSettings";
import { AdminContestSettings } from "./settings/ContestSettings";

export const getSettingsByController = (controller: string): TableGridSettings | null => {
    if (controller === "student") {
        return StudentSettings
    } else if (controller === "user" || controller === "admin_user") {
        return UserSettings
    } else if (controller === "history_payment" || controller === "admin_payment_historypayment") {
        return HistoryPaymentSettings
    } else if (controller === "service_packages" || controller === "admin_service_servicepackages") {
        return ServicePackagesSettings
    } else if (controller === "admin_menu") {
        return AdminMenuSettings
    } else if (controller === "admin_category") {
        return AdminCategoriesSettings
    } else if (controller === "admin_question2") {
        return AdminQuestionSettings
    } else if (controller === "admin_document") {
        return AdminDocumentSettings
    } else if (controller === "admin_test") {
        return AdminTestSettings
    } else if (controller === "admin_book") {
        return AdminBookSettings
    } else if (controller === "admin_contest") {
        return AdminContestSettings
    }
    return null;
}