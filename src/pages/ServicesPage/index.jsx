import { Flex } from 'antd'
import { BreadCrumbCard, ServicesTable } from '../../components'

const ServicesPage = () => {
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    {title:'Business Management'},
                    {title:'Services'}
                ]}
            />
            <ServicesTable />
        </Flex>
    )
}

export {ServicesPage}