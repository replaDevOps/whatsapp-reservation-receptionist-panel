import { useEffect } from 'react'
import { Button, Col, Drawer, Flex, Form, Row, Typography } from 'antd'
import { MyInput } from '../../../Forms';
import { StaticListOptionReplicate } from '../structure';
import { PlusCircleOutlined } from '@ant-design/icons';

const { Text } = Typography
const AddFormFieldsDrawer = ({ visible, onClose, edititem }) => {

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
            title={<Text className='fs-14 fw-500'>Form</Text>}
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
                    Request inputs from the user as form
                </Text>
                <Form
                    form={form}
                    layout="vertical"
                    // onFinish={onFinish}
                    requiredMark={false}
                >
                    <Row gutter={[12,12]}>
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
                            <Flex align='center' gap={5}>
                                <Text>Fields</Text>
                                {/* <Button onClick={()=>setChooseFormField(true)} type='button' className='p-0 h-auto border-0 bg-transparent'>
                                    <PlusCircleOutlined className='fs-16' />
                                </Button> */}
                            </Flex>
                        </Col>
                        <Col span={24}>
                            <StaticListOptionReplicate
                                children={
                                    <Flex align='center' justify='space-between' className='w-100' gap={5}>
                                        <Text>Text Message</Text>
                                        <PlusCircleOutlined className='fs-16 text-brand' />
                                    </Flex>
                                } 
                                form={form}
                                dayKey="buttonslist"
                                showInputIndex={true}
                                fieldsConfig={[
                                    {
                                        type: "textarea",
                                        name: "name",
                                        label: `Text message`,
                                        placeholder: "Enter title",
                                        col: 20,
                                    },
                                ]}
                            />
                        </Col>
                        <Col span={24}>
                            <StaticListOptionReplicate
                                children={
                                    <Flex align='center' justify='space-between' className='w-100' gap={5}>
                                        <Text>Request Name</Text>
                                        <PlusCircleOutlined className='fs-16 text-brand' />
                                    </Flex>
                                } 
                                form={form}
                                dayKey="requestName"
                                showInputIndex={true}
                                fieldsConfig={[
                                    {
                                        type: "input",
                                        name: "reqName",
                                        label: `Name`,
                                        placeholder: "Enter name",
                                        col: 20,
                                    },
                                ]}
                            />
                        </Col>
                        <Col span={24}>
                            <StaticListOptionReplicate
                                children={
                                    <Flex align='center' justify='space-between' className='w-100' gap={5}>
                                        <Text>Request Phone Number</Text>
                                        <PlusCircleOutlined className='fs-16 text-brand' />
                                    </Flex>
                                } 
                                form={form}
                                dayKey="requestPhoneNo"
                                showInputIndex={true}
                                fieldsConfig={[
                                    {
                                        type: "input",
                                        name: "phoneNo",
                                        label: `Phone Number`,
                                        placeholder: "Enter phone number",
                                        col: 20,
                                    },
                                ]}
                            />
                        </Col>
                        <Col span={24}>
                            <StaticListOptionReplicate
                                children={
                                    <Flex align='center' justify='space-between' className='w-100' gap={5}>
                                        <Text>Request Date</Text>
                                        <PlusCircleOutlined className='fs-16 text-brand' />
                                    </Flex>
                                } 
                                form={form}
                                dayKey="requestDate"
                                showInputIndex={true}
                                fieldsConfig={[
                                    {
                                        type: "date",
                                        name: "datereq",
                                        label: `Date`,
                                        placeholder: "Choose date",
                                        col: 20,
                                    },
                                ]}
                            />
                        </Col>
                        <Col span={24}>
                            <StaticListOptionReplicate
                                children={
                                    <Flex align='center' justify='space-between' className='w-100' gap={5}>
                                        <Text>Request Time</Text>
                                        <PlusCircleOutlined className='fs-16 text-brand' />
                                    </Flex>
                                } 
                                form={form}
                                dayKey="requestTime"
                                showInputIndex={true}
                                fieldsConfig={[
                                    {
                                        type:'time',
                                        name: "timereq",
                                        label: `Date`,
                                        placeholder: "Choose time",
                                        col: 20,
                                    },
                                ]}
                            />
                        </Col>
                        <Col span={24}>
                            <StaticListOptionReplicate
                                children={
                                    <Flex align='center' justify='space-between' className='w-100' gap={5}>
                                        <Text>Request Note</Text>
                                        <PlusCircleOutlined className='fs-16 text-brand' />
                                    </Flex>
                                } 
                                form={form}
                                dayKey="reqNote"
                                showInputIndex={true}
                                fieldsConfig={[
                                    {
                                        type: "textarea",
                                        name: "note",
                                        label: `Note`,
                                        placeholder: "Enter note",
                                        col: 20,
                                    },
                                ]}
                            />
                        </Col>
                        <Col span={24}>
                            <StaticListOptionReplicate
                                children={
                                    <Flex align='center' justify='space-between' className='w-100' gap={5}>
                                        <Text>Multiple Choice</Text>
                                        <PlusCircleOutlined className='fs-16 text-brand' />
                                    </Flex>
                                } 
                                form={form}
                                dayKey="multiplechoice"
                                showInputIndex={true}
                                fieldsConfig={[
                                    {
                                        type:'multiplechoice',
                                        name: "choice",
                                        label: `Multiple Choice`,
                                        placeholder: "Enter title",
                                        col: 20,
                                        innerFields:[
                                            {
                                                name: "option1",
                                            },
                                            {
                                                name: "option2",
                                            },
                                        ]
                                    }
                                ]}
                            />
                        </Col>
                        <Col span={24}>
                            <StaticListOptionReplicate
                                children={
                                    <Flex align='center' justify='space-between' className='w-100' gap={5}>
                                        <Text>Dropdown</Text>
                                        <PlusCircleOutlined className='fs-16 text-brand' />
                                    </Flex>
                                } 
                                form={form}
                                dayKey="dropdownchoice"
                                showInputIndex={true}
                                fieldsConfig={[
                                    {
                                        type:'multiplechoice',
                                        name: "dropdownchoice",
                                        label: `Multiple Choice`,
                                        placeholder: "Enter title",
                                        col: 20,
                                        innerFields:[
                                            {
                                                name: "option1",
                                            },
                                            {
                                                name: "option2",
                                            },
                                        ]
                                    }
                                ]}
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
        </Drawer>
    )
}

export { AddFormFieldsDrawer }