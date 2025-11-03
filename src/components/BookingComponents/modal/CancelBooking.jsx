import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Radio, Row, Select, Tag, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { MyDatepicker, MyInput, MySelect } from '../../Forms'
const { Title, Text } = Typography
const CancelBooking = ({visible,onClose}) => {

    const navigate = useNavigate()
    const [form] = Form.useForm();


    return (
        <Modal
            title={null}
            open={visible}
            onCancel={onClose}
            closeIcon={false}
            centered
            footer={
                <Flex justify='end' gap={5}>
                    <Button type='button' className='btncancel text-black border-gray' onClick={onClose}>
                        Skip
                    </Button>
                    <Button type="primary" className='btnsave border0 text-white brand-bg' onClick={()=>{onClose()}}>
                        Send
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex vertical gap={0}>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            Cancel Booking
                        </Title>
                        <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex> 
                    <Text className='fs-13 text-gray'>
                        Please provide a reason for cancelling this booking.
                    </Text>
                </Flex>
                <Form layout="vertical" 
                    form={form} 
                    // onFinish={} 
                    requiredMark={false}
                >
                    <Row>
                        <Col span={24}>
                            <MyInput 
                                textArea
                                label="Reason" 
                                name="reason" 
                                placeholder="Write reason here..." 
                                rows={5}
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {CancelBooking}