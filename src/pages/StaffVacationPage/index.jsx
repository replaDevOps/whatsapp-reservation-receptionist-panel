import { Flex } from 'antd'
import { BreadCrumbCard, StaffVacationsSchedule } from '../../components'

function StaffVacationPage() {
  return (
    <Flex vertical gap={15}>
      <BreadCrumbCard 
        items={[
          {title:'Profile Settings'},
          {title:'Staff Vacations'}
        ]}
      />
      <StaffVacationsSchedule />
    </Flex>
  )
}

export {StaffVacationPage} 