import { CloseOutlined} from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, notification, Radio, Row, Select, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { MyDatepicker, MyInput, MySelect } from '../../Forms'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { notifyError, notifySuccess, toArabicDigits } from '../../../shared'
import { useLazyQuery, useMutation } from '@apollo/client/react'
import { CREATE_BOOKING } from '../../../graphql/mutation/mutations'
import { GET_SERVICE_PROVIDER_BY_BRANCH, GET_SERVICES_LOOKUPS } from '../../../graphql/query/lookupsquery'
import { getBranchId, getBusinessId } from '../../../utils/auth'

const { Title, Text } = Typography
const AddEditBooking = ({visible,onClose,edititem,refetch}) => {
    const{t, i18n} = useTranslation();
    const isArabic = i18n.language === "ar";
    const [form] = Form.useForm();
    const [isAccess, setIsAccess] = useState('BY_TIME');
    const [ ischange, setIsChange ] = useState(0)
    const [ timeslotes, setTimeSlotes ] = useState('')
    const [api, contextHolder] = notification.useNotification();
    const [getServicesLookup, { data: servicelookups }] = useLazyQuery(GET_SERVICES_LOOKUPS)
    const [getServiceProviderLookup, { data: serviceproviderlookups } ] = useLazyQuery(GET_SERVICE_PROVIDER_BY_BRANCH)
    const [ createBooking, { loading:creating } ] = useMutation(CREATE_BOOKING,{
        onCompleted: () => {notifySuccess(api,"Booking create","Booking created successfully",()=> {onClose();refetch()})},
        onError: (error) => {notifyError(api, error);},
    })
    const handleRadioChange = (e) => {
        setIsAccess(e.target.value);
        console.log('radio event',e.target.value)
    };

    const handleValue = (value) => {
        setTimeSlotes(value)
    };
    useEffect(()=>{
        if(getServicesLookup && getBusinessId && visible)
            getServicesLookup({variables:{businessId: getBusinessId()}})
    }, [getServicesLookup, getBusinessId, visible])
    useEffect(()=>{
        if(getServiceProviderLookup && getBranchId && visible)
            getServiceProviderLookup({variables:{branchId: getBranchId()}})
    }, [getServiceProviderLookup, getBranchId, visible])

    useEffect(() => {
        if (visible && edititem) {
            form.setFieldsValue({
                phone: edititem?.booking?.consumer?.phone,
                firstName: edititem?.booking?.consumer?.firstName,
                lastName: edititem?.booking?.consumer?.lastName,
                email: edititem?.booking?.consumer?.email,
                serviceId: edititem?.booking?.serviceId,
                serviceProviderId: edititem?.booking?.serviceProviderId,
                appointmentDate: dayjs(edititem?.booking?.appointmentDate),
                appointmentTime: edititem?.booking?.appointmentTime ? dayjs(edititem.booking.appointmentTime, "HH:mm") : null,
                reminderMinutesBefore: edititem?.booking?.reminderMinutesBefore,
                promoCode: edititem?.booking?.promoCode,
                note: edititem?.booking?.note,
            });
            setIsAccess(edititem?.booking?.bookingType);
        } else {
            form.resetFields();
            setIsAccess("BY_TIME");
        }
    }, [visible, edititem]);


    const CreateBookingHandle = async () => {
        const input = form.getFieldsValue();

        const payload = {
            serviceId: input.serviceId,
            appointmentDate: input.appointmentDate?.toISOString(),
            appointmentTime: input.appointmentTime ? input.appointmentTime.format("HH:mm") : timeslotes,
            bookingType: isAccess,
            branchId: getBranchId(),
            consumer: {
                email: input.email || null,
                firstName: input.firstName,
                lastName: input.lastName,
                phone: input.phone
            },
            reminderMinutesBefore: Number(input.reminderMinutesBefore) || null,
            isManual: true,
            promoCode: input.promoCode || null,
            serviceProviderId: input.serviceProviderId || null,
            note: input.note || null
        };
        try {
            await createBooking({
                variables: { input: payload }
            });
        } catch (e) {
            console.error(e);
            notifyError(api, e);
        }
    };


    return (
        <>
            {contextHolder}        
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
                        <Button type="primary" loading={creating} className='btnsave border0 text-white brand-bg' onClick={()=>{form.submit()}}>
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
                        onFinish={CreateBookingHandle} 
                        requiredMark={false}
                    >
                        <Row>
                            <Col span={24}>
                                <Radio.Group
                                    onChange={handleRadioChange}
                                    value={isAccess}
                                    className="mb-4"
                                >
                                    <Flex gap={20}>
                                        <Radio value={'BY_TIME'} className="fs-14">
                                            {t('By time')}
                                        </Radio>
                                        <Radio value={'BY_SERVICE_PROVIDER'} className="fs-14">
                                            {t('By service provider')}
                                        </Radio>
                                    </Flex>
                                </Radio.Group>
                            </Col>
                            <Col span={24}>
                                <MyInput
                                    label={t('Phone Number')}
                                    name="phone"
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
                                    label={t('Customer First Name')}
                                    name="firstName" 
                                    required 
                                    message={t('Please enter customer first name')}
                                    placeholder={t('Enter customer first name')}
                                    disabled={edititem}
                                />
                            </Col>
                            <Col span={24}>
                                <MyInput 
                                    label={t('Customer last Name')}
                                    name="lastName" 
                                    required 
                                    message={t('Please enter customer last name')}
                                    placeholder={t('Enter customer last name')}
                                    disabled={edititem}
                                />
                            </Col>
                            {
                                isAccess === "BY_SERVICE_PROVIDER" &&
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
                                    name={'serviceId'}
                                    required 
                                    message={t('Please choose service')}
                                    options={servicelookups?.getServicesByBusinessid}
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
                                    name={'serviceProviderId'}
                                    required 
                                    message={t('Please choose service provider')}
                                    options={
                                        serviceproviderlookups?.getServiceProvidersByBranch?.map((list) => ({
                                            id: list?.id,
                                            name: `${list?.firstName || ""} ${list?.lastName || ""}`
                                        }))
                                    }
                                    placeholder={t('Select Service Provider')} 
                                />
                            </Col>
                            <Col span={24}>
                                <MyDatepicker
                                    datePicker
                                    label={t('Booking Date')}
                                    name='appointmentDate'
                                    required
                                    message={t('Please enter booking date')}
                                    placeholder={t('Select date')}
                                />
                            </Col>
                            {
                                isAccess === "BY_SERVICE_PROVIDER" ?
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
                                        name="appointmentTime"
                                        required
                                        message={t('Please enter booking time')}
                                        placeholder={t('Select time')}
                                        format="HH:mm"
                                    />
                                </Col>
                            }
                            <Col span={24}>
                                <MyInput 
                                    type={'number'}
                                    label={t('Reminder (To notify before booking time)')}
                                    name="reminderMinutesBefore" 
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
        </>
    )
}

export {AddEditBooking}