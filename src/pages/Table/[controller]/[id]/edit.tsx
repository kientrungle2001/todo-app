import { getSettingsByController } from "@/api/settings";
import { NextNobelsFooter } from "@/components/grid/NextNobelsFooter";
import { TableGridSettings } from "@/components/grid/TableGrid";
import { TableGridEditWrapper } from "@/components/grid/TableGridEditWrapper";
import { TopMenuGrid } from "@/components/grid/TopMenuGrid";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";

export default function TableEdit(): React.ReactElement {
    let router = useRouter();
    const { controller } = router.query;
    const { id } = router.query;
    if (!id || typeof id !== "string") {
        return <div>Invalid ID</div>;
    }
    const itemId: number = parseInt(id);
    let settings: TableGridSettings | null = getSettingsByController(controller as string);
    if (settings) {
        return <>
            <Container fluid className="mt-3 mb-3">
                <TopMenuGrid />
            </Container>
            <TableGridEditWrapper controller={controller as string} itemId={itemId} />
            <Container fluid className="mt-3 mb-3 bg-light pt-3 pb-3">
                <NextNobelsFooter />
            </Container>
        </>;
    }
    return <div>Not found</div>;
}