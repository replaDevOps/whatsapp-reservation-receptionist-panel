import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { useEffect } from 'react'
import { MyDatepicker } from '../../../Forms'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
const { Title } = Typography
const AddVacation = ({visible,onClose,edititem,setDeleteItem}) => {
const {t} = useTranslation();
    const [form] = Form.useForm();
    
    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                startDate: moment(edititem?.start, 'DD/MM/YYYY'),
                endDate: moment(edititem?.end, 'DD/MM/YYYY'),
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
                <Flex justify='space-between' align='center' gap={10}>
                    <Button type='button' className='btnsave border-0 bg-red text-white' onClick={()=>{setDeleteItem(true);onClose()}}>
                        {t('Delete')}
                    </Button>
                    <Flex justify='end' gap={5}>
                        <Button type='button' className='btncancel text-black border-gray' onClick={onClose}>
                            {t('Cancel')}
                        </Button>
                        <Button type="primary" className='btnsave border0 text-white brand-bg' onClick={()=>{onClose()}}>
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
                    // onFinish={} 
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
    )
}

export {AddVacation}