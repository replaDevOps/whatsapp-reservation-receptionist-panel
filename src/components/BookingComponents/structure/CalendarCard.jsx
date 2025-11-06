import { LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Space, Typography } from 'antd'
import { ModuleTopHeading } from '../../PageComponent';
import { useTranslation } from 'react-i18next';
const { Title, Text } = Typography
const CalendarCard = ({currentDate, setCurrentDate, formattedDate, setBookedEvent}) => {
const {t} = useTranslation();
    

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
            <Flex vertical gap={30}>
                <Flex justify='space-between' align='center' gap={10}>
                    <Flex vertical>
                        <ModuleTopHeading level={4} name={t('Booking')} />
                        <Text className='text-gray fs-13'>{t('See all the booking in your system')}</Text>
                    </Flex>
                    <Button className='btncancel' onClick={()=>{setBookedEvent(true)}}> 
                        <PlusOutlined /> {t('Add Booking')}
                    </Button>
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
        </>
    )
}

export {CalendarCard}