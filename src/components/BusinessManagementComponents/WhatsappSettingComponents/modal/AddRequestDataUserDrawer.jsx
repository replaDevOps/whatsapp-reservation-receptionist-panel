import { useEffect } from 'react'
import { Button, Col, Drawer, Flex, Form, Row, Typography } from 'antd'
import { MyInput, MySelect } from '../../../Forms';
import { requestuserOpt } from '../../../../shared';

const { Text } = Typography
const AddRequestDataUserDrawer = ({ visible, onClose, edititem }) => {

    const [form] = Form.useForm();
    useEffect(() => {
        if (visible && edititem) {
            form.setFieldsValue({
                note: edititem?.note
            })
        } else
            form.resetFields()
    }, [visible, edititem])

    return (
        <Drawer
            title={<Text className='fs-14 fw-500'>Request User for Data</Text>}
            onClose={onClose}
            open={visible}
            width={600}
            footer={
                <Flex justify='end' gap={10}>
                    <Button onClick={onClose} className="btncancel">
                        Cancel
                    </Button>
                    <Button
                        className='btn'
                        type="primary"
                        // loading={loading}
                        onClick={() => form.submit()}
                    >
                        Save
                    </Button>
                </Flex>
            }
        >
            <Flex vertical gap={10}>
                <Text className='fs-14'>
                    Request inputs from the user and set the value for an attribute or an entity
                </Text>
                <Form
                    form={form}
                    layout="vertical"
                    // onFinish={onFinish}
                    requiredMark={false}
                >
                    <Row gutter={[12,5]}>
                        <Col span={24}>
                            <MyInput
                                textArea
                                label='Text Message'
                                name="note"
                                size="large"
                                required 
                                message="Please enter your message" 
                                placeholder='Type your message here...'
                                rows={4}
                            />
                        </Col>
                        <Col span={24}>
                            <MySelect 
                                label='Request User For'
                                name='requestUser'
                                required 
                                message="Please choose request user for" 
                                options={requestuserOpt}
                                placeholder='Choose type'
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
        </Drawer>
    )
}

export { AddRequestDataUserDrawer }