import { Button, Col, Flex, Row, Typography } from 'antd'
import { StatisticsCommonCards, TodaysBooking } from '../../components';
import { useState } from 'react';

const { Title } = Typography
const Dashboard = () => {
  const [renewvisible, setRenewVisible] = useState(false)
  const [renewstate, setRenewState] = useState(null)

  const cardsData = [
    {
      id: 1,
      icon: '/assets/icons/total-booking-w.webp',
      title: '6,784',
      subtitle: 'Total Bookings',
    },
    {
      id: 2,
      icon: '/assets/icons/manual-booking.webp',
      title: '6,784',
      subtitle: 'Today’s  Manual Bookings ',
    },
    {
      id: 3,
      icon: '/assets/icons/whatsapp-booking.webp',
      title: '6,784',
      subtitle: 'Today’s WhatsApp Bookings',
    },
    {
      id: 4,
      icon: '/assets/icons/cancel-booking.webp',
      title: '678',
      subtitle: 'Today’s Cancelled Bookings',
    },
  ];

  return (
    <div>
      <Flex vertical gap={24}>
        <Flex justify='space-between' align='center'>
          <Title level={4} className='m-0'>Hi Receptionist Name!</Title>
          <Button className='btncancel'>
            Branch 1
          </Button>
        </Flex>
        <StatisticsCommonCards data={cardsData} />
        <TodaysBooking/>
      </Flex>
    </div>
  )
}

export { Dashboard }