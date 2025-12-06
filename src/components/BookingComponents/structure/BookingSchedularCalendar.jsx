import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Avatar, Card, Typography, Flex, Row, Col, notification } from "antd";
import "antd/dist/reset.css";
import { MySelect } from "../../Forms";
import { CalendarCard } from "./CalendarCard";
import { myeventsData } from "../../../data";
import { BookingEventCard } from "./BookingEventCard";
import { AddEditBooking } from "../modal";
import { useTranslation } from "react-i18next";
import { GET_BOOKINGS } from "../../../graphql/query/booking";
import { useLazyQuery } from "@apollo/client/react";
import { getBranchId } from "../../../utils/auth";
const localizer = momentLocalizer(moment);

const users = [
    { id: 1, name: "John", avatar: "https://i.pravatar.cc/40?img=1" },
    { id: 2, name: "Mark", avatar: "https://i.pravatar.cc/40?img=2" },
    { id: 3, name: "Emma", avatar: "https://i.pravatar.cc/40?img=3" },
    { id: 4, name: "Ali", avatar: "https://i.pravatar.cc/40?img=1" },
    { id: 5, name: "Arbaz", avatar: "https://i.pravatar.cc/40?img=2" },
    { id: 6, name: "Ahmad", avatar: "https://i.pravatar.cc/40?img=3" },
];

const eventStyleGetter = (event) => {
    let backgroundColor = "";
    let borderColor = "";
    switch (event.status) {
        case "COMPLETED":
            backgroundColor = "#E5F6E4";
            borderColor = "#17BA05";
            break;
        case "CANCELLED":
            backgroundColor = "#F6E3E5";
            borderColor = "#BA0508";
            break;
        case "SCHEDULED":
            backgroundColor = "#E3EBF7";
            borderColor = "#054DBA";
            break;
        case "PENDING":
            backgroundColor = "#F8F4E8";
            borderColor = "#D2A82B";
            break;
        default:
            backgroundColor = "#E3F6F6";
            borderColor = "#05BAB5";
    }
    return {
        style: {
            backgroundColor,
            borderRadius: "8px",
            border: "none",
            fontSize: "14px",
            padding: "10px",
            borderLeft: "4px solid",
            borderColor,
        },
    };
};

const { Text } = Typography;
const ResourceHeader = ({ resource }) => (
    <Flex vertical align="center" className="py-3">
        <Avatar src={resource.avatar} size={44} />
        <Text className="fs-13 fw-400">{resource?.name}</Text>
    </Flex>
);

const BookingSchedularCalendar = () => {
    // const [events] = useState(myeventsData);
    const [bookedevent, setBookedEvent] = useState(false);
    const [editevent, setEditEvent] = useState(null);
    const [selectedProvider, setSelectedProvider] = useState(1);
    const [selectedService, setSelectedService] = useState("Hair Cut");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [api, contextHolder] = notification.useNotification();
    const [getAppointments, { data: appointData, loading: appointLoading,refetch }] =
    useLazyQuery(GET_BOOKINGS, { fetchPolicy: "network-only" });
    const {t} = useTranslation();
    const serviceProviders = [
        { id: 1, name: "Sameh Amin" },
        { id: 2, name: "Muhammad Ali" },
        { id: 3, name: "Mahmdul Hasan" },
        { id: 4, name: "Ali Shaan" },
        { id: 5, name: "Ajit" },
    ];

    const formattedDate = currentDate.toDateString();

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        getAppointments({
            variables: {
                consumerId: null,
                serviceId: null,
                branchId: getBranchId()
            }
        });
    }, []);

    useEffect(() => {
        if (appointData?.getAppointments) {
            setAppointments(appointData.getAppointments);
        }
    }, [appointData]);


    const normalizedEvents = appointments
    .map((ev) => {
        if (!ev.appointmentTime) return null;
        const startDate = new Date(ev.appointmentTime);
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

        return {
            id: ev.id,
            start: startDate,
            end: endDate,
            resourceId: 1,
            status: ev.status || "PENDING",
            firstName: ev.consumer?.firstName,
            lastName: ev.consumer?.lastName,
            phone: ev.consumer?.phone,
            consumer: ev.consumer,
            service: ev.service?.name,
            note: ev.note,
            promoCode: ev.promoCode,
            appointmentTimeSlot: ev.appointmentTimeSlot,
            appointmentDate: ev.appointmentDate,
            appointmentTime: ev.appointmentTime
        };
    })
    .filter(Boolean);


    return (
        <>
            {contextHolder}
            <Card className="radius-12 card-cs border-gray h-100">
                <Flex vertical gap={20}>
                    <CalendarCard
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                        formattedDate={formattedDate}
                        setBookedEvent={setBookedEvent}
                    />
                    <Row gutter={[12, 12]}>
                        <Col span={24} md={12} lg={4}>
                            <MySelect
                                placeholder={t('Select Service Provider')}
                                withoutForm
                                value={selectedProvider}
                                options={serviceProviders.map((p) => ({
                                    id: p.id,
                                    name: p.name,
                                }))}
                                onChange={(value) => setSelectedProvider(value)}
                            />
                        </Col>
                        <Col span={24} md={12} lg={4}>
                            <MySelect
                                placeholder={t('Select Service')}
                                withoutForm
                                value={selectedService}
                                options={[
                                    { id: "Hair Cut", name: t('Hair Cut') },
                                    { id: "Pedicure", name: t('Pedicure') },
                                    { id: "Massage", name: t('Massage') },
                                ]}
                                onChange={(value) => setSelectedService(value)}
                            />
                        </Col>
                    </Row>
                    <Calendar
                        localizer={localizer}
                        events={normalizedEvents}
                        date={currentDate}
                        defaultView="day"
                        views={["day"]}
                        step={60}
                        timeslots={1}
                        // defaultDate={new Date(2025, 10, 12)}
                        eventPropGetter={eventStyleGetter}
                        components={{
                            event: ({ event }) => (
                                <BookingEventCard
                                    event={event}
                                    setBookedEvent={setBookedEvent}
                                    setEditEvent={setEditEvent}
                                />
                            ),
                            resourceHeader: ResourceHeader,
                        }}
                        resources={users}
                        resourceIdAccessor="id"
                        resourceTitleAccessor="name"
                        formats={{
                            eventTimeRangeFormat: () => "",
                        }}
                        showMultiDayTimes={false}
                        toolbar={false}
                        selectable
                        onSelectSlot={() => {
                            setBookedEvent(true);
                        }}
                        className="booking-calendar"
                    />
                </Flex>
            </Card>

            <AddEditBooking
                visible={bookedevent}
                edititem={editevent}
                onClose={() => {
                    setBookedEvent(false);
                    setEditEvent(null);
                }}
                loading={appointLoading}
                refetch={refetch}
            />
        </>
    );
};

export { BookingSchedularCalendar };
