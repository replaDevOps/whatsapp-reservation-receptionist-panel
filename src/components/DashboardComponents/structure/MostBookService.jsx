import { useState } from 'react';
import { Button, Card, Col, Dropdown, Flex, Image, Progress, Row, Space, Typography } from 'antd';
import { ModuleTopHeading } from '../../PageComponent';
import { bookerserviceData } from '../../../data';
import { DownOutlined } from '@ant-design/icons';

const { Text } = Typography
const MostBookService = () => {

    const [order, setOrder] = useState(0)
    
    const items = [
        { key: 0, label: 'This Month' },
    ];

    const onClick = ({ key }) => {
        setOrder(key);
    };

    return (
        <>
            <Card className='radius-12 border-gray h-100 card-cs'>
                <Flex justify='space-between' align='flex-start' wrap gap={10} className='mb-2'>
                    <Flex vertical>
                        <ModuleTopHeading level={4} name='Most Booked Services' />
                        <Text className='text-gray fs-13'>Top Ranked</Text>
                    </Flex>
                    <Flex justify='end' gap={10}>
                        <Dropdown
                            menu={{ items, onClick }}
                            trigger={['click']}
                            className='margin-top'
                        >
                            <Button className='btncancel fs-13 pad-x'>
                                <Space>
                                    {
                                        order == 0 ? 'This Month' : ''
                                    }  
                                    <DownOutlined className='fs-12' />
                                </Space>
                            </Button>
                        </Dropdown>
                    </Flex>
                </Flex>
                <Flex gap={5} vertical>
                {
                    bookerserviceData?.map((items,index)=>
                        <Card className='bg-transparent border-gray card-16' key={index}>
                            <Row gutter={[16,16]}>
                                <Col span={4}>
                                    <Image src={items?.icon} width={40} preview={false} alt='service icon' fetchPriority="high" />
                                </Col>
                                <Col span={20}>
                                    <Flex justify='space-between' align='flex-start'>
                                        <Flex vertical gap={0}>
                                            <Text strong>{items?.title}</Text>
                                            <Text className='text-gray fs-12'>Booked: {items?.subtitle} times</Text>
                                        </Flex>
                                        <Button className='sm-pill border-0 text-white'
                                            style={{background: `${items?.color}`}}
                                        >
                                            {items?.per}%
                                        </Button>
                                    </Flex>
                                    <Progress showInfo={false} strokeColor={'#0E98D8'} percent={30} />
                                </Col>
                            </Row>
                        </Card>
                    )
                }
                </Flex>
            </Card>
        </>
    );
};

export { MostBookService };