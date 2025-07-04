'use client';
import { getSettingsByController } from "@/api/settings";
import { NextNobelsFooter } from "@/components/footer/NextNobelsFooter";
import { TableGridSettings } from "@/types/TableGridSettings";
import { TableGridWrapper } from "@/components/grid/TableGridWrapper";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";

import { GetServerSideProps } from 'next';
import RibbonMenuGrid from "@/components/menu/RibbonMenuGrid";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const host = req.headers.host; // e.g., 'localhost:3000' or 'example.com'

    return {
        props: { host },
    };
};

export default function TableIndex({ host }: { host: string }): React.ReactElement {
    let router = useRouter();
    const { controller } = router.query;
    let hostname = host.split(':')[0];
    let settings: TableGridSettings | null = getSettingsByController(controller as string, hostname);
    if (settings) {
        return <>
            <Container fluid>
                {/* <TopMenuGrid /> */}
                <RibbonMenuGrid />
            </Container>
            <TableGridWrapper controller={controller as string} />;
            <Container fluid className="mt-3 mb-3 bg-light pt-3 pb-3">
                <NextNobelsFooter />
            </Container>
        </>

    }
    return <div>Not found</div>;
}
