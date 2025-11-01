import { Flex } from 'antd'
import { ActivityLogTable, BreadCrumbCard } from '../../components'

const ActivityLogPage = () => {
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    {title:'Business Management'},
                    {title:'Activity Log'}
                ]}
            />
            <ActivityLogTable />
        </Flex>
    )
}

export {ActivityLogPage}