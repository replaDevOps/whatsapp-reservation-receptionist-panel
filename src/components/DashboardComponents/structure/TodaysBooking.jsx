import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Avatar, Card, Typography, Flex, Row, Col, Button } from "antd";
import "antd/dist/reset.css";
import { BookingEventCard } from "../../BookingManagementComponents";
import { myeventsData } from "../../../data";
import { ModuleTopHeading } from "../../PageComponent";
import { useNavigate } from "react-router-dom";

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
        case "completed":
            backgroundColor = "#E5F6E4";
            borderColor = "#17BA05";
            break;
        case "cancelled":
            backgroundColor = "#F6E3E5";
            borderColor = "#BA0508";
            break;
        case "progress":
            backgroundColor = "#E3EBF7";
            borderColor = "#054DBA";
            break;
        case "pending":
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
    const [events] = useState(myeventsData);
    const [currentDate, setCurrentDate] = useState(new Date());

    const formattedDate = currentDate.toDateString();

    const normalizedEvents = events.map((ev) => ({
      ...ev,
      booking: ev.booking[0],
      status: ev.booking[0]?.status,
    }));

    const naigate = useNavigate();
    
    return (
      <Flex vertical gap={20}>
        <Card>
          <Flex vertical gap={20}>
            <Row gutter={[12, 12]}>
                <Col span={24}>
                <Flex justify="space-between" gap={30}>
                    <Flex vertical align="center">
                        <ModuleTopHeading level={4} name='Today’s Bookings' />
                        <Text className='text-gray fs-13'>Today’s Incoming Bookings</Text>
                    </Flex>
                    <Button onClick={()=>naigate('/booking')}>View Calendar</Button>
                </Flex>
                </Col>
            </Row>
            <Calendar
                localizer={localizer}
                events={normalizedEvents}
                defaultView="day"
                views={["day"]}
                step={60}
                timeslots={1}
                defaultDate={new Date(2025, 8, 15)}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: BookingEventCard,
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
            />
          </Flex>
        </Card>
      </Flex>
    );
};

export { TodaysBooking };
