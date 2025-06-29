'use client';
import { useRouter } from "next/router";
import React from "react";

import FeeCreatePhieuThu from "@/components/fee/CreatePhieuThu";


export default function FeeCreate(): React.ReactElement {
    let router = useRouter();
    const { centerId, subjectId, classId, studentId, periodId } = router.query;
    if (!centerId || typeof centerId !== "string"
        || !subjectId || typeof subjectId !== "string"
        || !classId || typeof classId !== "string"
        || !studentId || typeof studentId !== "string"
        || !periodId || typeof periodId !== "string"
    ) {
        return <div>Invalid ID</div>;
    }
    return <FeeCreatePhieuThu centerId={centerId} subjectId={subjectId} classId={classId} studentId={studentId} periodId={periodId} />;
}