import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Avatar, Card, Typography, Flex, Row, Col, notification, Spin } from "antd";
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
import { formatDateTime } from "../../../utils";
import dayjs from "dayjs";
import { TableLoader } from "../../../shared";
import { GET_SERVICE_BY_SERVICE_PROVIDER } from "../../../graphql/query/lookupsquery";
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
            padding: "4px 6px",
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
    const [bookedevent, setBookedEvent] = useState(false);
    const [editevent, setEditEvent] = useState(null);
    const [ selectedProvider, setSelectedProvider ] = useState(null)
    const [ selectedService, setSelectedService ] = useState(null)
    const [currentDate, setCurrentDate] = useState(new Date());
    const [api, contextHolder] = notification.useNotification();
    const [getAppointments, { data: appointData, loading: appointLoading }] = useLazyQuery(GET_BOOKINGS, 
        { fetchPolicy: "network-only" }
    );
    const [ getServiceLookups, {data: lookupService} ] = useLazyQuery(GET_SERVICE_BY_SERVICE_PROVIDER)
    const {t} = useTranslation();
    
    const[serviceProviders,setServiceProviders]= useState([])

    const formattedDate = currentDate.toDateString();

    const [appointments, setAppointments] = useState([]);

    const fetchBooking = () =>{
        return(
            getAppointments({
                variables: {
                    serviceProviderId: selectedProvider,
                    serviceId: selectedService,
                    branchId: getBranchId()
                }
            })
        )
    }

    useEffect(() => {
        fetchBooking()
    }, [fetchBooking,selectedProvider,selectedService]);
    
    useEffect(() => {
        if (appointData?.getAppointments) {
            setAppointments(appointData.getAppointments?.appointments)
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
    
    useEffect(() => {
        if (!selectedProvider) return;
        getServiceLookups({
            variables: { providerId: selectedProvider }
        });
    }, [selectedProvider, getServiceLookups]);
 
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
            consumer: ev.consumer, 
            service: ev.service,
            note: ev.note,
            reason: ev.cancelReason,
            promoCode: ev.promotion,
            appointmentTimeSlot: ev.appointmentTimeSlot,
            appointmentDate: ev.appointmentDate,
            appointmentTime: ev.appointmentTime,
            resourceId: ev.serviceProvider?.id,
            serviceProviders: ev.serviceProvider,
            reminderMinutesBefore: ev.reminderMinutesBefore,
            bookingType: ev.bookingType,
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
                                allowClear
                            />
                        </Col>
                        <Col span={24} md={12} lg={4}>
                            <MySelect
                                placeholder={t('Select Service')}
                                withoutForm
                                value={selectedService}
                                options={lookupService?.getServicesByProvider?.services}
                                onChange={(value) => setSelectedService(value)}
                                allowClear
                            />
                        </Col>
                    </Row>
                    <div className="position-relative">
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
                            dayLayoutAlgorithm="no-overlap"
                            popup={true}
                            components={{
                                event: ({ event }) => (
                                    <BookingEventCard
                                        event={event}
                                        setBookedEvent={setBookedEvent}
                                        setEditEvent={setEditEvent}
                                        refetch={()=>fetchBooking()}
                                        api={api}
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
                    </div>
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
                refetch={()=>fetchBooking()}
            />
        </>
    );
};

export { BookingSchedularCalendar };
