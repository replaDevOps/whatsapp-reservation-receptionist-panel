import moment from "moment";
import { Tag, Flex, Popover, Typography, Dropdown, Button, Tooltip } from "antd";
import { ClockCircleOutlined, DownOutlined } from "@ant-design/icons";
import { BookingDetailNote } from "./BookingDetailNote";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { CancelBooking } from "../modal";
import { useTranslation } from "react-i18next";
const { Text } = Typography
const BookingEventCard = ({ event, setBookedEvent, setEditEvent }) => {
    const {t} = useTranslation();
    const [ cancelledevent, setCancelledEvent ] = useState(false)
    const booking = event?.booking
    if (!booking) return null;
    const statusColors = {
        completed: { bg: "#C7EEC3", color: "#17BA05" },
        cancelled: { bg: "#eec3c4", color: "#BA0508" },
        "in-progress": { bg: "#CDDCF2", color: "#054DBA" },
        pending: { bg: "#F3E9CB", color: "#D2A82B" },
        "no-show": { bg: "#bdf1f1", color: "#05BAB5" }
    };

    const startTime = moment(event.start).format("hh:mm");
    const endTime = moment(event.end).format("hh:mm");
    const statusStyle = statusColors[booking.status] || {};
    return(
        <>
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
                        {
                            booking?.status !== 'pending' ?
                            <Tag
                                color={statusColors[booking?.status]?.bg}
                                style={{ color: statusColors[booking.status]?.color }}
                                className="radius-20 fs-11"
                            >
                                {t(booking.status.charAt(0).toUpperCase() + booking.status.slice(1))}
                            </Tag>
                            :
                            <Dropdown
                                menu={{
                                    items: [
                                        { label: <NavLink className='fs-12' onClick={(e) => {e.preventDefault();e.stopPropagation();setBookedEvent(true);setEditEvent(event)}}>{t('Reschedule')}</NavLink>, key: '1' },
                                        { label: <NavLink className='fs-12' onClick={(e) => {e.preventDefault();e.stopPropagation(); setCancelledEvent(true)}}>{t('Cancelled')}</NavLink>, key: '2' },
                                        { label: <NavLink className='fs-12' onClick={(e) => {e.preventDefault();e.stopPropagation();}}>{t('No Show')}</NavLink>, key: '3' },
                                    ],
                                }}
                            >
                                <Button className="radius-20 border-0 sm-pill h-auto fs-10 pending-dropdown-color"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    <DownOutlined className="fs-10" />
                                </Button>
                            </Dropdown>
                        }
                    </Flex>
                    <Flex align="center" gap={5}>
                        <ClockCircleOutlined className="text-gray fs-12" />
                        <Text className="fs-12 text-gray">
                            {startTime} - {endTime}
                        </Text>
                    </Flex>
                    <Flex justify="end">
                        {
                            booking?.status === 'pending' &&
                            <Tooltip
                                title='Need to notify'
                                styles={{body:{fontSize: 11,minHeight: 15,padding: '4px 6px',}}}
                            >
                                <img src="/assets/icons/notify-need.webp" alt="notify need icon" width={22} />
                            </Tooltip>
                        }
                    </Flex>
                </Flex>
            </Popover>

            <CancelBooking 
                visible={cancelledevent}
                onClose={()=>setCancelledEvent(false)}
            />
        </>
    );
  
}

export {BookingEventCard}