import { Button, Flex, Typography } from 'antd'
import { StatisticsCommonCards } from '../../components';
import { TodaysBooking } from '../../components';
import { useTranslation } from 'react-i18next';
import { useLazyQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { GET_DASHBOARD_STATS } from '../../graphql/query';

const { Title } = Typography
const Dashboard = () => {
  const {t}= useTranslation();
  const fullName = localStorage.getItem("fullName");
  const branch = localStorage.getItem("branch")
  const [dashboardStats, setDashboardStats]= useState(null)
  const [getDashboardStats, { data,loading }] = useLazyQuery(GET_DASHBOARD_STATS, {
    fetchPolicy: "network-only",
  })
  useEffect(()=>{
    if(getDashboardStats)
      getDashboardStats()
  }, [getDashboardStats])
  useEffect(()=>{
    if(data?.getTodayAppointments){
      const {todayAppoimtemtCount, todayManualAppointmentCount, todaywhatsappAppointmentCount, todaycanecledAppointments}= data?.getTodayAppointments
      setDashboardStats({
        todayAppoimtemtCount,
        todayManualAppointmentCount,
        todaywhatsappAppointmentCount,
        todaycanecledAppointments,
      })
    }
  }, [data])
  console.log('dashboard', dashboardStats)
  const cardsData = [
    {
      id: 1,
      icon: '/assets/icons/total-booking-w.webp',
      title: dashboardStats?.todayAppoimtemtCount,
      subtitle: t('Total Bookings'),
    },
    {
      id: 2,
      icon: '/assets/icons/manual-booking.webp',
      title: dashboardStats?.todayManualAppointmentCount,
      subtitle: t('Today’s  Manual Bookings'),
    },
    {
      id: 3,
      icon: '/assets/icons/whatsapp-booking.webp',
      title: dashboardStats?.todaywhatsappAppointmentCount,
      subtitle: t('Today’s WhatsApp Bookings'),
    },
    {
      id: 4,
      icon: '/assets/icons/cancel-booking.webp',
      title: dashboardStats?.todaycanecledAppointments,
      subtitle: t('Today’s Cancelled Bookings'),
    },
  ];

  return (
    <div>
      <Flex vertical gap={24}>
        <Flex justify='space-between' align='center'>
          <Title level={4} className='m-0'>{fullName}</Title>
          <Button className='btncancel'>
            {branch}
          </Button>
        </Flex>
        <StatisticsCommonCards loading={loading} data={cardsData} />
        <TodaysBooking/>
      </Flex>
    </div>
  )
}

export { Dashboard }