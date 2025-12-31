import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Avatar, Card, Typography, Flex, Button, Spin } from "antd";
import "antd/dist/reset.css";
import { ModuleTopHeading } from "../../PageComponent";
import { BookingEventCard } from "../../BookingComponents";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../../utils";
import dayjs from "dayjs";
import { useLazyQuery } from "@apollo/client/react";
import { GET_BOOKINGS } from "../../../graphql/query";
import { getBranchId } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";
import { TableLoader } from "../../../shared";
const localizer = momentLocalizer(moment);

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

const TodaysBooking = () => {
    const navigate = useNavigate()
    const [bookedevent, setBookedEvent] = useState(false);
    const [editevent, setEditEvent] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [getAppointments, { data: appointData, loading: appointLoading,refetch }] =
    useLazyQuery(GET_BOOKINGS, { fetchPolicy: "network-only" });
    const {t} = useTranslation();
    
    const[serviceProviders,setServiceProviders]= useState([])
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
            setAppointments(appointData?.getAppointments?.appointments)
            const result =  appointData?.getAppointments?.appointments?.map(item => (
                {
                    id: item.serviceProvider?.id,
                    name: `${item.serviceProvider?.firstName} ${item.serviceProvider?.lastName}`,
                    avatar: item.serviceProvider?.imageUrl
                }
            ))
            setServiceProviders(removeDuplicates(result))
        }
    }, [appointData])

    function removeDuplicates(arr) {
        return [...new Map(arr.map(item => [item.id, item])).values()];
    }
 
    const normalizedEvents = appointments
    .map((ev) => {
        if (!ev.appointmentTime) return null;
        const startDate = new Date(formatDateTime(ev?.appointmentTime))
        const endDate = new Date(dayjs(startDate).add(ev?.service?.duration, 'minutes').format('YYYY-MM-DDTHH:mm'))

        return {
            id: ev.id,
            start: startDate,
            end: endDate,
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
            appointmentTime: ev.appointmentTime,
            resourceId: ev.serviceProvider?.id
        };
    })
    .filter(Boolean);
    return (
        <>
            <Flex vertical gap={20}>
                <Card className="radius-12 card-cs border-gray h-100 position-relative">
                    <Flex vertical gap={20}>
                        <Flex justify="space-between" gap={30}>
                            <Flex vertical align="center">
                                <ModuleTopHeading level={4} name={t("Today’s Bookings")} />
                                <Text className="text-gray fs-13">{t('Today’s Incoming Bookings')}</Text>
                            </Flex>
                            <Button onClick={() => navigate("/booking")}>{t('View Calendar')}</Button>
                        </Flex>
                        {/* {appointLoading && (
                            <Flex justify="center" align="center" className="h-100 w-100 loading">
                                <Spin {...TableLoader} size="large" />
                            </Flex>
                        )} */}
                        <Calendar
                            localizer={localizer}
                            events={normalizedEvents}
                            date={currentDate}
                            defaultView="day"
                            views={["day"]}
                            step={60} //each slot is 60 mins
                            timeslots={1} //1 hr gap between slots
                            eventPropGetter={eventStyleGetter}
                            components={{
                                event: ({ event }) => (
                                    <BookingEventCard
                                        event={event}
                                        setBookedEvent={setBookedEvent}
                                        setEditEvent={setEditEvent}
                                        refetch={refetch}
                                    />
                                ),
                                resourceHeader: ResourceHeader,
                            }}
                            resources={serviceProviders}
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
            </Flex>
        </>
    );
};

export { TodaysBooking };
