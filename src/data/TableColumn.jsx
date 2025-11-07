import { Button, Dropdown, Typography } from "antd";
import { NavLink } from "react-router-dom";
const { Text } = Typography
import { useTranslation } from "react-i18next";
import { toArabicDigits } from "../shared";
const customerColumn = ( {setAddModal} ) =>  {
    const {t,i18n} = useTranslation();
    const isArabic = i18n.language === "ar";

    return [
    {
        title: t('Customer Name'),
        dataIndex: 'customerName',
    },
    {
        title: t('Phone Number'),
        dataIndex: 'phoneNo',
    },
    {
        title: t('Total Bookings'),
        dataIndex: 'totalBooking',
        render:(totalBooking)=> isArabic ? toArabicDigits(totalBooking) : totalBooking
    },
    {
        title: t('Last Bookings'),
        dataIndex: 'lastBooking',
    },
    {
        title: t('Action'),
        key: "action",
        fixed: "right",
        width: 100,
        render: (_,row) => (
            <Dropdown
                menu={{
                    items: [
                        { label: <NavLink onClick={(e) => {e.preventDefault(); setAddModal(true)}}>{t('Add Booking')}</NavLink>, key: '1' },
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
}

export { 
    customerColumn
}