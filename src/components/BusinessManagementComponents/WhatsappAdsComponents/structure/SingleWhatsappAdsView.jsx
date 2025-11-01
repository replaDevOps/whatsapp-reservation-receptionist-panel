import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Tag, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { whatsappadsData } from '../../../../data'
import { SingleAdsDetailTable } from './SingleAdsDetailTable'
import { BreadCrumbCard } from '../../../Ui'

const { Text, Title } = Typography
const SingleWhatsappAdsView = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const editdetail = whatsappadsData?.find((list)=>list?.key === Number(id))
    

    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    {title:'Business Management'},
                    {title:'Whatsapp Ad’s'}
                ]}
            />
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={20} vertical>
                    <Flex justify='space-between' align='center'>
                        <Flex gap={10} align="flex-start">
                            <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/whatsappads")}>
                                <ArrowLeftOutlined />
                            </Button>
                            <Flex vertical gap={2}>
                                <Title level={4} className="fw-500 m-0">{ editdetail ? editdetail?.title : 'Ads Name' }</Title>
                                <Text className='fs-12 text-gray'>{editdetail?.assigned?.find(list=> list)}</Text>
                            </Flex>
                        </Flex>
                        <Text className='fs-14'>{editdetail?.targetDate}</Text>
                    </Flex>
                    <Text className='fs-14 text-gray'>{editdetail?.adtext}</Text>
                    <Flex gap={5}>
                        {
                            ['service one','service two']?.map((list)=>
                                <Tag className="sm-pill radius-20 fs-12">{list}</Tag>
                            )
                        }
                    </Flex>
                    <SingleAdsDetailTable />
                </Flex>
            </Card>
        </Flex>
    )
}

export {SingleWhatsappAdsView}