import { TableGridSettings } from "@/components/grid/TableGrid";
import { PmtvAdminHistoryPaymentSettings } from "./pmtv/fee/PmtvHistoryPaymentSettings";
import { PmtvAdminServicePackagesSettings } from "./pmtv/fee/PmtvServicePackagesSettings";
import { PmtvAdminCategoriesSettings } from "./pmtv/PmtvCategoriesSettings";
import { PmtvAdminQuestionSettings } from "./pmtv/education/PmtvQuestionSettings";
import { PmtvAdminDocumentSettings } from "./pmtv/education/PmtvDocumentSettings";

export const getSettingsByControllerForPMTV = (controller: string, hostname: string = 'localhost'): TableGridSettings | null => {
    if (controller === "history_payment" || controller === "admin_payment_historypayment") {
        return PmtvAdminHistoryPaymentSettings;
    }
    if (controller === "service_packages" || controller === "admin_service_servicepackages") {
        return PmtvAdminServicePackagesSettings;
    }
    if (controller === "category" || controller === "admin_category") {
        return PmtvAdminCategoriesSettings;
    }
    if (controller === "question" || controller === "question2" || controller === "admin_question2") {
        return PmtvAdminQuestionSettings
    }
    if (controller === "document" || controller === "admin_document") {
        return PmtvAdminDocumentSettings;
    }
    return null;
}