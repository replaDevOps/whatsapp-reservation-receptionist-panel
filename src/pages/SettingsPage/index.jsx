import { Flex } from 'antd'
import { BreadCrumbCard, ChangePasswordSetting, GeneralSetting, LanguageSetting } from '../../components'
import { useTranslation } from 'react-i18next'
const SettingsPage = () => {
    const {t} = useTranslation();
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    {title:t('Profile Settings')},
                    {title:t('Settings')}
                ]}
            />
            <GeneralSetting />
            <LanguageSetting />
            <ChangePasswordSetting />
        </Flex>
    )
}

export {SettingsPage}