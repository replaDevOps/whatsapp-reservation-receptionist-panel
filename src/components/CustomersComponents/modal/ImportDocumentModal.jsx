import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { MySelect, SingleFileUpload, UploadSingleFile } from '../../../Forms'
import { promoType } from '../../../../shared'

const { Title, Text } = Typography
const ImportDocumentModal = ({visible,onClose}) => {

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
                    <Button type="primary" className='btnsave border0 text-white brand-bg' onClick={()=>form.submit()}>
                        Confirm
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex justify='space-between' gap={6}>
                    <Title level={5} className='m-0'>
                        Import Customers
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
                            <MySelect 
                                label={'Promo Type'}
                                name={'promoType'}
                                required 
                                message="Please choose promo type" 
                                options={promoType}
                                placeholder='Choose Type'
                            />
                        </Col>
                        <Col span={24}>
                            <UploadSingleFile
                                name="document"
                                title="Import data in .xlsx/.xl format"
                                form={form}
                                onUpload={(file) => console.log("uploading:", file)}
                                className='w-100'
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {ImportDocumentModal}