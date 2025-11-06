import { Flex } from 'antd'
import { BookingSchedularCalendar, BreadCrumbCard } from '../../components'
import { useTranslation } from 'react-i18next'
function BookingPage() {
  const {t} = useTranslation()
  return (
    <Flex vertical gap={15}>
        <BreadCrumbCard 
            items={[
                {title:t('Booking Management')},
                {title:t('Booking')}
            ]}
        />
        <BookingSchedularCalendar />
    </Flex>
  )
}

export {BookingPage} 