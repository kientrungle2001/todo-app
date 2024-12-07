import React, { useEffect } from "react";
import { TableGridSettings } from "./TableGrid";
import axios, { getAxios } from "@/api/axiosInstance";
import { useRouter } from "next/router";
import { storage } from "@/api/storage";
import { DataGridEditField, DataGridEditMode } from "./DataGridEditTypes";
import TestGridEdit from "./TestGridEdit";

interface TableGridProps {
    itemId: number;
    controller: string;
    settings: TableGridSettings
}

export const TestGridDetail: React.FC<TableGridProps> = ({ controller, settings, itemId }): React.ReactElement => {
    const router = useRouter();
    const [item, setItem] = React.useState<any>(null);

    useEffect(() => {
        getAxios(window.location.hostname).post(`/tables/${settings.table}/detail/${itemId}`, {
            settings
        }, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).then((resp: any) => {
            setItem(resp.data);
            console.log("Fetched item:", resp.data);
        }).catch((error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                router.push('/login');
            }
        });
    }, [itemId]);

    if (!item) {
        return <>
            <h3>Loading...</h3>
        </>
    }


    const validateQuestionAnswers = (question: any): boolean => {
        if (question.answers.length <= 0) {
            return false;
        }
        let hasRightAnswer = false;
        let hasEmptyAnswer = false;
        question.answers.forEach((answer: any) => {
            if (!answer.content || !answer.content_vn) {
                hasEmptyAnswer = true;
                return false;
            }
            if (answer.status === '1') {
                hasRightAnswer = true;
            }
        });
        if (!hasRightAnswer) {
            return false;
        }
        if (hasEmptyAnswer) {
            return false;
        }
        return true;
    }

    const handleUpdateItem = (updatedItem: any, fields: DataGridEditField[], event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log("Updating item answers:", updatedItem);
        if (!validateQuestionAnswers(updatedItem)) {
            window.alert('Kiểm trả lại các câu trả lời, câu trả lời có thể trống hoặc chưa chọn đáp án đúng');
            return;
        }

        getAxios(window.location.hostname).put(`/questions/updateAnswers/${itemId}`, {
            item: updatedItem,
            settings: JSON.parse(JSON.stringify(settings)),
            fields: JSON.parse(JSON.stringify(fields))
        }, {
            headers: {
                'Authorization': `Bearer ${storage.get('token') || ''}`
            }
        }).then(() => {
            setItem(updatedItem);
            router.push(`/Table/${controller}`);
        }).catch((error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid token') {
                storage.clearTokenInfo();
                router.push('/login');
            }
        }).catch((error: any) => {
            console.error("Error updating item:", error);
            alert("Error updating item. Please try again later.");
        });
    }

    const handleCancelEdit = (): void => {
        router.push(`/Table/${controller}`);
    }

    return <>
        <TestGridEdit updateLabel={settings.updateLabel} mode={DataGridEditMode.EDIT} itemId={itemId} table={settings.table} item={item} setItem={setItem} fields={settings.editFields ?? settings.addFields}
            handleUpdateItem={handleUpdateItem} handleCancelEdit={handleCancelEdit} />
    </>
};
