import { Tag, Flex, Popover, Typography, Dropdown, Button, Tooltip } from "antd";
import { ClockCircleOutlined, DownOutlined } from "@ant-design/icons";
import { BookingDetailNote } from "./BookingDetailNote";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { CancelBooking } from "../modal";
import { useTranslation } from "react-i18next";
import { onlyTime } from "../../../utils";
import { useMutation } from "@apollo/client/react";
import { notifyError, notifySuccess } from "../../../shared";
import { UPDATE_APPOINTMENT } from "../../../graphql/mutation/booking";

const { Text } = Typography
const BookingEventCard = ({ event, setBookedEvent, api, setEditEvent, refetch }) => {
    const { t } = useTranslation();
    const [cancelledevent, setCancelledEvent] = useState(false);
    const [reason, setReason] = useState(null)
    const [updateStatus, { loading } ] = useMutation(UPDATE_APPOINTMENT,{
        onCompleted: () => {notifySuccess(api,t("Booking Status Update"),t("Booking status updated successfully"),()=> {refetch()})},
        onError: (error) => {notifyError(api, error);},
    })
    const handleCancelAppointment = async({id,status,cancelReason}) => {
        const input = {
            id: id,
            status: status,
            cancelReason: cancelReason ? cancelReason: null 
        }
        console.log('Appointment Status', input)
        // return;
        await updateStatus(
            {variables: {input}
        })
    }
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
                        <Text className="fs-13 fw-500">{event.service?.name}</Text>

                        {event.status !== "PENDING" ? (
                            <Tag
                                color={statusColors[event.status]?.bg}
                                style={{ color: statusColors[event.status]?.color }}
                                className="radius-20 fs-11"
                            >
                                {t(event.status.charAt(0).toUpperCase() + event.status.slice(1).toLowerCase())}
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
                                                        setCancelledEvent({id:event?.id, status: 'CANCELLED'})
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
                                                    onClick={(e) =>{
                                                        e.preventDefault()
                                                        e.stopPropagation();
                                                        handleCancelAppointment({id:event?.id, status: 'NO_SHOW'})
                                                    }}
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
                                    {t(event.status.charAt(0).toUpperCase() + event.status.slice(1)?.toLowerCase())}
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
                onClose={() => setCancelledEvent(null)}
                loading={loading}
                t={t}
                setReason={setReason}
                onConfirm={()=>handleCancelAppointment({id: cancelledevent?.id,status:cancelledevent?.status, cancelReason: reason})}
                refetch={refetch}
            />
        </>
    );
};

export {BookingEventCard}