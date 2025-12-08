import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography, notification} from 'antd'
import {MyInput } from '../../Forms'
import { CANCEL_APPOINTMENT } from '../../../graphql/mutation'
import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { notifySuccess } from '../../../shared'
const { Title, Text } = Typography
const CancelBooking = ({visible,onClose}) => {

    const [form] = Form.useForm()
     const [api, contextHolder] = notification.useNotification();
    const [cancelAppointment, { loading } ] = useMutation(CANCEL_APPOINTMENT,{
        onCompleted: () => {notifySuccess(api,"Booking create","Booking created successfully",()=> {onClose()})},
        onError: (error) => {notifyError(api, error);},
    })
    const [reason, setReason] = useState(null)

    const handleCancelAppointment = () => {
        const input = {
            id: visible,
            status: "CANCELLED",
        }
        cancelAppointment({variables: {input}})
    }
    return (
        <>
        {contextHolder}
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
                    <Button 
                        type="primary" 
                        className='btnsave border0 text-white brand-bg' 
                        onClick={handleCancelAppointment}
                        loading={loading}
                    >
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
                                placeholder="Write reason here..." 
                                rows={5}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
        </>
    )
}

export {CancelBooking}