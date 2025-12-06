import { Flex } from 'antd'
import { BookingSchedularCalendar, BreadCrumbCard } from '../../components'
import { useTranslation } from 'react-i18next'
import { bookingTitle } from '../../shared'
function BookingPage() {
  const {t} = useTranslation()
  const title = bookingTitle({t})
  return (
    <Flex vertical gap={15}>
        <BreadCrumbCard 
            items={[
                {title:title},
                {title:t('Booking')}
            ]}
        />
        <BookingSchedularCalendar />
    </Flex>
  )
}

export {BookingPage} 