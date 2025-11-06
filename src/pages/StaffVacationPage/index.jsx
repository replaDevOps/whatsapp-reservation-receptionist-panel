import { Flex } from 'antd'
import { BreadCrumbCard, StaffVacationsSchedule } from '../../components'
import { useTranslation } from 'react-i18next'
function StaffVacationPage() {
  const {t} = useTranslation();
  return (
    <Flex vertical gap={15}>
      <BreadCrumbCard 
        items={[
          {title:t('Profile Settings')},
          {title:t('Staff Vacations')}
        ]}
      />
      <StaffVacationsSchedule />
    </Flex>
  )
}

export {StaffVacationPage} 