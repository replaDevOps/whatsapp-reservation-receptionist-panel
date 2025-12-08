import { CloseOutlined} from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, notification, Radio, Row, Select, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { MyDatepicker, MyInput, MySelect } from '../../Forms'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { notifyError, notifySuccess, toArabicDigits } from '../../../shared'
import { useLazyQuery, useMutation } from '@apollo/client/react'
import { CREATE_BOOKING } from '../../../graphql/mutation/mutations'
import { GET_SERVICE_PROVIDER_BY_BRANCH, GET_SERVICES_BY_BRANCH_LOOKUP } from '../../../graphql/query/lookupsquery'
import { getBranchId, getBusinessId } from '../../../utils/auth'
import { GET_APPOINTMENTS_BY_SERVICE_PROVIDER } from '../../../graphql/query'
import { mergeDateAndTime } from '../../../utils'

const { Title, Text } = Typography
const AddEditBooking = ({visible,onClose,edititem,refetch}) => {

    const{t, i18n} = useTranslation();
    const isArabic = i18n.language === "ar";
    const [form] = Form.useForm();
    const [isAccess, setIsAccess] = useState('BY_TIME');
    const [ ischange, setIsChange ] = useState(0)
    const [ timeslotes, setTimeSlotes ] = useState('')
    const [api, contextHolder] = notification.useNotification();
    const [getServicesByBranchLookup, { data: servicesByBranchLookup }] = useLazyQuery(GET_SERVICES_BY_BRANCH_LOOKUP)
    const [getServiceProvidersByBranchLookup, { data: serviceProvidersByBranchLookup } ] = useLazyQuery(GET_SERVICE_PROVIDER_BY_BRANCH)
    const [getAppointmentsByServiceProvider, { data: appointmentsByServiceProvider }] = useLazyQuery(GET_APPOINTMENTS_BY_SERVICE_PROVIDER)

    const [bookings, setBookings] = useState([])
    const [availableTimeSlots, setAvailableTimeSlots] = useState([])

    const [ createBooking, { loading:creating } ] = useMutation(CREATE_BOOKING,{
        onCompleted: () => {notifySuccess(api,"Booking create","Booking created successfully",()=> {onClose();refetch()})},
        onError: (error) => {notifyError(api, error);},
    })
    const handleRadioChange = (e) => {
        setIsAccess(e.target.value)
        console.log('radio event',e.target.value)
    }
    useEffect(()=>{
        if(getServicesByBranchLookup && getBranchId && visible)
            getServicesByBranchLookup({variables:{branchId: getBranchId()}})
    }, [getServicesByBranchLookup, getBranchId, visible])
    useEffect(()=>{
        if(getServiceProvidersByBranchLookup && getBranchId && visible)
            getServiceProvidersByBranchLookup({variables:{branchId: getBranchId()}})
    }, [getServiceProvidersByBranchLookup, getBranchId, visible])

    useEffect(()=>{
        if(appointmentsByServiceProvider?.getAppointmentsByServiceProvider){
            const bookings = appointmentsByServiceProvider?.getAppointmentsByServiceProvider
            setBookings(bookings)
            const serviceId = form.getFieldValue('serviceId')
            if(!serviceId) return
            const service = servicesByBranchLookup?.getServicesBybranchid?.find(s => s.id === serviceId)
            const slots=getAvailableTimeSlots(
                bookings,
                service?.duration || 0,
                service?.bufferTime || 0
            )
            setAvailableTimeSlots([...slots])
        }
    }, [appointmentsByServiceProvider])

    console.log('availableTimeSlots:',availableTimeSlots)
    function getAvailableTimeSlots(reservedSlots, serviceDuration, serviceBufferTime) {
    const workingStart = "09:00";
    const workingEnd = "18:00";

    function toMinutes(time) {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
    }

    function toTime(minutes) {
        const h = Math.floor(minutes / 60).toString().padStart(2, "0");
        const m = (minutes % 60).toString().padStart(2, "0");
        return `${h}:${m}`;
    }

    const workStart = toMinutes(workingStart);
    const workEnd = toMinutes(workingEnd);

    // Build reserved blocks
    const blocks = reservedSlots.map(item => {
        const start = toMinutes(item.appointmentTimeSlot);
        const end = start + item.service.duration + item.service.bufferTime;
        return { start, end };
    }).sort((a,b) => a.start - b.start);

    const available = [];
    const slotDuration = serviceDuration;
    const slotBlock = serviceDuration + serviceBufferTime;

    let slotStart = workStart;

    while (slotStart + slotDuration <= workEnd) {
        const slotEnd = slotStart + slotDuration;
        const slotComplete = slotStart + slotBlock;

        // find reservation overlap
        const overlapBlock = blocks.find(b =>
        slotStart < b.end && slotComplete > b.start
        );

        if (overlapBlock) {
        // jump to the end of the reservation
        slotStart = overlapBlock.end;
        continue;
        }

        if (slotComplete <= workEnd) {
        available.push({
            start: toTime(slotStart),
            end: toTime(slotEnd)
        });
        }

        slotStart += slotBlock;
    }
    console.log('available slots',serviceDuration,": ", serviceBufferTime)
    return available;
    }
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
            bookingType: isAccess,
            isManual: true,
            branchId: getBranchId(),
            consumer: {
                phone: input?.phone,
                firstName: input?.firstName,
                lastName: input?.lastName,
                email: input?.email || null,
            },
            serviceId: input?.serviceId,
            // promoCode: "cmimyyt2f0000i77crw058u67",
            serviceProviderId: input?.serviceProviderId || null,
            appointmentDate: input?.appointmentDate,
            appointmentTimeSlot: isAccess === "BY_SERVICE_PROVIDER" ? timeslotes : null,
            appointmentTime: mergeDateAndTime(input?.appointmentDate, timeslotes),
            reminderMinutesBefore: Number(input?.reminderMinutesBefore) || null,
            note: input?.note || null,
            status:'PENDING',
        }
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
                                    // options={servicesByBranchLookup?.getServicesBybranchid}
                                    options={[
{id: "6b6e5b25-3839-4410-a06a-0c887c864c02", name: "branch 33"},
{id:"7116f18c-e531-4633-89a3-38a0435d13b9", name: "Service 02"},
{
      "id": "cf0a78a2-bfdc-4048-bbd5-7908e4d9f15d",
      "name": "Service 04"
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
                                    name={'serviceProviderId'}
                                    required 
                                    message={t('Please choose service provider')}
                                    options={
                                        serviceProvidersByBranchLookup?.getServiceProvidersByBranch?.map(({id, firstName, lastName}) => ({  id, name: `${firstName || ""} ${lastName || ""}`}))
                                    }
                                    placeholder={t('Select Service Provider')} 
                                    // onChange={(serviceProviderId) => {
                                    //     const appointmentDate = form.getFieldValue('appointmentDate');
                                    //     if(appointmentDate)
                                    //         getAppointmentsByServiceProvider({variables: {serviceProviderId, date: appointmentDate}})
                                    // }}
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
                                    onChange={(date) => {
                                        const serviceProviderId = form.getFieldValue('serviceProviderId')
                                        // if(serviceProviderId)
                                        //     getAppointmentsByServiceProvider({variables: {serviceProviderId, date}})
                                        setAvailableTimeSlots([
  { "start": "09:00", "end": "09:45" },
  { "start": "09:55", "end": "10:40" },
  { "start": "10:50", "end": "11:35" },
  { "start": "11:45", "end": "12:30" },
  { "start": "12:40", "end": "13:25" },
  { "start": "13:35", "end": "14:20" },
  { "start": "14:30", "end": "15:15" },
  { "start": "15:25", "end": "16:10" },
  { "start": "16:20", "end": "17:05" },
  { "start": "17:15", "end": "18:00" }
]
)
                                    }}
                                />
                            </Col>
                            {
                                isAccess === "BY_SERVICE_PROVIDER" ?
                                <Col span={24}>
                                    <Flex vertical gap={5} className='my-3'>
                                        <Flex gap={10} align='center'>
                                            <Text className='fs-12'>{t('Available Slots')} :</Text>
                                            <Flex gap={5} align='center' wrap='wrap'>
                                                {
                                                    availableTimeSlots?.map((slot, index)=>
                                                        <Tag key={index} 
                                                            className='fs-10 m-0 radius-20 cursor'
                                                            onClick={()=>setTimeSlotes(slot?.start)}
                                                        >
                                                            {slot?.start + ' - ' +slot?.end}
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
                                    {/* <Flex vertical gap={5} className='my-3'>
                                        <Flex gap={10} align='center'>
                                            <Text className='fs-12'>{t('Reserved Slots')} :</Text>
                                            <Flex gap={5} align='center' wrap='wrap'>
                                                {
                                                    bookings?.map((booking, index)=>
                                                        <Tag key={index} 
                                                            className='fs-10 m-0 radius-20 cursor'
                                                            onClick={()=>setTimeSlotes(slot?.start)}
                                                        >
                                                            {booking?.start + ' - ' +slot?.end}
                                                        </Tag>
                                                    )
                                                }
                                            </Flex>
                                        </Flex>     
                                        <Flex className="offday pad bg-light-gray" gap={5} align="center" justify='space-between'>
                                            <Text className="text-gray fs-13">{timeslotes ? timeslotes : t('Select time') }</Text>
                                            <img src="/assets/icons/clock.webp" width={16} alt='clock icon' fetchPriority="high" />
                                        </Flex>
                                    </Flex> */}
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