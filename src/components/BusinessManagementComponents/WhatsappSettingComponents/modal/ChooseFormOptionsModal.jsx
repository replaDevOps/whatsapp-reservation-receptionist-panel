import { CloseOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Modal, Typography } from 'antd'

const { Title } = Typography
const ChooseFormOptionsModal = ({visible,onClose,setAddTextNode,setAddListNode,setAddTextButton, setAddRequestUser, setInsertFlow, setAddFormField}) => {

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
                        className="btncancel w-100 px-3 justify-start"
                        onClick={() => {}}
                    >
                        Text Message
                    </Button>
                    <Button
                        type="button"
                        className="btncancel w-100 px-3 justify-start"
                        onClick={() => {}}
                    >
                        Request Name
                    </Button>
                    <Button
                        type="button"
                        className="btncancel w-100 px-3 justify-start"
                        onClick={() => {}}
                    >
                        Request Phone Number
                    </Button>
                    <Button
                        type="button"
                        className="btncancel w-100 px-3 justify-start"
                        onClick={() => {}}
                    >
                        Request Date
                    </Button>
                    <Button
                        type="button"
                        className="btncancel w-100 px-3 justify-start"
                        onClick={() => {}}
                    >
                        Request Time
                    </Button>
                    <Button
                        type="button"
                        className="btncancel w-100 px-3 justify-start"
                        onClick={() => {}}
                    >
                        Request Note
                    </Button>
                    <Button
                        type="button"
                        className="btncancel w-100 px-3 justify-start"
                        onClick={() => {}}
                    >
                        Multiple Choice
                    </Button>
                    <Button
                        type="button"
                        className="btncancel w-100 px-3 justify-start"
                        onClick={() => {}}
                    >
                        Dropdown
                    </Button>
                </Flex>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {ChooseFormOptionsModal}