import { Flex } from 'antd'
import { BreadCrumbCard, ChangePasswordSetting, GeneralSetting, LanguageSetting } from '../../components'

const SettingsPage = () => {
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    {title:'Profile Settings'},
                    {title:'Settings'}
                ]}
            />
            <GeneralSetting />
            <LanguageSetting />
            <ChangePasswordSetting />
        </Flex>
    )
}

export {SettingsPage}