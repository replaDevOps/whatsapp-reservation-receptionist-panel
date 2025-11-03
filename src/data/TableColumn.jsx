import { Avatar, Button, Dropdown, Flex, Rate, Tag, Tooltip, Typography } from "antd";
import { NavLink } from "react-router-dom";

const { Text } = Typography

const customerColumn = ( {setAddModal} ) =>  [
    {
        title: 'Customer Name',
        dataIndex: 'customerName',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNo',
    },
    {
        title: 'Total Bookings',
        dataIndex: 'totalBooking',
    },
    {
        title: 'Last Bookings',
        dataIndex: 'lastBooking',
    },
    {
        title: 'Action',
        key: "action",
        fixed: "right",
        width: 100,
        render: (_,row) => (
            <Dropdown
                menu={{
                    items: [
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setAddModal(true)}}>Add Booking</NavLink>, key: '1' },
                    ],
                }}
                trigger={['click']}
            >
                <Button className="bg-transparent border-0 p-0">
                    <img src="/assets/icons/dots.webp" alt='dots icon' fetchPriority="high" width={16} />
                </Button>
            </Dropdown>
        ),
    },
];

export { 
    customerColumn
}