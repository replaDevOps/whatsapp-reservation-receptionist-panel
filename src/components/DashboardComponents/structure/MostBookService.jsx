import { Button, Card, Col, Flex, Image, Progress, Row, Typography } from 'antd';
import { ModuleTopHeading } from '../../PageComponent';
import { bookerserviceData } from '../../../data';

const { Text } = Typography
const MostBookService = () => {
    return (
        <>
            <Card className='radius-12 border-gray h-100 card-cs'>
                <Flex vertical className='mb-2'>
                    <ModuleTopHeading level={4} name='Most Booked Service' />
                    <Text className='text-gray fs-13'>This Month</Text>
                </Flex>
                <Flex gap={5} vertical>
                {
                    bookerserviceData?.map((items,index)=>
                        <Card className='bg-transparent border-gray card-16' key={index}>
                            <Row gutter={[16,16]}>
                                <Col span={4}>
                                    <Image src={items?.icon} width={40} preview={false} />
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