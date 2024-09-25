import { AdminMenuSettings } from "@/api/settings/AdminMenuSettings";
import { AdminCategoriesSettings } from "@/api/settings/CategoriesSettings";
import { AdminDocumentSettings } from "@/api/settings/DocumentSettings";
import { HistoryPaymentSettings } from "@/api/settings/HistoryPaymentSettings";
import { AdminQuestionSettings } from "@/api/settings/QuestionSettings";
import { ServicePackagesSettings } from "@/api/settings/ServicePackagesSettings";
import { StudentSettings } from "@/api/settings/StudentSettings";
import { AdminTestSettings } from "@/api/settings/TestSettings";
import { UserSettings } from "@/api/settings/UserSettings";
import { TableGridEdit } from "@/components/grid/TableGridEdit";
import { useRouter } from "next/router";
import React from "react";

export default function TableEdit(): React.ReactElement {
    let router = useRouter();
    const { controller } = router.query;
    const { id } = router.query;
    if (!id || typeof id !== "string") {
        return <div>Invalid ID</div>;
    }
    const itemId: number = parseInt(id);
    if (controller === "student") {
        return <>
            <TableGridEdit controller={controller} itemId={itemId} settings={StudentSettings} />
        </>
    } else if (controller === "user" || controller === "admin_user") {
        return <>
            <TableGridEdit controller={controller} itemId={itemId} settings={UserSettings} />
        </>
    } else if (controller === "history_payment" || controller === "admin_payment_historypayment") {
        return <>
            <TableGridEdit controller={controller} itemId={itemId} settings={HistoryPaymentSettings} />
        </>
    } else if (controller === "service_packages" || controller === "admin_service_servicepackages") {
        return <>
            <TableGridEdit controller={controller} itemId={itemId} settings={ServicePackagesSettings} />
        </>
    } else if (controller === "admin_menu") {
        return <>
            <TableGridEdit controller={controller} itemId={itemId} settings={AdminMenuSettings} />
        </>
    } else if (controller === "admin_category") {
        return <>
            <TableGridEdit controller={controller} itemId={itemId} settings={AdminCategoriesSettings} />
        </>
    } else if (controller === "admin_question2") {
        return <>
            <TableGridEdit controller={controller} itemId={itemId} settings={AdminQuestionSettings} />
        </>
    } else if (controller === "admin_document") {
        return <>
            <TableGridEdit controller={controller} itemId={itemId} settings={AdminDocumentSettings} />
        </>
    } else if (controller === "admin_test") {
        return <>
            <TableGridEdit controller={controller} itemId={itemId} settings={AdminTestSettings} />
        </>
    }
    return <div>Not found</div>;
}