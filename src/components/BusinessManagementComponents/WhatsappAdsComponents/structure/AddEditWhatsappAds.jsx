import { useEffect, useState } from 'react'
import { ArrowLeftOutlined, EditFilled } from '@ant-design/icons'
import { Button, Card, Col, Divider, Flex, Form, Row, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { MyInput, SingleFileUpload } from '../../../Forms'
import { whatsappadsData } from '../../../../data'
import { CustomerSearchTable } from './CustomerSearchTable'
import { BreadCrumbCard } from '../../../Ui'

const { Title } = Typography
const AddEditWhatsappAds = () => {

    const navigate = useNavigate()
    const [form] = Form.useForm();
    const { id } = useParams()
    const editdetail = whatsappadsData?.find((list)=>list?.key === Number(id))
    const [ previewimage, setPreviewImage ] = useState(null)


    useEffect(()=>{
        if(id && editdetail){
            form.setFieldsValue({
                adName: editdetail?.title,
                targetDate: editdetail?.targetDate,
                description: editdetail?.adtext,
            })
            setPreviewImage(editdetail?.img)
        }
    },[id, editdetail])

    const handleChangeImage = () => {
        setPreviewImage(null);
    };

    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    {title:'Business Management'},
                    {title:'Whatsapp Ad’s'}
                ]}
            />
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} vertical>
                    <Flex gap={10} align="center">
                        <Button className="border-0 p-0 bg-transparent" onClick={() => navigate("/whatsappads")}>
                            <ArrowLeftOutlined />
                        </Button>
                        <Title level={4} className="fw-500 m-0">{ editdetail ? 'Edit Ad' : 'Add Ad' }</Title>
                    </Flex>
                    <Form layout="vertical" 
                        form={form} 
                        // onFinish={} 
                        requiredMark={false}
                    >
                        <Row gutter={16}>
                            <Col span={24} className='my-5'>
                                {
                                    !previewimage ?
                                    <SingleFileUpload
                                        name="document"
                                        title="Upload Image"
                                        form={form}
                                        onUpload={(file) => console.log("uploading:", file)}
                                        align="center"
                                    />
                                    :
                                    <Flex vertical gap={5} justify='center' align='center'>
                                        <img
                                            src={previewimage}
                                            alt="Category"
                                            className='radius-12 mxw-mxh'
                                            fetchPriority="high"
                                        />
                                        <div>
                                            <Button type="link" className='fs-13 text-brand' onClick={handleChangeImage}>
                                                <EditFilled /> Edit
                                            </Button>
                                        </div>
                                    </Flex>

                                }
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label="Ad Name" 
                                    name="adName" 
                                    required 
                                    message="Please enter ad name" 
                                    placeholder="Enter ad name" 
                                />
                            </Col>
                            <Col span={24} md={12}>
                                <MyInput 
                                    label="Target Date" 
                                    name="targetDate" 
                                    required 
                                    message="Please enter target date" 
                                    placeholder="Select target date" 
                                />
                            </Col>
                            <Col span={24}>
                                <MyInput 
                                    textArea
                                    label="Description" 
                                    name="description" 
                                    required 
                                    message="Please enter description" 
                                    placeholder="Write ad description" 
                                />
                            </Col>                            
                            <Col span={24}>
                                <Divider className='bg-divider' />
                            </Col>
                            <Col span={24}>
                                <CustomerSearchTable />
                            </Col>
                            <Col span={24}>
                                <Divider className='bg-divider' />
                            </Col>
                            <Col span={24}>
                                <Flex justify='end' gap={5} >
                                    <Button type='button' className='btncancel text-black border-gray' >
                                        Cancel
                                    </Button>
                                    <Button htmlType="submit" className={`btnsave border-0 text-white brand-bg`}>
                                        Confirm
                                    </Button>
                                </Flex>
                            </Col>
                        </Row>
                    </Form>
                </Flex>
            </Card>
        </Flex>
    )
}

export {AddEditWhatsappAds}