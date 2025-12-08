import { Card, Col, Flex, Row, Skeleton, Typography } from 'antd'

const { Title, Text } = Typography
const StatisticsCommonCards = ({ data = [], lg = 6,  md = 12, sm = 24,loading}) => {
    return (
        <Row gutter={[14, 24]} className="h-100">
            {
                loading ?
                new Array(4)?.fill(null)?.map((_, index)=>
                    <Col 
                        xs={24}
                        sm={24}
                        md={12}
                        lg={6}
                        xl={6} 
                        key={'skelton-card-' + index}
                    >
                    <Skeleton.Button 
                        active 
                        size='large' 
                        shape='square'
                        block
                        style={{width:'100%', height:'150px',borderRadius:5}}
                    />
                    </Col>
                )
                :
                <>
                    {data.map((item, index) => (
                        <Col key={index} span={24} sm={sm} md={md} lg={lg}>
                            <Card className={`card-bg h-100 border-gray card-cs ${index === 0 ? 'bg-dark-brand' : ''} `}>
                                <Flex gap={8} vertical align="start">
                                    {item?.icon && (
                                        <img src={item.icon} width={45} alt={item.subtitle || 'icon'} fetchPriority="high"/>
                                    )}
                                    {item?.subtitle && (
                                        <Text className={`fs-14 text-gray ${index === 0 ? 'text-white' : ''}`}>{item.subtitle}</Text>
                                    )}
                                    <Title level={5} className={`fw-600 text-black m-0 ${index === 0 ? 'text-white' : ''}`}>
                                        {item.title}
                                    </Title>
                                </Flex>
                            </Card>
                        </Col>
                    ))}
                </>
            }
        </Row>
    )
}

export { StatisticsCommonCards }
