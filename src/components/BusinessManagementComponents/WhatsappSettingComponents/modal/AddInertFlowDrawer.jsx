import { useEffect } from 'react'
import { Button, Col, Drawer, Flex, Form, Row, Typography } from 'antd'
import { MySelect } from '../../../Forms';
import { whatsappflowOp } from '../../../../shared';

const { Text } = Typography
const AddInertFlowDrawer = ({ visible, onClose, edititem }) => {

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
            title={<Text className='fs-14 fw-500'>Insert Flow</Text>}
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
                    Trigger a flow for the current conversation.
                </Text>
                <Form
                    form={form}
                    layout="vertical"
                    // onFinish={onFinish}
                    requiredMark={false}
                >
                    <Row gutter={[12,5]}>
                        <Col span={24}>
                            <MySelect 
                                label='Select Flow'
                                name='selectFlow'
                                required 
                                message="Please choose flow" 
                                options={whatsappflowOp}
                                placeholder='Choose flow'
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
        </Drawer>
    )
}

export { AddInertFlowDrawer }