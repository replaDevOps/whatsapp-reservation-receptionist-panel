import { Flex } from 'antd'
import { BreadCrumbCard, SelfBookingTable } from '../../components'

function SelfBookingTabletPage() {
  return (
    <Flex vertical gap={15}>
        <BreadCrumbCard 
            items={[
                {title:'Booking Management'},
                {title:'Self Booking Tablet'}
            ]}
        />
        <SelfBookingTable />
    </Flex>
  )
}

export {SelfBookingTabletPage} 