import { Button, Flex, Typography } from 'antd'
import { StatisticsCommonCards } from '../../components';
import { TodaysBooking } from '../../components';
import { useTranslation } from 'react-i18next';
import { useLazyQuery } from '@apollo/client/react';
import { useState } from 'react';

const { Title } = Typography
const Dashboard = () => {
  const {t}= useTranslation();
  const fullName = localStorage.getItem("fullName");
  const branch = localStorage.getItem("branch")
  const [dashboardStats, setDashboardStats]= useState(null)
  // const [getDashboardStats, { data,loading }] = useLazyQuery(GET_DASHBOARD_STATS, {
  //   fetchPolicy: "network-only",
  // })
  // useEffect(()=>{
  //   if(getDashboardStats)
  //     getDashboardStats()
  // }, [getDashboardStats])
  // useEffect(()=>{
  //   if(data?.getDashboardCountApi){
  //     const {basicPlanBusinesses, enterprisePlanBusinesses, proPlanBusinesses, standardPlanBusinesses, totalBusinesses}= data?.getDashboardCountApi
  //     setDashboardStats({
  //       basicPlanBusinesses,
  //       enterprisePlanBusinesses,
  //       proPlanBusinesses,
  //       standardPlanBusinesses,
  //       totalBusinesses
  //     })
  //   }
  // }, [data])
  
  const cardsData = [
    {
      id: 1,
      icon: '/assets/icons/total-booking-w.webp',
      title: '104',
      subtitle: t('Total Bookings'),
    },
    {
      id: 2,
      icon: '/assets/icons/manual-booking.webp',
      title: '50',
      subtitle: t('Today’s  Manual Bookings'),
    },
    {
      id: 3,
      icon: '/assets/icons/whatsapp-booking.webp',
      title: '50',
      subtitle: t('Today’s WhatsApp Bookings'),
    },
    {
      id: 4,
      icon: '/assets/icons/cancel-booking.webp',
      title: '4',
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
        <StatisticsCommonCards data={cardsData} />
        <TodaysBooking/>
      </Flex>
    </div>
  )
}

export { Dashboard }