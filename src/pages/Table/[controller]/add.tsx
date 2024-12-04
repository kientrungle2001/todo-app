import { getSettingsByController } from "@/api/settings";
import { NextNobelsFooter } from "@/components/grid/NextNobelsFooter";
import { TableGridSettings } from "@/components/grid/TableGrid";
import { TableGridAddWrapper } from "@/components/grid/TableGridAddWrapper";
import { TopMenuGrid } from "@/components/grid/TopMenuGrid";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";

export default function TableAdd(): React.ReactElement {
    let router = useRouter();
    const { controller } = router.query;

    return <>
        <Container fluid className="mt-3 mb-3">
            <TopMenuGrid />
        </Container>
        <TableGridAddWrapper controller={controller as string} />
        <Container fluid className="mt-3 mb-3 bg-light pt-3 pb-3">
            <NextNobelsFooter />
        </Container>
    </>;
    return <div>Not found</div>;
}