import { Col, Flex, Row, Typography } from 'antd'
import { BookingCustomerBarChart, BookingLineChart, MostBookService, MostBookTable, StatisticsCommonCards } from '../../components';

const { Title } = Typography
const Dashboard = () => {

  const cardsData = [
      {
        id: 1,
        icon: '/assets/icons/totalbooking.webp',
        title: '6,784',
        subtitle: 'Total Bookings',
      },
      {
        id: 2,
        icon: '/assets/icons/cancel-booking.webp',
        title: '6,784',
        subtitle: 'Cancelled Bookings',
      },
      {
        id: 3,
        icon: '/assets/icons/manual-booking.webp',
        title: '6,784',
        subtitle: 'Manual Bookings',
      },
      {
        id: 4,
        icon: '/assets/icons/whatsapp-booking.webp',
        title: '678',
        subtitle: 'WhatsApp Bookings',
      },
    ];

  return (
    <div>
      <Flex vertical gap={24}>
        <Title level={4} className='m-0'>Hi Business Name!</Title>
        <StatisticsCommonCards data={cardsData} />
        <BookingLineChart />
        <BookingCustomerBarChart />
        <Row gutter={[24,24]}>
          <Col xl={{span:16}} lg={{span:14 }} span={24}>
            <MostBookTable />
          </Col>
          <Col xl={{span:8}} lg={{span:10 }} span={24}>
            <MostBookService />
          </Col>
        </Row>
      </Flex>
    </div>
  )
}

export {Dashboard}