import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography} from 'antd'
import {MyInput } from '../../Forms'

const { Title, Text } = Typography
const CancelBooking = ({visible,onClose,onConfirm,loading,setReason,t}) => {

    const [form] = Form.useForm()
    const onFinish = () =>{
        onConfirm()
    }
    return (
        <>
        <Modal
            title={null}
            open={visible}
            onCancel={onClose}
            closeIcon={false}
            centered
            footer={
                <Flex justify='end' gap={5}>
                    <Button type='button' className='btncancel text-black border-gray' onClick={onClose}>
                        {t("Skip")}
                    </Button>
                    <Button 
                        type="primary" 
                        className='btnsave border0 text-white brand-bg' 
                        loading={loading}
                        htmlType='submit'
                        onClick={()=>form.submit()}
                    >
                        {t("Send")}
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex vertical gap={0}>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            {t("Cancel Booking")}
                        </Title>
                        <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex> 
                    <Text className='fs-13 text-gray'>
                        {t("Please provide a reason for cancelling this booking.")}
                    </Text>
                </Flex>
                <Form layout="vertical" 
                    form={form} 
                    onFinish={onFinish} 
                >
                    <Row>
                        <Col span={24}>
                            <MyInput 
                                textArea
                                label={t("Reason")} 
                                name={'cancelReason'}
                                placeholder={t("Write reason here...")} 
                                required
                                message={t('Please write reason')}
                                rows={5}
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