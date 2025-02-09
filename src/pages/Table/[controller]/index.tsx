import { getSettingsByController } from "@/api/settings";
import { NextNobelsFooter } from "@/components/footer/NextNobelsFooter";
import { TableGridSettings } from "@/components/grid/TableGrid";
import { TableGridWrapper } from "@/components/grid/TableGridWrapper";
import { TopMenuGrid } from "@/components/menu/TopMenuGrid";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";

export default function TableIndex(): React.ReactElement {
    let router = useRouter();
    const { controller } = router.query;
    let settings: TableGridSettings | null = getSettingsByController(controller as string);
    if (settings) {
        return <>
            <Container fluid className="mt-3 mb-3">
                <TopMenuGrid />
            </Container>
            <TableGridWrapper controller={controller as string} />;
            <Container fluid className="mt-3 mb-3 bg-light pt-3 pb-3">
                <NextNobelsFooter />
            </Container>
        </>

    }
    return <div>Not found</div>;
}
