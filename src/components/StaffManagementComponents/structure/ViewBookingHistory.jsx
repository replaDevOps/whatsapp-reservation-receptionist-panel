import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { ModuleTopHeading } from '../../PageComponent'
import { stafftableData } from '../../../data'
import { ViewHistoryTable } from './ViewHistoryTable'
import { BreadCrumbCard } from '../../Ui'

const { Text } = Typography
const ViewBookingHistory = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const details = stafftableData?.find((list)=>list?.key === Number(id))

    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    {title:'Staff Management'},
                    {title:'Staffs'},
                    {title:`${details?.staffName}`}
                ]}
            />
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} align="center" justify='space-between' className='mb-3'>
                    <Flex gap={10} align="flex-start">
                        <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/staffmanagement")}>
                            <ArrowLeftOutlined />
                        </Button>
                        <ModuleTopHeading level={4} name={details?.staffName} />
                    </Flex>
                    {
                        details?.status && 
                        details?.status === 'Active' ? (
                            <Text className='btnpill fs-12 success'>Active</Text>
                        ) : (
                            <Text className='btnpill fs-12 inactive'>Inactive</Text>
                        )
                    }
                </Flex>
                <ViewHistoryTable />
            </Card>
        </Flex>
    )
}

export {ViewBookingHistory}