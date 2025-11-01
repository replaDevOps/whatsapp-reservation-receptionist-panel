import { useEffect, useState } from 'react'
import { Button, Col, Drawer, Flex, Form, Radio, Row, Tooltip, Typography } from 'antd'
import { MyInput, MySelect } from '../../../Forms';
import { StaticListOptionReplicate } from '../structure';

const { Text } = Typography
const AddListOptionTextDrawer = ({ visible, onClose, edititem }) => {

    const [form] = Form.useForm();
    const [isAccess, setIsAccess] = useState(1);

    const handleRadioChange = (e) => {
        setIsAccess(e.target.value === 1);
        console.log('access',isAccess,e)
    };

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
            title={<Text className='fs-14 fw-500'>Add List Options</Text>}
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
                    Choose how you want to add options for your customers. You can add them manually (static) or connect with your business data (dynamic).
                </Text>
                <Form
                    form={form}
                    layout="vertical"
                    // onFinish={onFinish}
                    requiredMark={false}
                >
                    <Row gutter={[12,5]}>
                        <Col span={24}>
                            <Radio.Group
                                onChange={handleRadioChange}
                                value={isAccess ? 1 : 2}
                                className="mb-4"
                            >
                                <Flex gap={20}>
                                    <Radio value={1} className="fs-14">
                                        <Flex align='center' gap={5}>
                                            Static
                                            <Tooltip title='Manually add your own options for customers.'>
                                                <img src='/assets/icons/info.webp' width={15} alt='info icon' fetchPriority="high" />
                                            </Tooltip>
                                        </Flex>
                                    </Radio>
                                    <Radio value={2} className="fs-14">
                                        <Flex align='center' gap={5}>
                                            Dynamic
                                            <Tooltip title='Automatically fetch options from your business data.'>
                                                <img src='/assets/icons/info.webp' width={15} alt='info icon' fetchPriority="high" />
                                            </Tooltip>
                                        </Flex>
                                    </Radio>
                                </Flex>
                            </Radio.Group>
                        </Col>
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
                        {
                            isAccess ? 
                            <>
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
                                            col: 22,
                                        },
                                    ]}
                                />
                            </>
                            :
                            <>
                                <Col span={24}>
                                    <MySelect 
                                        label={'Select Data Source'}
                                        name={'branch'}
                                        required 
                                        message="Please choose source" 
                                        options={[
                                            {
                                                id: 1,
                                                name: 'branch 01'
                                            }
                                        ]}
                                        placeholder='Choose source'
                                    />
                                </Col>
                                <Col span={24}>
                                    <MyInput
                                        textArea
                                        label='Error Message'
                                        name="errorMsg"
                                        size="large"
                                        placeholder='No available data'
                                        rows={3}
                                    />
                                </Col>
                            </>
                        }
                        
                    </Row>
                </Form>
            </Flex>
        </Drawer>
    )
}

export { AddListOptionTextDrawer }