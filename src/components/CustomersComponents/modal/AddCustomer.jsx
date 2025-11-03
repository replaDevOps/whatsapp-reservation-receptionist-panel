import { useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Tag, Typography, Radio } from 'antd'
import { MyDatepicker, MyInput, MySelect } from '../../../Forms'
import { serviceProvider, serviceType } from '../../../../shared'

const { Title, Text } = Typography
const AddCustomer = ({ visible, onClose }) => {

    const [form] = Form.useForm();
    const [isAccess, setIsAccess] = useState(1);
    const [ischange, setIsChange] = useState(0)
    const [timeslotes, setTimeSlotes] = useState('')
    const handleRadioChange = (e) => {
        setIsAccess(e.target.value === 1);
    };

    const handleValue = (value) => {
        setTimeSlotes(value)
    };
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
                        Save
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
                            <Radio.Group
                                onChange={handleRadioChange}
                                value={isAccess ? 1 : 2}
                                className="mb-4"
                            >
                                <Flex gap={20}>
                                    <Radio value={1} className="fs-14">
                                        By time
                                    </Radio>
                                    <Radio value={2} className="fs-14">
                                        By service provider
                                    </Radio>
                                </Flex>
                            </Radio.Group>
                        </Col>
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
                        {
                            isAccess ? 
                           <>
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
                           </>
                        :
                        <></>
                        }
                        <Col span={24}>
                            <MySelect
                                label={'Service'}
                                name={'promoType'}
                                required
                                message="Please choose service"
                                options={serviceType}
                                placeholder='Select Service'
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput
                                label="Promo Code (if any)"
                                name="promocode"
                                required
                                message="Please enter a promo code"
                                placeholder="Enter Promo Code"
                                className='w-100'
                                suffix={<Button type='button' onClick={() => setOtpVerify(true)} className='btnsave px-3 py-2 my-1 fs-12 m-1'>Check</Button>}
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect
                                label={'Service Provider'}
                                name={'serviceProvider'}
                                required
                                message="Please choose service provider"
                                options={serviceProvider}
                                placeholder='Select Service Provider'
                            />
                        </Col>
                        {
                            !isAccess ?
                                <>
                                    <Col span={24}>
                                        <MyDatepicker
                                            label="Booking Date"
                                            name="bookingdate"
                                            required
                                            message="Please enter booking date"
                                            placeholder="Select booking date"
                                            datePicker
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <Flex vertical gap={5} className='my-3'>
                                            <Flex gap={10} align='center'>
                                                <Text className='fs-12'>Available Slots :</Text>
                                                <Flex gap={5} align='center'>
                                                    {
                                                        ['08:00 - 10:30', '12:00 - 02:00', '05:00 - 07:00']?.map((items, i) =>
                                                            <Tag key={i}
                                                                className='fs-10 m-0 radius-20 cursor'
                                                                onClick={() => handleValue(items)}
                                                            >
                                                                {items}
                                                            </Tag>
                                                        )
                                                    }
                                                </Flex>
                                            </Flex>
                                            <Flex className="offday pad bg-light-gray" gap={5} align="center" justify='space-between'>
                                                <Text className="text-gray fs-13">{timeslotes ? timeslotes : 'Select time'}</Text>
                                                <img src="/assets/icons/clock.webp" width={16} alt='clock icon' fetchPriority="high" />
                                            </Flex>
                                        </Flex>
                                    </Col>
                                    <Col span={24}>
                                        <MyDatepicker
                                            label="Booking Time"
                                            name="bookingTime"
                                            required
                                            message="Please enter booking time"
                                            placeholder="Select time"
                                            format="HH:mm"
                                        />
                                    </Col>
                                </>
                                :
                                <></>
                        }
                        <Col span={24}>
                            <MyInput
                                label="Reminder (To notify before booking time)"
                                name="reminder"
                                placeholder="Set reminder"
                                addonAfter={<Flex gap={5} justify='end'>
                                    {
                                        ['Minutes', 'Hour']?.map((items, i) =>
                                            <Tag key={i}
                                                color={ischange === i ? '#07938F' : ''}
                                                className='fs-10 m-0 cursor'
                                                onClick={() => setIsChange(i)}
                                            >
                                                {items}
                                            </Tag>
                                        )
                                    }
                                </Flex>}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput
                                label="Note"
                                name="note"
                                required
                                message="Please enter a note"
                                placeholder="Enter note......."
                                className='w-100'
                                textArea
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