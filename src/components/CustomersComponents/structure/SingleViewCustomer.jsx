import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Flex, Image, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { customertableData } from '../../../../data'
import { CustomerHistoryTable } from './CustomerHistoryTable'
import { BreadCrumbCard } from '../../../Ui'

const { Text, Title } = Typography
const SingleViewCustomer = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const details = customertableData?.find((list)=>list?.key === Number(id))

    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    {title:'Business Management'},
                    {title:'Customers', to:'/customers'},
                    {title: `${details?.customerName}` }
                ]}
            />
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} align="center" justify='space-between'>
                    <Flex gap={10} align="center">
                        <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/customers")}>
                            <ArrowLeftOutlined />
                        </Button>
                        <Title level={4} className="fw-500 m-0">{details?.customerName}</Title>
                    </Flex>
                    <Flex gap={5}>
                        {
                             details?.type === 'New' ? (
                                <Text className='pill-round fs-12 text-brand'>{details?.type}</Text>
                            ) : (
                                <Text className='pill-round fs-12 text-green'>{details?.type}</Text>
                            ) 
                        }

                        {
                            details?.status === 'Active' ? (
                                <Text className='btnpill fs-12 success'>{details?.status}</Text>
                            ) : (
                                <Text className='btnpill fs-12 inactive'>{details?.status}</Text>
                            )
                        }
                    </Flex>
                </Flex>
                <Flex gap={15} align='center' wrap className='my-4 h-40'>
                    <Flex gap={15} align='center'>
                        <Image src='/assets/icons/newcust-ar.webp' width={40} alt='new customer icon' fetchPriority="high" />
                        <Flex vertical>
                            <Text className='text-gray fs-15'>Completed Bookings</Text>
                            <Title className='fw-600 m-0' level={4}>
                                190
                            </Title>
                        </Flex>
                    </Flex>
                    <Divider type='vertical' className='h-100'/>
                    <Flex gap={15} align='center'>
                        <Image src='/assets/icons/oldcust-ar.webp' width={40} alt='old customer icon' fetchPriority="high" />
                        <Flex vertical>
                            <Text className='text-gray fs-15'>Cancelled Bookings</Text>
                            <Title className='fw-600 m-0' level={4}>
                                78
                            </Title>
                        </Flex>
                    </Flex>
                </Flex>
                <CustomerHistoryTable />
            </Card>
        </Flex>
    )
}

export {SingleViewCustomer}