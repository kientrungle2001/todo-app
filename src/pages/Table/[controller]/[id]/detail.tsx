import { getSettingsByController } from "@/api/settings";
import { NextNobelsFooter } from "@/components/footer/NextNobelsFooter";
import { TableGridSettings } from "@/components/grid/TableGrid";
import { QuestionGridDetail } from "@/components/grid/detail/question/QuestionGridDetail";
import { TopMenuGrid } from "@/components/menu/TopMenuGrid";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";
import { TestGridDetail } from "@/components/grid/detail/test/TestGridDetail";
import { CategoryGridDetail } from "@/components/grid/detail/category/CategoryGridDetail";
import { ResourceGridDetail } from "@/components/grid/detail/resource/ResourceGridDetail";

import { GetServerSideProps } from 'next';
import { TableGridDetail } from "@/components/grid/TableGridDetail";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const host = req.headers.host; // e.g., 'localhost:3000' or 'example.com'

    return {
        props: { host },
    };
};

export default function TableEdit({ host }: { host: string }): React.ReactElement {
    let router = useRouter();
    const { controller } = router.query;
    const { id } = router.query;
    if (!id || typeof id !== "string") {
        return <div>Invalid ID</div>;
    }
    const itemId: number = parseInt(id);

    let hostname = host.split(':')[0];
    let settings: TableGridSettings | null = getSettingsByController(controller as string, hostname);
    if (settings) {
        if (settings.details) {
            return <>
                <Container fluid className="mt-3 mb-3">
                    <TopMenuGrid />
                </Container>
                <TableGridDetail controller={controller as string} itemId={parseInt(id)} settings={settings} />
                <Container fluid className="mt-3 mb-3 bg-light pt-3 pb-3">
                    <NextNobelsFooter />
                </Container>
            </>;
        }
        if (!['admin_question2', 'admin_test', 'admin_category', 'admin_course_resource'].includes(controller as string))
            return <div>Not found</div>;
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
            {('admin_course_resource' === (controller as string))
                && <ResourceGridDetail controller={controller as string} itemId={itemId} settings={settings} />}
            <Container fluid className="mt-3 mb-3 bg-light pt-3 pb-3">
                <NextNobelsFooter />
            </Container>
        </>;
    }
    return <div>Not found</div>;
}