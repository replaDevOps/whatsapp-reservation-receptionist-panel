import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Space, Typography } from 'antd'
import { ModuleTopHeading } from '../../../PageComponent';

const { Title, Text } = Typography
const CalendarCard = ({currentDate, setCurrentDate, formattedDate}) => {

    

    const prevDay = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 1);
        setCurrentDate(newDate);
    };

    const nextDay = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 1);
        setCurrentDate(newDate);
    };

    return (
        <>
            <Card className='card-bg radius-12 border-gray card-cs'>
                <Flex vertical gap={30}>
                    <Flex vertical>
                        <ModuleTopHeading level={4} name='Booking' />
                        <Text className='text-gray fs-13'>See all the booking in your system</Text>
                    </Flex>
                    <Flex justify='center'>
                        <Space size={10}>
                            <Button  icon={<LeftOutlined />} onClick={prevDay} />
                            <Title level={5} className='m-0 fw-500'>
                                {formattedDate}
                            </Title>
                            <Button  icon={<RightOutlined />} onClick={nextDay} />
                        </Space>
                    </Flex>
                </Flex>
            </Card>
        </>
    )
}

export {CalendarCard}