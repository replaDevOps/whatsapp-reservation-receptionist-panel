import { Flex } from 'antd'
import { BreadCrumbCard, ChangePasswordSetting, GeneralSetting, LanguageSetting, TitleCard } from '../../components'

const SettingsPage = () => {
    return (
        <Flex vertical gap={10}>
            <GeneralSetting />
            <LanguageSetting />
            <ChangePasswordSetting />
        </Flex>
    )
}

export {SettingsPage}