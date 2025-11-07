import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Flex, Space, Typography } from 'antd'
import { useTranslation } from 'react-i18next';
const { Title } = Typography
const NavigationControl = ({currentDate, setCurrentDate, formattedDate}) => {
 const {t, i18n} = useTranslation();
    const isArabic = i18n.language === "ar";
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
                <Button  icon={isArabic ? <RightOutlined /> : <LeftOutlined />} onClick={prevDay} />
                <Title level={5} className='m-0 fw-500'>
                    {formattedDate}
                </Title>
                <Button  icon={isArabic ? <LeftOutlined /> : <RightOutlined />} onClick={nextDay} />
            </Space>
        </Flex>
    )
}

export {NavigationControl}