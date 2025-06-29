'use client';

import { tableRepository } from "@/api/repositories/Table";
import { useEffect, useState } from "react";
interface FeeCreateFormProps {
    classId: string | number;
    studentId: string | number;
    periodId: string | number;
}

const FeeCreateForm: React.FC<FeeCreateFormProps> = ({ classId, studentId, periodId }) => {
    const [klass, setKlass] = useState<any>();
    const [student, setStudent] = useState<any>();
    const [period, setPeriod] = useState<any>();
    useEffect(() => {
        tableRepository.get('classes', parseInt(classId as string)).then((resp: any) => {
            setKlass(resp.data);
        });
        tableRepository.get('student', parseInt(studentId as string)).then((resp: any) => {
            setStudent(resp.data);
        });
        tableRepository.get('payment_period', parseInt(periodId as string)).then((resp: any) => {
            setPeriod(resp.data);
        });
    }, [classId, studentId, periodId]);
    return <>
        <div className="p-3">
            <form method="post" action="http://www.phattrienngonngu.com/qlhs2/index.php/teacher/create_bill_post">
                <div className="order_wrapper">
                    <div className="order_header">
                        <div className="order_company">
                            <div className="order_line">
                                <span className="order_line_label">Đơn vị: </span>
                                <span className="order_line_value">CÔNG TY CP NEXT NOBELS</span>
                            </div>
                            <div className="order_line">
                                <span className="order_line_label">Địa chỉ: </span>
                                <span className="order_line_value">Số 6 ngõ 115 Nguyễn Khang - Cầu Giấy - Hà Nội</span>
                            </div>
                        </div>
                        <div className="order_date">
                            <div className="order_line">
                                <strong className="order_line_label order_line_label_header">Phiếu Chi</strong><br />
                                <span className="order_line_value">Ngày <input className="easyui-datebox datebox-f combo-f" type="text" value="06/22/2025" /></span>
                            </div>
                        </div>
                        <div className="order_no">
                            Quyển số: <input className="easyui-numberbox numberbox-f validatebox-text" type="text" disabled /><input type="hidden" name="bookNum" value="" /><br />
                            Số: <input className="easyui-numberbox numberbox-f validatebox-text" type="text" disabled /><input type="hidden" name="noNum" value="" /><br />
                            Nợ: <input className="easyui-numberbox numberbox-f validatebox-text" type="text" /><input type="hidden" name="debit" value="" /><br />
                            Có: <input className="easyui-numberbox numberbox-f validatebox-text" type="text" /><input type="hidden" name="balance" value="" />
                        </div>
                        <div className="order_template">
                            Mẫu số: 02-TT<br />
                            QĐ số: 15/2006/QĐ-BTC<br />
                            ngày 20/3/2006 của Bộ trưởng BTC
                        </div>
                        <div className="clear"></div>
                    </div>
                    <br />
                    <div className="order_body">
                        <input type="hidden" name="partyType" value="teacher" />
                        <input type="hidden" name="teacherId" value="" />
                        <div className="order_line">
                            <span className="order_line_label">Họ, tên người nhận tiền: </span>
                            <span className="order_line_value"><input type="text" name="order_name" value={student && student.name} style={{width: "20rem"}} /></span>
                        </div>
                        <div className="order_line">
                            <span className="order_line_label">Địa chỉ: </span>
                            <span className="order_line_value"><input type="text" name="address" value={student && student.address} style={{width: "26rem"}} /></span>
                        </div>
                        <div className="order_line">
                            <span className="order_line_label">Số điện thoại: </span>
                            <span className="order_line_value"><input type="text" name="phone" value={student && student.phone} /></span>
                        </div>
                        <div className="order_line">
                            <span className="order_line_label">Lý do chi: </span>
                            <span className="order_line_value"><input type="text" name="reason" style={{width: "25rem"}} value={"Học phí " + (period && period.name)} /></span>
                        </div>
                        <div className="order_line">
                            <span className="order_line_label">Số tiền: </span>
                            <span className="order_line_value"><input type="text" name="total_amount" className="input_total_amount" /></span>
                            <span className="order_line_label">(Viết bằng chữ) </span>
                            <span className="order_line_value"><input type="text" name="total_amount_string" className="input_total_amount_string" style={{width: "14rem"}} /></span>
                        </div>
                        <div className="order_line">
                            <span className="order_line_label">Kèm theo: </span>
                            <span className="order_line_value"><input type="text" name="additional" /></span>
                            <span className="order_line_label">Chứng từ gốc: </span>
                            <span className="order_line_value"><input type="text" name="invoiceNum" /></span>
                            <span className="order_line_label">Đã nhận đủ số tiền (viết bằng chữ): </span>
                            <span className="order_line_value"><input type="text" name="confirm" style={{width: "29rem"}}/></span>
                        </div>
                    </div>
                    <br />
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
                                <strong>Người nhận tiền</strong><br />
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
                    <div className="order_footer">
                        <p>Đã nhận đủ số tiền (viết bằng chữ): .........................................................................</p>
                        <p>+ Tỉ giá ngoại tệ(vàng, bạc, đá quý): .......................................................................</p>
                        <p>+ Số tiền quy đổi: ..........................................................................................</p>
                    </div>
                </div>
                <input type="submit" value="Gửi" />
            </form>
        </div>
    </>
}

export default FeeCreateForm;