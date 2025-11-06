import { Button, Flex, Typography } from 'antd'
import { StatisticsCommonCards } from '../../components';
import { TodaysBooking } from '../../components';
import { useTranslation } from 'react-i18next';

const { Title } = Typography
const Dashboard = () => {
const {t}= useTranslation();
  const cardsData = [
    {
      id: 1,
      icon: '/assets/icons/total-booking-w.webp',
      title: t('104'),
      subtitle: t('Total Bookings'),
    },
    {
      id: 2,
      icon: '/assets/icons/manual-booking.webp',
      title: t('50'),
      subtitle: t('Today’s  Manual Bookings'),
    },
    {
      id: 3,
      icon: '/assets/icons/whatsapp-booking.webp',
      title: t('50'),
      subtitle: t('Today’s WhatsApp Bookings'),
    },
    {
      id: 4,
      icon: '/assets/icons/cancel-booking.webp',
      title: t('4'),
      subtitle: t('Today’s Cancelled Bookings'),
    },
  ];

  return (
    <div>
      <Flex vertical gap={24}>
        <Flex justify='space-between' align='center'>
          <Title level={4} className='m-0'>{t('Hi Receptionist Name!')}</Title>
          <Button className='btncancel'>
            {t('Branch 1')}
          </Button>
        </Flex>
        <StatisticsCommonCards data={cardsData} />
        <TodaysBooking/>
      </Flex>
    </div>
  )
}

export { Dashboard }