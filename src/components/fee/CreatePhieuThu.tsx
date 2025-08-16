'use client';

import { classRepository } from "@/api/repositories/ClassRepository";
import { tableRepository } from "@/api/repositories/Table";
import { useEffect, useState } from "react";

interface FeeCreatePhieuThuProps {
    centerId: string | number;
    subjectId: string | number;
    classId: string | number;
    studentId: string | number;
    periodId: string | number;
}
const FeeCreatePhieuThu: React.FC<FeeCreatePhieuThuProps> = ({ centerId, subjectId, classId, studentId, periodId }) => {
    const [center, setCenter] = useState<any>();
    const [subject, setSubject] = useState<any>();
    const [klass, setKlass] = useState<any>();
    const [student, setStudent] = useState<any>();
    const [period, setPeriod] = useState<any>();
    const [info, setInfo] = useState<any>();
    const [orderDate, setOrderDate] = useState<string>('');
    const [additional, setAdditional] = useState<string>('');
    const [invoiceNum, setInvoiceNum] = useState<string>('');
    useEffect(() => {
        tableRepository.get('center', parseInt(centerId as string)).then((resp: any) => {
            setCenter(resp.data);
        });
        tableRepository.get('subject', parseInt(subjectId as string)).then((resp: any) => {
            setSubject(resp.data);
        });
        tableRepository.get('classes', parseInt(classId as string)).then((resp: any) => {
            setKlass(resp.data);
        });
        tableRepository.get('student', parseInt(studentId as string)).then((resp: any) => {
            setStudent(resp.data);
        });
        tableRepository.get('payment_period', parseInt(periodId as string)).then((resp: any) => {
            setPeriod(resp.data);
        });
        classRepository.calculateInfoForCreatePhieuThu(classId, periodId, studentId)
            .then((resp: any) => {
                setInfo(resp.data);
            });
    }, [centerId, subjectId, classId, studentId, periodId]);
    
    function createPhieuThu() {
        classRepository.createPhieuThu(classId, periodId, studentId, {
            orderDate, additional, invoiceNum
        }).then((resp: any) => {
            console.log(resp.data);
            // window.location.href = '/fee/phieu_thu/' + resp.data.id;
        });
    }

    return <>
        <form method="post" onSubmit={(evt:any) => {
            evt.preventDefault();
            createPhieuThu();
        }}>
            <div className="order_wrapper">
                <div className="order_header">
                    <div className="order_company">
                        <div className="order_line">
                            <span className="order_line_label">Đơn vị: </span>
                            <span className="order_line_value">{center && center.name}</span>
                        </div>
                        <div className="order_line">
                            <span className="order_line_label">Địa chỉ: </span>
                            <span className="order_line_value">{center && center.address}</span>
                        </div>
                    </div>
                    <div className="order_date">
                        <div className="order_line">
                            <strong className="order_line_label order_line_label_header">Phiếu Thu</strong><br />
                            <span className="order_line_value">Ngày <input className="easyui-datebox" type="date" name="created" value={orderDate} onChange={(evt: any) => setOrderDate(evt.target.value)} /></span>
                        </div>
                    </div>
                    <div className="order_no">
                        Quyển số:<input className="easyui-numberbox" type="text" name="bookNum" /><br />
                        Số:<input className="easyui-numberbox" type="text" name="noNum" /><br />
                        Nợ:<input className="easyui-numberbox" type="text" name="debit" /><br />
                        Có:<input className="easyui-numberbox" type="text" name="balance" />
                    </div>
                    <div className="order_template">
                        Mẫu số 01-TT<br />
                        QĐ số: 1141-TC/QĐ/CĐKT<br />
                        Ngày 1 tháng 11 năm 1995 của Bộ Tài Chính
                    </div>
                    <div className="clear"></div>
                </div>
                <input type="hidden" name="paymentType" value="" />
                <div className="order_body">
                    <div className="order_line">
                        <span className="order_line_label">Họ, tên người nộp tiền: </span>
                        <span className="order_line_value"><input type="hidden" name="name" value="Vũ Đức Sang " />{student && student.name} </span>
                    </div>
                    <div className="order_line">
                        <span className="order_line_label">Số điện thoại: </span>
                        <span className="order_line_value"><input type="hidden" name="phone" value="0979248081" />{student && student.phone}</span>
                    </div>
                    <div className="order_line">
                        <span className="order_line_label">Địa chỉ: </span>
                        <span className="order_line_value"><input type="hidden" name="address" value="" />{student && student.address}</span>
                    </div>
                    <div className="order_line">
                        <span className="order_line_label">Lý do thu: </span>
                        <span className="order_line_value"><input type="hidden" name="reason" value="Nộp tiền lớp 5V6K6-SCN-15/10 môn Tiếng Việt, Tháng 4 5/2018" />Nộp tiền lớp {klass && klass.name} môn {subject && subject.name}, {period && period.name}</span>
                    </div>
                    <div className="order_line">
                        <table className="order_table" style={{ borderCollapse: "collapse", width: "100%" }}>
                            <tr>
                                <td><strong>Môn học</strong></td>
                                <td><strong>Lớp học</strong></td>
                                <td><strong>Số buổi</strong></td>
                                <td><strong>HP/buổi</strong></td>
                                <td><strong>Thành tiền</strong></td>
                                <td><strong>Trừ T.trước</strong></td>
                                <td><strong>Lý do</strong></td>
                                <td><strong>Tổng cộng</strong></td>
                            </tr>
                            <tr>
                                <td>{subject && subject.name}</td>
                                <td>{klass && klass.name}</td>
                                <td>{klass && info && (info[studentId].total_attendances - info[studentId].substract_attendances)}</td>
                                <td>{klass && klass.amount}</td>
                                <td>{klass && info && (
                                    (info[studentId].total_attendances - info[studentId].substract_attendances) * klass.amount
                                )} đ</td>
                                <td>{klass && info && (
                                    info[studentId].prev_subtract_attendances * klass.amount
                                )}đ</td>
                                <td>{klass && info &&
                                    (info[studentId].prev_subtract_attendances > 0)
                                    && ('Trừ kỳ hp trước ' + info[studentId].prev_subtract_attendances + ' buổi')
                                }</td>
                                <td>{klass && info && (
                                    (info[studentId].total_attendances - info[studentId].substract_attendances
                                        - info[studentId].prev_subtract_attendances
                                    ) * klass.amount
                                )} đ</td>
                            </tr>
                        </table>
                    </div>
                    <div className="order_line">
                        <span className="order_line_label">Số tiền: </span>
                        <span className="order_line_value"><input type="text" name="amount" value={klass && info && (
                            (info[studentId].total_attendances - info[studentId].substract_attendances
                                - info[studentId].prev_subtract_attendances
                            ) * klass.amount
                        )} /></span>
                    </div>
                    <div className="order_line">
                        <span className="order_line_label">Kèm theo: </span>
                        <span className="order_line_value"><input type="text" name="additional" value={additional} onChange={(evt: any) => setAdditional(evt.target.value)} /></span>
                        <span className="order_line_label">Chứng từ kế toán: </span>
                        <span className="order_line_value"><input type="text" name="invoiceNum" value={invoiceNum} onChange={(evt: any) => setInvoiceNum(evt.target.value)} /></span>
                    </div>
                </div>

                <div className="order_signature_wrapper">

                    <div className="order_signature">
                        <div className="order_signature_item">
                            <strong>Giám đốc</strong><br />
                            (Ký, họ tên, đóng dấu)<br />
                            <br />
                            <br />
                            <br />
                        </div>
                        <div className="order_signature_item">
                            <strong>Người nộp tiền</strong><br />
                            (Ký, họ tên)

                        </div>
                        <div className="order_signature_item">
                            <strong>Thủ quỹ</strong><br />
                            (Ký, họ tên)<br />
                            <br />
                            <br />
                            <br />
                            Phạm Thị Phương Thu
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
                <div className="order_footer"></div>
            </div>
            <div className="form_action">
                <input type="submit" value="Gửi" />
                <a href={"/Table/class/" + classId + "/detail/#tab-attendance"}>Quay lại</a>
            </div>
        </form>
    </>
}

export default FeeCreatePhieuThu;