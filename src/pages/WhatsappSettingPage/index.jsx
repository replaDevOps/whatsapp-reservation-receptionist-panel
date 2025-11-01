import { Flex } from 'antd'
import { BreadCrumbCard, WhatsappSettingPanel } from '../../components'

const WhatsappSettingPage = () => {
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    {title:'Business Management'},
                    {title:'WhatsApp Settings'}
                ]}
            />
            <WhatsappSettingPanel />
        </Flex>
    )
}

export {WhatsappSettingPage}