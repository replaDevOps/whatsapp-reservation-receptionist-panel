import { useState } from "react";
import { Table, Tag, Avatar, Card, Typography, Flex, Popover, Dropdown, Button, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { BookingDetailNote } from "./BookingDetailNote";
import { bookingData } from "../../../../data";
import { NavLink } from "react-router-dom";
import { MySelect } from "../../../Forms";
import { CalendarCard } from "./CalendarCard";
import { CancelBooking } from "../modal";


const { Text } = Typography
const BookingSchedular = () => {

    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [ visible, setVisible ] = useState(false)
    const [ edititem, setEditItem ] = useState(false)
    const [ cancelbooking, setCancelBooking ] = useState(false)
    const serviceProviders = [
        { id: 1, name: "Sameh Amin", avatar: "👨‍💼" },
        { id: 2, name: "Muhammad Ali", avatar: "👨‍⚕️" },
        { id: 3, name: "Mahmdul Hasan", avatar: "👨‍🔧" },
        { id: 4, name: "Ali Shaan", avatar: "👨‍💻" },
        { id: 5, name: "Ajit", avatar: "👨‍🎨" },
    ];

    const getStatusConfig = (status) => {
        const configs = {
            completed: {
                color: "#52c41a",
                bgColor: "#E5F6E4",
                borderColor: "#17BA05",
                text: "Completed",
            },
            pending: {
                color: "#faad14",
                bgColor: "#fffbe6",
                borderColor: "#faad14",
                text: "Pending",
            },
            cancelled: {
                color: "#BA0508",
                bgColor: "#fff2f0",
                borderColor: "#BA0508",
                text: "Cancelled",
            },
            progress: {
                color: "#054DBA",
                bgColor: "#E3EBF7",
                borderColor: "#054DBA",
                text: "Progress",
            },
            "no-show": {
                color: "#05BAB5",
                bgColor: "#E3F6F6",
                borderColor: "#05BAB5",
                text: "No Show",
            },
        };
        return configs[status] || configs.pending;
    };

    const renderBookingCard = (booking, providerId, providerName) => {
        if (!booking) return null;

        const statusConfig = getStatusConfig(booking.status);

        const popoverContent = (
            <BookingDetailNote 
                data={booking}
                colorstatus={statusConfig?.color}
            />
        );

        return (
            <Popover
                key={providerId}
                content={popoverContent}
                title={booking?.service}
                trigger="click"
              >
                <Card
                    key={`${providerId}-${booking.service}`}
                    style={{
                        backgroundColor: statusConfig.bgColor,
                        border: `1px solid ${statusConfig.borderColor}`,
                        borderLeft: `4px solid ${statusConfig?.borderColor}`
                    }}
                    className="card-10"
                >
                    <Flex vertical gap={3}>
                        <Flex justify="space-between" align="flex-start">
                            <Text className="fs-12 fw-500">
                                {booking.service}
                            </Text>
                            {
                                booking?.status !== 'pending' ?
                                <Tag
                                    color={statusConfig.color}
                                    size="small"
                                    className="fs-10 m-0 radius-20"
                                >
                                    {statusConfig.text}
                                </Tag>
                                :
                                <Dropdown
                                    menu={{
                                        items: [
                                            { label: <NavLink className='fs-12' onClick={(e) => {e.preventDefault();e.stopPropagation(); setVisible(true);setEditItem({booking,providerName}) }}>Edit</NavLink>, key: '1' },
                                            { label: <NavLink className='fs-12' onClick={(e) => {e.preventDefault();e.stopPropagation(); setCancelBooking(true) }}>Cancelled</NavLink>, key: '3' },
                                        ],
                                    }}
                                >
                                    <Button className="radius-20 sm-pill h-auto fs-10 pending-dropdown-color"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {statusConfig.text}
                                        <DownOutlined className="fs-10" />
                                    </Button>
                                </Dropdown>
                            }
                        </Flex>
                        <Text className="fs-12 text-gray">
                            {booking.time}
                        </Text>
                    </Flex>
                </Card>
            </Popover>
        );
    };

    const columns = [
        {
            title: null,
            dataIndex: "timeSlot",
            key: "timeSlot",
            width: 300,
            render: (timeSlot) => (
                <Text className="fs-12">
                    {timeSlot}
                </Text>
            ),
        },
        ...serviceProviders.map((provider) => ({
            title: (
                <Flex align="center" justify="center" gap={10}>
                    <Avatar
                        size={32}
                        style={{
                            backgroundColor: "#1890ff",
                            marginBottom: "4px",
                        }}
                    >
                        {provider.avatar}
                    </Avatar>
                    <Text className="text-black fs-12 fw-500">
                        {provider.name}
                    </Text>
                </Flex>
            ),
            dataIndex: "bookings",
            key: provider.id,
            width: 400,
            render: (bookings) =>
                renderBookingCard(bookings[provider.id], provider.id,provider?.name),
        })),
    ];



    const formattedDate = currentDate.toDateString();
    const formattedKey = currentDate.toISOString().split("T")[0];

    // Filter appointments for the current date
    // const appointments = bookingData.filter(
    //     (a) => a.date === formattedKey
    // );

    // const dataSource = bookingData.map((time) => {
    //     const row = { key: time, time };
    //     serviceProviders.forEach((staff) => {
    //     row[staff] = appointments.filter(
    //         (a) => a.time === time && a.staff === staff
    //     );
    //     });
    //     return row;
    // });

    return (
        <Flex vertical gap={20}>
            <CalendarCard 
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                formattedDate={formattedDate}
                visible={visible}
                setVisible={setVisible}
                edititem={edititem}
                setEditItem={setEditItem}
            />
            <Card className="card-bg card-cs radius-12 border-gray">
                <Flex vertical gap={20}>
                    <Row gutter={[12, 12]}>
                        <Col span={24} md={12} lg={4}>
                            <MySelect
                                placeholder="Branch"
                                withoutForm
                                value={selectedBranch}
                                options={[{ id: 1, name: "Branch 01" }]}
                                onChange={(value) => setSelectedBranch(value)}
                            />
                        </Col>
                        <Col span={24} md={12} lg={4}>
                            <MySelect
                                placeholder="Select Service Provider"
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
                                placeholder="Select Service"
                                withoutForm
                                value={selectedService}
                                options={[
                                    { id: "Hair Cut", name: "Hair Cut" },
                                    { id: "Pedicure", name: "Pedicure" },
                                    { id: "Massage", name: "Massage" },
                                ]}
                                onChange={(value) => setSelectedService(value)}
                            />
                        </Col>
                    </Row>   
                    <Table
                        columns={columns}
                        dataSource={bookingData}
                        pagination={false}
                        size="small"
                        bordered
                        scroll={{ x: 1200 }}
                        className="bg-white"
                    />
                </Flex>
            </Card>
            <CancelBooking 
                visible={cancelbooking}
                onClose={()=>setCancelBooking(false)}
            />
        </Flex>
    );
};

export {BookingSchedular};
