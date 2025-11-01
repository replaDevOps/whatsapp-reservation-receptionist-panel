import { Flex } from 'antd'
import { BreadCrumbCard, WhatsappAdsTable } from '../../components'

const WhatsappAdsPage = () => {
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    {title:'Business Management'},
                    {title:'Whatsapp Ad’s'}
                ]}
            />
            <WhatsappAdsTable />
        </Flex>
    )
}

export {WhatsappAdsPage}