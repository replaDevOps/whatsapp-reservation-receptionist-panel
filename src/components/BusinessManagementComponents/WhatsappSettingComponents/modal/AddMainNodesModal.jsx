import { CloseOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Modal, Typography } from 'antd'

const { Title } = Typography
const AddMainNodesModal = ({visible,onClose,setAddTextNode,setAddListNode,setAddTextButton, setAddRequestUser, setInsertFlow, setAddFormField}) => {

    return (
        <Modal
            title={null}
            open={visible}
            onCancel={onClose}
            closeIcon={false}
            centered
            footer={null}
        > 
            <Flex vertical gap={10}>
                <Flex vertical gap={0}>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            Choose one of them.
                        </Title>
                        <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex>    
                </Flex>
                <Flex vertical gap={5} align='flex-start'>
                    <Button
                        type="button"
                        className="btncancel w-100 px-3"
                        onClick={() => {setAddTextNode(true);onClose()}}
                    >
                        <Flex align='center' gap={5} className='w-100'>
                            <img src="/assets/icons/textarea-only.webp" width={18} alt="text area icon" fetchPriority="high" />
                            Text Message
                        </Flex>
                    </Button>
                    <Button
                        type="button"
                        className="btncancel w-100 px-3"
                        onClick={() => {setAddListNode(true);onClose()}}
                    >
                        <Flex align='center' gap={5} className='w-100'>
                            <img src="/assets/icons/textmsg-op.webp" width={18} alt="text list icon" fetchPriority="high" />
                            Text Message with Options
                        </Flex>
                    </Button>
                    <Button
                        type="button"
                        className="btncancel w-100 px-3"
                        onClick={() => {setAddTextButton(true);onClose()}}
                    >
                        <Flex align='center' gap={5} className='w-100'>
                            <img src="/assets/icons/textmsg-btn.webp" width={18} alt="text button icon" fetchPriority="high" />
                            Text Message with Buttons
                        </Flex>
                    </Button>
                    <Button
                        type="button"
                        className="btncancel w-100 px-3"
                        onClick={() => {setInsertFlow(true);onClose()}}
                    >
                        <Flex align='center' gap={5} className='w-100'>
                            <img src="/assets/icons/insert-flow.webp" width={18} alt='insert flow icon' fetchPriority="high" />
                            Insert Flow
                        </Flex>
                    </Button>
                    <Button
                        type="button"
                        className="btncancel w-100 px-3"
                        onClick={() => {setAddRequestUser(true);onClose()}}
                    >
                        <Flex align='center' gap={5} className='w-100'>
                            <img src="/assets/icons/required-data.webp" width={18} alt='required data icon' fetchPriority="high" />
                            Required Data from User
                        </Flex>
                    </Button>
                    <Button
                        type="button"
                        className="btncancel w-100 px-3"
                        onClick={() => {setAddFormField(true);onClose()}}
                    >
                        <Flex align='center' gap={5} className='w-100'>
                            <img src="/assets/icons/form.webp" width={18} alt='form icon' fetchPriority="high" />
                            Form
                        </Flex>
                    </Button>
                </Flex>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {AddMainNodesModal}