import { useEffect, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { MyInput, MySelect } from '../../../Forms'

const { Title } = Typography
const AddEditAccount = ({visible,onClose,edititem}) => {

    const [form] = Form.useForm();


    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                branch: edititem?.name,
                username: edititem?.username,
                password: edititem?.password,
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
                        Cancel
                    </Button>
                    <Button type="primary" className='btnsave border0 text-white brand-bg' onClick={()=>{onClose()}}>
                        {edititem?'Update':'Save'}
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex vertical gap={0}>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            { edititem ? edititem?.username : 'Add Tablet Account' }
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
                            <MySelect 
                                label={'Branch'}
                                name={'branch'}
                                required 
                                message="Please choose branch" 
                                options={[
                                    {
                                        id: 1,
                                        name: 'branch 01'
                                    }
                                ]}
                                placeholder='Select branch'
                                disabled={edititem}
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label="Username" 
                                name="username" 
                                required 
                                message="Please enter username" 
                                placeholder="Enter username" 
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label="Password" 
                                name="password"
                                type='password' 
                                placeholder="Enter password" 
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {AddEditAccount}