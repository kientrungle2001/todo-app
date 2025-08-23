import React, { useEffect, useState } from "react";
import { TableGridDetail } from "@/types/detail/TableGridDetail";
import { QlhsGridClassPaymentPeriodSettings } from "@/api/settings/qlhs/QlhsGridClassPaymentPeriodSettings";
import { QlhsGridClassScheduleSettings } from "@/api/settings/qlhs/QlhsGridClassScheduleSettings";
import { classRepository } from "@/api/repositories/ClassRepository";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { vi } from "date-fns/locale/vi";
import "react-big-calendar/lib/css/react-big-calendar.css";

interface ClassCalendarProps {
    classId: number;
    detail: TableGridDetail;
}

const ClassCalendar: React.FC<ClassCalendarProps> = ({ classId, detail }) => {
    const [periods, setPeriods] = useState<any[]>([]);
    const [schedules, setSchedules] = useState<any[]>([]);
    const [classEvents, setClassEvents] = useState<any[]>([]);
    const [selectedPeriodId, setSelectedPeriodId] = useState<number | string>("");
    const [currentDate, setCurrentDate] = useState<Date>(new Date()); // 👈 controlled date

    useEffect(() => {
        if (detail.settings) {
            const periodSettings = QlhsGridClassPaymentPeriodSettings;
            classRepository.getPaymentPeriods(periodSettings, classId).then((resp: any) => {
                setPeriods(resp.data.items);
            });
        }
    }, [classId, detail.settings]);

    useEffect(() => {
        if (selectedPeriodId) {
            loadSchedule(selectedPeriodId);
        } else {
            setSchedules([]);
            setClassEvents([]);
        }
    }, [selectedPeriodId]);

    useEffect(() => {
        const events: any[] = [];
        schedules.forEach((schedule: any) => {
            const currentTime = new Date(`${schedule.studyDate} ${schedule.studyTime}`);
            const next2Hours = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);
            events.push({
                title: format(currentTime, "dd/MM/yyyy HH:mm", { locale: vi }), // tiêu đề theo định dạng Việt Nam
                start: currentTime,
                end: next2Hours,
            });
        });

        // sắp xếp theo thời gian bắt đầu tăng dần (không bắt buộc nhưng ổn định)
        events.sort((a, b) => a.start.getTime() - b.start.getTime());
        setClassEvents(events);

        // cập nhật tháng/ngày hiển thị tới sự kiện sớm nhất (nếu có)
        if (events.length > 0) {
            setCurrentDate(events[0].start);
        }
    }, [schedules]);

    function loadSchedule(selectedPeriodId: string | number) {
        const selectedPeriod = periods.find(
            (period) => selectedPeriodId == period.paymentPeriodId[0].id
        );
        if (!selectedPeriod) return;

        const { startDate, endDate } = selectedPeriod;
        const scheduleSettings = QlhsGridClassScheduleSettings;
        classRepository
            .getSchedules(scheduleSettings, classId, startDate, endDate)
            .then((resp: any) => {
                setSchedules(resp.data.items);
            });
    }

    const locales = { vi };

    // Cấu hình localizer
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <h1>{detail.label}</h1>
                <div style={{ width: "20rem" }}>
                    <select
                        className="form-select"
                        value={selectedPeriodId}
                        onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => {
                            setSelectedPeriodId(evt.target.value);
                        }}
                    >
                        <option value={""}>Chọn kỳ học phí</option>
                        {periods.map((period) => {
                            return (
                                <option
                                    key={"period-" + period.id}
                                    value={period.paymentPeriodId[0].id}
                                >
                                    {period.paymentPeriodName}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>

            <Calendar
                localizer={localizer}
                culture="vi"                  // dùng locale tiếng Việt
                events={classEvents}
                defaultView="month"
                date={currentDate}            // 👈 controlled date
                onNavigate={(date) => setCurrentDate(date)} // 👈 bắt buộc khi dùng prop `date`
                views={["month", "week", "day", "agenda"]}
                step={30}
                timeslots={2}
                style={{ height: 600 }}
                messages={{
                    week: "Tuần",
                    day: "Ngày",
                    month: "Tháng",
                    agenda: "Danh sách",
                    today: "Hôm nay",
                    previous: "Trước",
                    next: "Sau",
                    noEventsInRange: "Không có sự kiện nào",
                    showMore: (total) => `+${total} sự kiện`,
                }}
            />
        </>
    );
};

export default ClassCalendar;
