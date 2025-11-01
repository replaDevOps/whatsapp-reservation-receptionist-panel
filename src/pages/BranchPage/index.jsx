import { Flex } from 'antd'
import { BranchesTable, BreadCrumbCard } from '../../components'

const BranchPage = () => {
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    {title:'Business Management'},
                    {title:'Branches'}
                ]}
            />
            <BranchesTable />
        </Flex>
    )
}

export {BranchPage}