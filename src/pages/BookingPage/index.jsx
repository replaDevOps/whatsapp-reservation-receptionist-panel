import { Flex } from 'antd'
import { BookingSchedularCalendar, BreadCrumbCard } from '../../components'

function BookingPage() {
  return (
    <Flex vertical gap={15}>
        <BreadCrumbCard 
            items={[
                {title:'Booking Management'},
                {title:'Booking'}
            ]}
        />
        <BookingSchedularCalendar />
    </Flex>
  )
}

export {BookingPage} 