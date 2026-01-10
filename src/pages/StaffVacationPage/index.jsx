import { Flex } from 'antd'
import { BreadCrumbCard, StaffVacationsSchedule } from '../../components'
import { useTranslation } from 'react-i18next'
import { settingTitle } from '../../shared';
function StaffVacationPage() {
  const {t} = useTranslation();
  const title = settingTitle({t});
  return (
    <Flex vertical gap={15}>
      <BreadCrumbCard 
        items={[
          {title: title},
          {title:t('Staff Vacations')}
        ]}
      />
      <StaffVacationsSchedule />
    </Flex>
  )
}

export {StaffVacationPage} 