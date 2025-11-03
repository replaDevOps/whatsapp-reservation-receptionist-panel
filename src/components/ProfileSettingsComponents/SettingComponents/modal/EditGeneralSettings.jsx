import { useState, useEffect } from 'react'
import { CloseOutlined, EditFilled } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { MyInput, SingleFileUpload } from '../../../Forms'

const { Title } = Typography
const EditGeneralSettings = ({visible,onClose,edititem}) => {

    const [form] = Form.useForm();
        const [ previewimage, setPreviewImage ] = useState('/assets/images/setting.webp')
        useEffect(()=>{
            if(visible && edititem){
                form.setFieldsValue({
                    name: edititem?.name,
                })
                setPreviewImage(edititem?.img)
            }
        },[edititem,visible])
    
        const handleChangeImage = () => {
            setPreviewImage(null);
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
                    <Button type="primary" className='btnsave border0 text-white brand-bg' onClick={()=>form.submit()}>
                        Save
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex justify='space-between' gap={6}>
                    <Title level={5} className='m-0'>
                        General Settings
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
                           <Col span={24} className='my-5'>
                                    {
                                        !previewimage ?
                                        <SingleFileUpload
                                            name="document"
                                            title="Upload Logo"
                                            form={form}
                                            onUpload={(file) => console.log("uploading:", file)}
                                            align="center"
                                        />
                                        :
                                        <Flex vertical gap={5} justify='center' align='center'>
                                            <img
                                                src={previewimage}
                                                alt="Category"
                                                className='radius-12 mxw-mxh'
                                                fetchPriority="high"
                                            />
                                            <div>
                                                <Button type="link" className='fs-13 text-brand' onClick={handleChangeImage}>
                                                    <EditFilled /> Edit
                                                </Button>
                                            </div>
                                        </Flex>

                                    }
                                </Col>
                        <Col span={24}>
                            <MyInput 
                                label="First Name" 
                                name="firstName" 
                                required
                                message='Please enter your first name'
                                placeholder='Enter first name'
                            />
                        </Col>
                        <Col span={24}>
                            <MyInput 
                                label="Last Name" 
                                name="lastName" 
                                required
                                message='Please enter your last name'
                                placeholder='Enter last name'
                            />
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
                                label="Email Address" 
                                name="email" 
                                required 
                                message="Please enter email address" 
                                placeholder="Enter email address" 
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {EditGeneralSettings}