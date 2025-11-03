import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Flex, Space, Typography } from 'antd'

const { Title } = Typography
const NavigationControl = ({currentDate, setCurrentDate, formattedDate}) => {

    const prevDay = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const nextDay = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    return (
        <Flex justify='center'>
            <Space size={10}>
                <Button  icon={<LeftOutlined />} onClick={prevDay} />
                <Title level={5} className='m-0 fw-500'>
                    {formattedDate}
                </Title>
                <Button  icon={<RightOutlined />} onClick={nextDay} />
            </Space>
        </Flex>
    )
}

export {NavigationControl}