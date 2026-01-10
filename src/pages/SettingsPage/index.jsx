import { Flex } from 'antd'
import { BreadCrumbCard, ChangePasswordSetting, GeneralSetting, LanguageSetting } from '../../components'
import { useTranslation } from 'react-i18next'
import { settingTitle } from '../../shared';
const SettingsPage = () => {
    const {t} = useTranslation();
    const title = settingTitle({t});
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    {title: title },
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