import { useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Tag, Typography, Radio } from 'antd'
import { MyDatepicker, MyInput, MySelect } from '../../Forms'
import { serviceProvider, serviceType } from '../../../shared'
import { useTranslation } from 'react-i18next'
const { Title, Text } = Typography
const AddCustomer = ({ visible, onClose }) => {
const {t} = useTranslation();
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
                        {t('Cancel')}
                    </Button>
                    <Button type="primary" className='btnsave border0 text-white brand-bg' onClick={() => form.submit()}>
                        {t('Save')}
                    </Button>
                </Flex>
            }
        >
            <Flex vertical gap={10}>
                <Flex justify='space-between' gap={6}>
                    <Title level={5} className='m-0'>
                        {t('Add New Booking')}
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
                                        {t('By time')}
                                    </Radio>
                                    <Radio value={2} className="fs-14">
                                        {t('By service provider')}
                                    </Radio>
                                </Flex>
                            </Radio.Group>
                        </Col>
                        <Col span={24}>
                            <MyInput
                                type='number'
                                label={t('Phone Number')}
                                name="phoneNo"
                                required
                                message={t('Please enter phone number')}
                                placeholder={t('Enter phone number')}
                                prefix='+966 '
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput
                                label={t('Customer Name')}
                                name="customerName"
                                required
                                message={t('Please enter customer name')}
                                placeholder={t('Enter customer name')}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput
                                label={t('Email Address')}
                                name="email"
                                required
                                message={t('Please enter email address')}
                                placeholder={t('Enter email address')}
                            />
                        </Col>
                        {
                            isAccess ? 
                           <>
                            <Col span={12}>
                            <MyDatepicker
                                label={t('Booking Date')}
                                name="bookingdate"
                                required
                                message={t('Please enter booking date')}
                                placeholder={t('Select booking date')}
                                datePicker
                            />
                        </Col>
                        <Col span={12}>
                            <MyDatepicker
                                label={t('Booking Time')}
                                name="bookingtime"
                                required
                                message={t('Please enter booking time')}
                                placeholder={t('Select booking time')}
                            />
                        </Col>
                           </>
                        :
                        <></>
                        }
                        <Col span={24}>
                            <MySelect
                                label={t('Service')}
                                name={'promoType'}
                                required
                                message={t('Please choose service')}
                                options={serviceType}
                                placeholder={t('Select Service')}
                            />
                        </Col>
                         <Col span={24}>
                            <MyInput 
                                label={t('Promo Code (if any)')}
                                name="promoCode"
                                placeholder={t('Enter promo code')} 
                                suffix={
                                    <Tag className='cursor'>{t('Check')}</Tag>
                                }
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect
                                label={t('Service Provider')}
                                name={'serviceProvider'}
                                required
                                message={t('Please choose service provider')}
                                options={serviceProvider}
                                placeholder={t('Select Service Provider')}
                            />
                        </Col>
                        {
                            !isAccess ?
                                <>
                                    <Col span={24}>
                                        <MyDatepicker
                                            label={t('Booking Date')}
                                            name="bookingdate"
                                            required
                                            message={t('Please enter booking date')}
                                            placeholder={t('Select booking date')}
                                            datePicker
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <Flex vertical gap={5} className='my-3'>
                                            <Flex gap={10} align='center'>
                                                <Text className='fs-12'>{t('Available Slots')} :</Text>
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
                                            label={t('Booking Time')}
                                            name="bookingTime"
                                            required
                                            message={t('Please enter booking time')}
                                            placeholder={t('Select time')}
                                            format="HH:mm"
                                        />
                                    </Col>
                                </>
                                :
                                <></>
                        }
                        <Col span={24}>
                            <MyInput
                                label={t('Reminder (To notify before booking time)')}
                                name="reminder"
                                placeholder={t('Set reminder')}
                                addonAfter={<Flex gap={5} justify='end'>
                                    {
                                        [t('Minutes'), t('Hour')]?.map((items, i) =>
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
                                label={t('Note')}
                                name="note"
                                required
                                message={t('Please enter a note')}
                                placeholder={t('Enter note.......')}
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