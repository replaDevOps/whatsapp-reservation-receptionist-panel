import { CloseOutlined, EditFilled } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Radio, Row, Select, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyDatepicker, MyInput, MySelect } from '../../Forms'
import moment from 'moment'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { toArabicDigits } from '../../../shared'
const { Title, Text } = Typography
const AddEditBooking = ({visible,onClose,edititem}) => {
const{t, i18n} = useTranslation();
const isArabic = i18n.language === "ar";
    const [form] = Form.useForm();
    const [isAccess, setIsAccess] = useState(1);
    const [ ischange, setIsChange ] = useState(0)
    const [ timeslotes, setTimeSlotes ] = useState('')
    const handleRadioChange = (e) => {
        setIsAccess(e.target.value === 1);
    };

    const handleValue = (value) => {
        setTimeSlotes(value)
    };

    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                phoneNo: edititem?.booking?.phoneno,
                customerName: edititem?.booking?.name,
                email: edititem?.booking?.email,
                service: edititem?.booking?.service,
                serviceProvider: edititem?.providerName,
                bookingDate: moment(edititem?.booking?.date, 'DD/MM/YYYY'),
                bookingTime: moment(edititem?.booking?.time, 'HH:mm'),
                reminder: edititem?.booking?.duration,
                note: edititem?.booking?.description
            })
        }
        else {
            form.resetFields()
        }
    },[visible,edititem])


    return (
        <Modal
            title={null}
            open={visible}
            onCancel={onClose}
            closeIcon={false}
            centered
            width={600}
            footer={
                <Flex justify='end' gap={5}>
                    <Button type='button' className='btncancel text-black border-gray' onClick={onClose}>
                        {t('Cancel')}
                    </Button>
                    <Button type="primary" className='btnsave border0 text-white brand-bg' onClick={()=>{onClose()}}>
                        {edititem?t('Update'):t('Save')}
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex vertical gap={0}>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            { edititem ? t('Edit Booking') : t('Add New Booking') }
                        </Title>
                        <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex> 
                </Flex>
                <Form layout="vertical" 
                    form={form} 
                    // onFinish={} 
                    requiredMark={false}
                >
                    <Row>
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
                                label={t('Phone Number')}
                                name="phoneNo"
                                required
                                message={t('Please enter a valid phone number')}
                                addonBefore={
                                    <Select
                                        defaultValue={`+${isArabic ? toArabicDigits(966):966}`}
                                        className='w-80'
                                        onChange={(value) => form.setFieldsValue({ countryCode: value })}
                                    >
                                        <Select.Option value="sa">+{isArabic ? toArabicDigits(966):966}</Select.Option>
                                        <Select.Option value="ae">+{isArabic ? toArabicDigits(955):955}</Select.Option>
                                    </Select>
                                }
                                placeholder="3445592382"
                                value={form.getFieldValue("phoneNo") || ""}
                                className='w-100'
                                disabled={edititem}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label={t('Customer Name')}
                                name="customerName" 
                                required 
                                message={t('Please enter customer name')}
                                placeholder={t('Enter customer name')}
                                disabled={edititem}
                            />
                        </Col>
                        {
                            !isAccess &&
                            <Col span={24}>
                                <MyInput 
                                    label={t('Email Address')} 
                                    name="email" 
                                    placeholder={t('Enter email address')}
                                />
                            </Col>
                        }
                        <Col span={24}>
                            <MySelect 
                                label={t('Service')}
                                name={'service'}
                                required 
                                message={t('Please choose service')}
                                options={[
                                    {
                                        id: 1,
                                        name: 'Hair Cut'
                                    }
                                ]}
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
                                options={[
                                    {
                                        id: 1,
                                        name: 'Manager'
                                    }
                                ]}
                                placeholder={t('Select Service Provider')} 
                            />
                        </Col>
                        <Col span={24}>
                            <MyDatepicker
                                datePicker
                                label={t('Booking Date')}
                                name='bookingDate'
                                required
                                message={t('Please enter booking date')}
                                placeholder={t('Select date')}
                            />
                        </Col>
                        {
                            !isAccess ?
                            <Col span={24}>
                                <Flex vertical gap={5} className='my-3'>
                                    <Flex gap={10} align='center'>
                                        <Text className='fs-12'>{t('Available Slots')} :</Text>
                                        <Flex gap={5} align='center'>
                                            {
                                                ['08:00 - 10:30','12:00 - 02:00','05:00 - 07:00']?.map((items,i)=>
                                                    <Tag key={i} 
                                                        className='fs-10 m-0 radius-20 cursor'
                                                        onClick={()=>handleValue(items)}
                                                    >
                                                        {items}
                                                    </Tag>
                                                )
                                            }
                                        </Flex>
                                    </Flex>     
                                    <Flex className="offday pad bg-light-gray" gap={5} align="center" justify='space-between'>
                                        <Text className="text-gray fs-13">{timeslotes ? timeslotes : t('Select time') }</Text>
                                        <img src="/assets/icons/clock.webp" width={16} alt='clock icon' fetchPriority="high" />
                                    </Flex>
                                </Flex>
                            </Col>
                            :
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
                        }
                        <Col span={24}>
                            <MyInput 
                                label={t('Reminder (To notify before booking time)')}
                                name="reminder" 
                                placeholder={t('Set reminder')}
                                suffix={<Flex gap={5} justify='end'>
                                    {
                                        [t('Minutes'),t('Hour')]?.map((items,i)=>
                                            <Tag key={i} 
                                                color={ischange === i ? '#07938F' : ''}
                                                className='fs-10 m-0 cursor'
                                                onClick={()=>setIsChange(i)}
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
                                textArea
                                label={t('Note')}
                                name="note" 
                                placeholder={t('Enter note.......')} 
                                rows={8}
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {AddEditBooking}