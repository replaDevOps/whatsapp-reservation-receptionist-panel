import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, Row, Typography } from 'antd'
import { MyInput } from '../../../Forms'

const { Title } = Typography
const AddPathModal = ({visible,onClose,edititem,pathData,setPathData}) => {

    const [form] = Form.useForm();
    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                pathName: edititem?.name,
            })
        }
        else {
            form.resetFields()
        }
    },[visible,edititem])

    const handleAddOrEdit = (values) => {
        if (edititem) {
            const updated = pathData.map((item) =>
                item.id === edititem.id ? { ...item, name: values.pathName } : item
            );
        setPathData(updated);
        } else {
        const newId = pathData.length > 0 ? Math.max(...pathData.map((p) => p.id)) + 1 : 1;
        const newEntry = {
            id: newId,
            name: values.pathName,
        };
        setPathData([...pathData, newEntry]);
        }
        onClose();
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
                        {edititem?'Update':'Save'}
                    </Button>
                </Flex>
            }
        > 
            <Flex vertical gap={10}>
                <Flex vertical gap={0}>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            { edititem ? 'Edit Path' : 'Add Path' }
                        </Title>
                        <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex>    
                </Flex>
                <Form layout="vertical" 
                    form={form} 
                    onFinish={handleAddOrEdit} 
                    requiredMark={false}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <MyInput 
                                label="Path Name" 
                                name="pathName" 
                                required 
                                message="Please enter path name" 
                                placeholder="Enter path name" 
                            />
                        </Col>
                    </Row>
                </Form>
            </Flex>
            <Divider className='my-2 bg-light-brand' />
        </Modal>
    )
}

export {AddPathModal}