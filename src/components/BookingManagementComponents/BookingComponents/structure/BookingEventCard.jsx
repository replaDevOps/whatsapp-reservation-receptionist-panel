import moment from "moment";
import { Tag, Flex, Popover, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { BookingDetailNote } from "./BookingDetailNote";

const { Text } = Typography
const BookingEventCard = ({ event }) => {
    const booking = event?.booking
    if (!booking) return null;
    const statusColors = {
        completed: { bg: "#C7EEC3", color: "#17BA05" },
        cancelled: { bg: "#eec3c4", color: "#BA0508" },
        progress: { bg: "#CDDCF2", color: "#054DBA" },
        pending: { bg: "#F3E9CB", color: "#D2A82B" },
        "no-show": { bg: "#bdf1f1", color: "#05BAB5" }
    };

    const startTime = moment(event.start).format("hh:mm");
    const endTime = moment(event.end).format("hh:mm");
    const statusStyle = statusColors[booking.status] || {};
    return(
        <Popover
            trigger="click"
            placement="top"
            arrow={false}
            styles={{
                body:{
                    border: `2px solid ${statusStyle.color}`,
                    borderRadius: "10px",
                }
            }}
            content={
                <BookingDetailNote
                    data={booking}
                    colorstatus={statusColors[booking?.status]?.color}
                />
            }
            >
            <Flex vertical gap={5} className="h-100 w-100">
                <Flex justify="space-between" align="center">
                    <Text className="fs-13 fw-500">{booking?.service}</Text>
                    <Tag
                        color={statusColors[booking?.status]?.bg}
                        style={{ color: statusColors[booking.status]?.color }}
                        className="radius-20 fs-11"
                    >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Tag>
                </Flex>
                <Flex align="center" gap={5}>
                    <ClockCircleOutlined className="text-gray fs-12" />
                    <Text className="fs-12 text-gray">
                        {startTime} - {endTime}
                    </Text>
                </Flex>
            </Flex>
        </Popover>
    );
  
}

export {BookingEventCard}