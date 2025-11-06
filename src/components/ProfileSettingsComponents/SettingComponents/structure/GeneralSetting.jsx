import { useState } from 'react'
import { Button, Card, Col, Flex, Form, Row, Typography } from 'antd'
import { EditGeneralSettings, MyInput } from '../../../../components'
import { useTranslation } from 'react-i18next'
const { Title, Text} = Typography
const GeneralSetting = () => {
    const {t} = useTranslation();
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false)
    const [edititem, setEditItem] = useState(null)
    const [previewimage, setPreviewImage] = useState('/assets/images/setting.webp')
    const days = [
        {
            key:1,
            day:'Monday',
            timing:'09:00am - 06:00pm'
        },
        {
            key:2,
            day:'Tuesday',
            timing:'09:00am - 06:00pm'
        },
        {
            key:3,
            day:'Wednesday',
            timing:'09:00am - 06:00pm'
        },
        {
            key:4,
            day:'Thursday:',
            timing:'09:00am - 06:00pm'
        },
        {
            key:5,
            day:'Friday',
            timing:'Day Off'
        },
        {
            key:6,
            day:'Saturday',
            timing:'09:00am - 06:00pm'
        },
        {
            key:7,
            day:'Sunday',
            timing:'09:00am - 06:00pm'
        },
    ]
    return (
        <>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} vertical>
                    <Flex gap={10} justify='space-between' align='center'>
                        <Title level={5} className="fw-500 m-0">{t('General Settings')}</Title>
                        <Button className='btncancel' onClick={() => { setVisible(true); setEditItem(1) }}>
                            {t('Edit')}
                        </Button>
                    </Flex>
                    <Form layout="vertical"
                        form={form}
                        // onFinish={} 
                        requiredMark={false}
                    >
                        <Row gutter={16}>
                            <Col span={24} className='my-5'>
                                <Flex vertical gap={5} justify='center' align='center'>
                                    <img
                                        src={previewimage}
                                        alt="Category"
                                        className='radius-12 mxw-mxh'
                                        fetchPriority="high"
                                    />
                                </Flex>
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput
                                    label={t('First Name')}
                                    name="firstName"
                                    required
                                    message={t('Please enter first name')}
                                    placeholder={t('Enter first name')}
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput
                                    label={t('Last Name')}
                                    name="lastName"
                                    required
                                    message={t('Please enter last name')}
                                    placeholder={t('Enter last name')}
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput
                                    type='number'
                                    label={t('Phone Number')}
                                    name="phoneNo"
                                    required
                                    message={t('Please enter phone number')}
                                    placeholder={t('Enter phone number')}
                                    prefix='+966 '
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput
                                    label={t('Email Address')}
                                    name="email"
                                    required
                                    message={t('Please enter email address')}
                                    placeholder={t('Enter email address')}
                                    disabled
                                />
                            </Col>
                            <Col span={24}>
                                <Flex vertical gap={5}>
                                    <Title level={5} className="fw-500 m-0">{t('My Availbility')}</Title>
                                {
                                    days?.map((schedule, index) =>(
                                         <Flex gap={4} key={index}>
                                        <Text strong>{t(schedule?.day)}:</Text>
                                        <Text className='fw-400'>{t(schedule?.timing)}</Text>
                                    </Flex>
                                    ))
                                }
                                </Flex>
                            </Col>
                        </Row>
                    </Form>
                </Flex>
            </Card>
            <EditGeneralSettings
                visible={visible}
                edititem={edititem}
                setEditItem={setEditItem}
                onClose={() => { setVisible(false); setEditItem(null) }}
            />
        </>
    )
}

export { GeneralSetting }