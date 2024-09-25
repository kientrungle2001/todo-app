import { AdminMenuSettings } from "@/api/settings/AdminMenuSettings";
import { AdminCategoriesSettings } from "@/api/settings/CategoriesSettings";
import { AdminDocumentSettings } from "@/api/settings/DocumentSettings";
import { HistoryPaymentSettings } from "@/api/settings/HistoryPaymentSettings";
import { AdminQuestionSettings } from "@/api/settings/QuestionSettings";
import { ServicePackagesSettings } from "@/api/settings/ServicePackagesSettings";
import { StudentSettings } from "@/api/settings/StudentSettings";
import { AdminTestSettings } from "@/api/settings/TestSettings";
import { UserSettings } from "@/api/settings/UserSettings";
import { TableGridAdd } from "@/components/grid/TableGridAdd";
import { useRouter } from "next/router";
import React from "react";

export default function TableAdd(): React.ReactElement {
    let router = useRouter();
    const { controller } = router.query;
    if (controller === "student") {
        return <>
            <TableGridAdd controller={controller} settings={StudentSettings} />
        </>
    } else if (controller === "user" || controller === "admin_user") {
        return <>
            <TableGridAdd controller={controller} settings={UserSettings} />
        </>
    } else if (controller === "history_payment" || controller === "admin_payment_historypayment") {
        return <>
            <TableGridAdd controller={controller} settings={HistoryPaymentSettings} />
        </>
    } else if (controller === "service_packages" || controller === "admin_service_servicepackages") {
        return <>
            <TableGridAdd controller={controller} settings={ServicePackagesSettings} />
        </>
    } else if (controller === "admin_menu") {
        return <>
            <TableGridAdd controller={controller} settings={AdminMenuSettings} />
        </>
    } else if (controller === "admin_category") {
        return <>
            <TableGridAdd controller={controller} settings={AdminCategoriesSettings} />
        </>
    } else if (controller === "admin_question2") {
        return <>
            <TableGridAdd controller={controller} settings={AdminQuestionSettings} />
        </>
    } else if (controller === "admin_document") {
        return <>
            <TableGridAdd controller={controller} settings={AdminDocumentSettings} />
        </>
    } else if (controller === "admin_test") {
        return <>
            <TableGridAdd controller={controller} settings={AdminTestSettings} />
        </>
    }
    return <div>Not found</div>;
}