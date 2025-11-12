import { Flex, Tag, Typography } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";
const { Text } = Typography
const StaffEventCard = ({ event }) => {
    const {t}= useTranslation();
    if (!event) return null;
    const statusColors = {
        accepted: { bg: "#C4E6C8",color:"#008F17" },
        rejected: { bg: "#FFD2CF", color:"#FF3B30" },
        pending: { bg: "#F7DDC4", color:"#DB6E00" },
    };
    const startDate = moment(event.start).format("MM/DD/YYYY");
    const endDate = moment(event.end).format("MM/DD/YYYY");
    const isMultiDay = !moment(event.start).isSame(event.end, "day");
    return(
        <Flex gap={20} vertical justify="end" className="h-100" align="end">
            <Tag
                color={statusColors[event?.status]?.bg}
                style={{ color: statusColors[event.status]?.color }}
                className="radius-20 fs-11"
            >
                {t(event.status.charAt(0).toUpperCase() + event.status.slice(1))}
            </Tag>
            <Flex 
                gap={5}
                align="center"
                className="radius-4 p-1 w-100"
                style={{ background: statusColors[event.status]?.color }}
            >
                <img src="/assets/icons/ev-date.webp" width={12} alt="event calendar icon" fetchPriority="high" />
                {isMultiDay ? (
                <Text className="fs-13 fw-500 text-white">
                    {startDate} → {endDate}
                </Text>
                ) : (
                <Text className="fs-13 fw-500 text-white">{startDate}</Text>
                )}
            </Flex>
        </Flex>
    );
  
}

export {StaffEventCard}