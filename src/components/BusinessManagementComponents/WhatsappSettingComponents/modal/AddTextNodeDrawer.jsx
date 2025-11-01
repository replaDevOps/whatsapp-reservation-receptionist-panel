import { useEffect, useState } from 'react'
import { Button, Col, Drawer, Flex, Form, Row, Typography } from 'antd'
import { MyInput } from '../../../Forms';

const { Text } = Typography
const AddTextNodeDrawer = ({ visible, onClose, edititem }) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (visible && edititem) {
            form.setFieldsValue({
                note: edititem?.note
            })
            console.log('edit', edititem)
        } else
            form.resetFields()
    }, [visible, edititem])

    return (
        <Drawer
            title={<Text className='fs-14 fw-500'>Add Text Message</Text>}
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
                    Write the message you want your users to see when they interact with your bot. Use curly braces to refer to user inputs or parameters.
                </Text>
                <Form
                    form={form}
                    layout="vertical"
                // onFinish={onFinish}
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
                            <Flex gap={5} align='center'>
                                <img src="/assets/icons/info.webp" alt="info icon" fetchPriority="high" width={13} />
                                <Text className='text-gray fs-12'>
                                    Keep it short and clear so users can understand quickly.
                                </Text>
                            </Flex>
                        </Col>
                    </Row>
                </Form>
            </Flex>
        </Drawer>
    )
}

export { AddTextNodeDrawer }