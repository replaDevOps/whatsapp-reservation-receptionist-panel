import moment from "moment";
import { Tag, Flex, Popover, Typography, Dropdown, Button, Tooltip } from "antd";
import { ClockCircleOutlined, DownOutlined } from "@ant-design/icons";
import { BookingDetailNote } from "./BookingDetailNote";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { CancelBooking } from "../modal";
import { useTranslation } from "react-i18next";
import { onlyTime } from "../../../utils";

const { Text } = Typography
const BookingEventCard = ({ event, setBookedEvent, setEditEvent }) => {
    const { t } = useTranslation();
    const [cancelledevent, setCancelledEvent] = useState(false);

    // Use event fields directly
    const statusColors = {
        COMPLETED: { bg: "#C7EEC3", color: "#17BA05" },
        CANCELLED: { bg: "#eec3c4", color: "#BA0508" },
        SCHEDULED: { bg: "#CDDCF2", color: "#054DBA" },
        PENDING: { bg: "#F3E9CB", color: "#D2A82B" },
        NO_SHOW: { bg: "#bdf1f1", color: "#05BAB5" }
    };

    const startTime = onlyTime(event.start);
    const endTime = onlyTime(event.end);
    const statusStyle = statusColors[event.status] || {};
console.log("event:", event)
    return (
        <>
            <Popover
                trigger="click"
                placement="top"
                arrow={false}
                content={
                    <BookingDetailNote
                        data={event}
                        colorstatus={statusColors[event.status]?.color}
                    />
                }
            >
                <Flex vertical gap={5} className="h-100 w-100">
                    <Flex justify="space-between" align="center">
                        <Text className="fs-13 fw-500">{event.service}</Text>

                        {event.status !== "PENDING" ? (
                            <Tag
                                color={statusColors[event.status]?.bg}
                                style={{ color: statusColors[event.status]?.color }}
                                className="radius-20 fs-11"
                            >
                                {t(event.status.charAt(0).toUpperCase() + event.status.slice(1))}
                            </Tag>
                        ) : (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            label: (
                                                <NavLink
                                                    className="fs-12"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setBookedEvent(true);
                                                        setEditEvent(event);
                                                    }}
                                                >
                                                    {t("Reschedule")}
                                                </NavLink>
                                            ),
                                            key: "1",
                                        },
                                        {
                                            label: (
                                                <NavLink
                                                    className="fs-12"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setCancelledEvent(event?.id)
                                                    }}
                                                >
                                                    {t("Cancelled")}
                                                </NavLink>
                                            ),
                                            key: "2",
                                        },
                                        {
                                            label: (
                                                <NavLink
                                                    className="fs-12"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    {t("No Show")}
                                                </NavLink>
                                            ),
                                            key: "3",
                                        },
                                    ],
                                }}
                            >
                                <Button
                                    className="radius-20 border-0 sm-pill h-auto fs-10 pending-dropdown-color"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {t(event.status.charAt(0).toUpperCase() + event.status.slice(1))}
                                    <DownOutlined className="fs-10" />
                                </Button>
                            </Dropdown>
                        )}
                    </Flex>

                    <Flex align="center" gap={5}>
                        <ClockCircleOutlined className="text-gray fs-12" />
                        <Text className="fs-12 text-gray">
                            {startTime} - {endTime}
                        </Text>
                    </Flex>
                </Flex>
            </Popover>

            <CancelBooking
                visible={cancelledevent}
                onClose={() => setCancelledEvent(false)}
            />
        </>
    );
};

export {BookingEventCard}