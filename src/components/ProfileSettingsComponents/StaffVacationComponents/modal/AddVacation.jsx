import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, notification, Row, Typography } from 'antd'
import { useEffect } from 'react'
import { MyDatepicker } from '../../../Forms'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client/react'
import { ADD_VACATION, UPDATE_VACATION } from '../../../../graphql/mutation/mutations'
import { notifyError, notifySuccess } from '../../../../shared'
import dayjs from 'dayjs'

const { Title } = Typography
const AddVacation = ({visible,onClose,edititem,setDeleteItem,refetch}) => {
const {t} = useTranslation();
    const [form] = Form.useForm();
    const userId = localStorage.getItem('userId');
    const [api, contextHolder] = notification.useNotification();
    const [ createVacation, { loading: creating } ] = useMutation(ADD_VACATION,{
        onCompleted: () => { notifySuccess(api,"Event create", "Event created successfully",()=> {onClose()})},
        onError: (error) => {notifyError(api, error);},
    })
    const [ updateVacation, { loading: updating } ] = useMutation(UPDATE_VACATION,{
        onCompleted: () => {notifySuccess(api,"Event update","Event updated successfully",()=> {onClose()})},
        onError: (error) => {notifyError(api, error);},
    })
    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                startDate: dayjs(edititem?.start),
                endDate: dayjs(edititem?.end),
            })
        }
        else {
            form.resetFields()
        }
    },[visible,edititem])


    const AddVacation = async () => {
        const input = form.getFieldsValue();
        const startDate = dayjs(input.startDate).format('YYYY-MM-DD');
        const endDate = dayjs(input.endDate).format('YYYY-MM-DD');

        try {
            if (edititem?.id) {
            await updateVacation({
                variables: { 
                input: { id: edititem?.id, startDate, endDate }
                }
            });
            } else {
            await createVacation({
                variables: { 
                input: { staffId: userId, startDate, endDate }
                }
            });
            }

            await refetch();
            onClose();
        } catch (e) {
            console.error(e);
            message.error(e.message);
        }
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
                width={600}
                footer={
                    <Flex justify='space-between' align='center' gap={10}>
                        {
                            edititem?.id &&
                            <Button type='button' className='btnsave border-0 bg-red text-white' onClick={()=>{setDeleteItem(edititem?.id);onClose()}}>
                                {t('Delete')}
                            </Button>
                        }
                        <Flex justify='end' gap={5}>
                            <Button type='button' className='btncancel text-black border-gray' onClick={onClose}>
                                {t('Cancel')}
                            </Button>
                            <Button type="primary" loading={creating || updating} className='btnsave border0 text-white brand-bg' onClick={()=>{form.submit()}}>
                                {edititem?t('Update'):t('Save')}
                            </Button>
                        </Flex>
                    </Flex>
                }
            > 
                <Flex vertical gap={10}>
                    <Flex vertical gap={0}>
                        <Flex justify='space-between' gap={6}>
                            <Title level={5} className='m-0'>
                                { edititem ? t('Edit Vacations') : t('Add Vacations') }
                            </Title>
                            <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                                <CloseOutlined className='fs-18' />
                            </Button>
                        </Flex> 
                    </Flex>
                    <Form layout="vertical" 
                        form={form} 
                        onFinish={AddVacation} 
                        requiredMark={false}
                    >
                        <Row>
                            <Col span={24}>
                                <MyDatepicker
                                    datePicker 
                                    label={t('Start Date')}
                                    name="startDate" 
                                    required 
                                    message={t('Please enter start date')}
                                    placeholder={t('Select date')}
                                />
                            </Col>
                            <Col span={24}>
                                <MyDatepicker
                                    datePicker 
                                    label={t('End Date')}
                                    name="endDate" 
                                    required 
                                    message={t('Please enter end date')}
                                    placeholder={t('Select date')}
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

export {AddVacation}