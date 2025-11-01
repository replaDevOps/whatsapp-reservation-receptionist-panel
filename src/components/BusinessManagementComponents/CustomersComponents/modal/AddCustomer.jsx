import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { MyDatepicker, MyInput, MySelect, SingleFileUpload, UploadSingleFile } from '../../../Forms'
import { promoType } from '../../../../shared'

const { Title, Text } = Typography
const AddCustomer = ({ visible, onClose }) => {

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
                        Cancel
                    </Button>
                    <Button type="primary" className='btnsave border0 text-white brand-bg' onClick={() => form.submit()}>
                        Confirm
                    </Button>
                </Flex>
            }
        >
            <Flex vertical gap={10}>
                <Flex justify='space-between' gap={6}>
                    <Title level={5} className='m-0'>
                        Add New Customers
                    </Title>
                    <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                        <CloseOutlined className='fs-18' />
                    </Button>
                </Flex>
                <Form layout="vertical"
                    form={form}
                    // onFinish={} 
                    requiredMark={false}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                        <MyInput
                                    type='number' 
                                    label="Phone Number" 
                                    name="phoneNo" 
                                    required 
                                    message="Please enter phone number" 
                                    placeholder="Enter phone number" 
                                    prefix='+966 '
                                />
                        </Col>
                        <Col span={24}>
                            <MyInput
                                label="Customer Name"
                                name="customerName"
                                required
                                message="Please enter customer name"
                                placeholder="Enter customer name"
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput
                                label="Email Address"
                                name="email"
                                required
                                message="Please enter email address"
                                placeholder="Enter email address"
                            />
                        </Col>
                        <Col span={12}>
                            <MyDatepicker
                                label="Booking Date"
                                name="bookingdate"
                                required
                                message="Please enter booking date"
                                placeholder="Select booking date"
                                datePicker
                            />
                        </Col>
                        <Col span={12}>
                            <MyDatepicker
                                label="Booking Time"
                                name="bookingtime"
                                required
                                message="Please enter booking time"
                                placeholder="Select booking time"
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect
                                label={'Promo Type'}
                                name={'promoType'}
                                required
                                message="Please choose promo type"
                                options={promoType}
                                placeholder='Choose Type'
                            />
                        </Col>

                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export { AddCustomer }