import { useEffect } from 'react'
import { Button, Col, Drawer, Flex, Form, Row, Typography } from 'antd'
import { MyInput } from '../../../Forms';
import { StaticListOptionReplicate } from '../structure';

const { Text } = Typography
const AddTextWithButtonDrawer = ({ visible, onClose, edititem }) => {

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
            title={<Text className='fs-14 fw-500'>Add Buttons</Text>}
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
                    Write a message and add quick reply buttons for your customers. Buttons help users choose an action instantly without typing.
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
                            <StaticListOptionReplicate 
                                title={'Buttons'}
                                form={form}
                                dayKey="buttonslist"
                                showInputIndex={true}
                                fieldsConfig={[
                                    {
                                        type: "input",
                                        name: "name",
                                        label: `Button`,
                                        placeholder: "Enter title",
                                        col: 20,
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
        </Drawer>
    )
}

export { AddTextWithButtonDrawer }