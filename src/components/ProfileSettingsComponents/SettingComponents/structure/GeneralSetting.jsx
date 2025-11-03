import { useState, useEffect } from 'react'
import { EditFilled } from '@ant-design/icons'
import { Button, Card, Col, Flex, Form, Row, Typography } from 'antd'
<<<<<<< HEAD:src/components/ProfileSettingsComponents/SettingComponents/structure/GeneralSetting.jsx
import { EditGeneralSettings, MyInput } from '../../../../components'
=======
import { EditGeneralSettings, MyInput, SingleFileUpload } from '../../../components'
>>>>>>> 5374883598fa559da402887ea77e08acbde14d82:src/components/SettingsComponents/structure/GeneralSetting.jsx

const { Title, Text} = Typography
const GeneralSetting = () => {

    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false)
    const [edititem, setEditItem] = useState(null)
    const [previewimage, setPreviewImage] = useState('/assets/images/setting.webp')
    const days = [
        {
            key:1,
            day:'Monday:',
            timing:'09:00am - 06:00pm'
        },
        {
            key:2,
            day:'Tuesday:',
            timing:'09:00am - 06:00pm'
        },
        {
            key:3,
            day:'Wednesday:',
            timing:'09:00am - 06:00pm'
        },
        {
            key:4,
            day:'Thursday:',
            timing:'09:00am - 06:00pm'
        },
        {
            key:5,
            day:'Friday:',
            timing:'Day Off'
        },
        {
            key:6,
            day:'Saturday:',
            timing:'09:00am - 06:00pm'
        },
        {
            key:7,
            day:'Sunday:',
            timing:'09:00am - 06:00pm'
        },
    ]
    return (
        <>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} vertical>
                    <Flex gap={10} justify='space-between' align='center'>
                        <Title level={5} className="fw-500 m-0">General Settings</Title>
                        <Button className='btncancel' onClick={() => { setVisible(true); setEditItem(1) }}>
                            Edit
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
                                    label="First Name"
                                    name="firstName"
                                    required
                                    message="Please enter first name"
                                    placeholder="Enter first name"
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput
                                    label="Last Name"
                                    name="lastName"
                                    required
                                    message="Please enter last name"
                                    placeholder="Enter last name"
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput
                                    type='number'
                                    label="Phone Number"
                                    name="phoneNo"
                                    required
                                    message="Please enter phone number"
                                    placeholder="Enter phone number"
                                    prefix='+966 '
                                    disabled
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput
                                    label="Email Address"
                                    name="email"
                                    required
                                    message="Please enter email address"
                                    placeholder="Enter email address"
                                    disabled
                                />
                            </Col>
                            <Col span={24}>
                                <Flex vertical gap={5}>
                                    <Title level={5} className="fw-500 m-0">My Availbility</Title>
                                {
                                    days?.map((schedule, index) =>(
                                         <Flex gap={4} key={index}>
                                        <Text strong>{schedule?.day}</Text>
                                        <Text className='fw-400'>{schedule?.timing}</Text>
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