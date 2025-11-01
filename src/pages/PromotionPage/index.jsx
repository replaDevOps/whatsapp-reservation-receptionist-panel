import { Flex } from 'antd'
import { BreadCrumbCard, PromotionTable } from '../../components'

const PromotionPage = () => {
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    {title:'Business Management'},
                    {title:'Promotions'}
                ]}
            />
            <PromotionTable />
        </Flex>
    )
}

export {PromotionPage}