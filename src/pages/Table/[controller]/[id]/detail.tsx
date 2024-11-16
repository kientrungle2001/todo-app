import { getSettingsByController } from "@/api/settings";
import { NextNobelsFooter } from "@/components/grid/NextNobelsFooter";
import { TableGridSettings } from "@/components/grid/TableGrid";
import { QuestionGridDetail } from "@/components/grid/QuestionGridDetail";
import { TopMenuGrid } from "@/components/grid/TopMenuGrid";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";
import { TestGridDetail } from "@/components/grid/TestGridDetail";
import { CategoryGridDetail } from "@/components/grid/CategoryGridDetail";

export default function TableEdit(): React.ReactElement {
    let router = useRouter();
    const { controller } = router.query;
    const { id } = router.query;
    if (!id || typeof id !== "string") {
        return <div>Invalid ID</div>;
    }
    const itemId: number = parseInt(id);
    if (!['admin_question2', 'admin_test', 'admin_category'].includes(controller as string))
        return <div>Not found</div>;
    let settings: TableGridSettings | null = getSettingsByController(controller as string);
    if (settings) {
        return <>
            <Container fluid className="mt-3 mb-3">
                <TopMenuGrid />
            </Container>
            {('admin_question2' === (controller as string))
                && <QuestionGridDetail controller={controller as string} itemId={itemId} settings={settings} />}
            {('admin_test' === (controller as string))
                && <TestGridDetail controller={controller as string} itemId={itemId} settings={settings} />}
            {('admin_category' === (controller as string))
                && <CategoryGridDetail controller={controller as string} itemId={itemId} settings={settings} />}
            <Container fluid className="mt-3 mb-3 bg-light pt-3 pb-3">
                <NextNobelsFooter />
            </Container>
        </>;
    }
    return <div>Not found</div>;
}