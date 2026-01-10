import { useState, useEffect } from 'react'
import { CloseOutlined, EditFilled } from '@ant-design/icons'
import { Button, Col, Divider, Flex, Form, Modal, notification, Row, Typography } from 'antd'
import { MyInput, SingleFileUpload } from '../../../Forms'
import { useTranslation } from 'react-i18next'
import { notifyError, notifySuccess, toArabicDigits } from '../../../../shared'
import { UPDATE_USER } from '../../../../graphql/mutation/mutations'
import { useMutation } from '@apollo/client/react'
import imageCompression from 'browser-image-compression';
import { getUserId } from '../../../../utils/auth'

const { Title } = Typography
const EditGeneralSettings = ({visible,onClose,edititem,refetch}) => {
    const {t, i18n} = useTranslation();
    const isArabic = i18n.language === "ar";
    const [form] = Form.useForm();
    const [previewimage, setPreviewImage] = useState(null)
    const userId = getUserId()
    const [api, contextHolder] = notification.useNotification();
    const [ updateUser,  { loading: updaing } ] = useMutation(UPDATE_USER,{
        onCompleted: () => {
            notifySuccess(api,t("Setting update"),t("Setting updated successfully"),()=> {refetch();onClose()})
        },
        onError: (error) => {
            notifyError(api, error);
        },
    })
    useEffect(()=>{
        if(visible && edititem){
            form.setFieldsValue({
                firstName: edititem?.getUser?.firstName,
                lastName: edititem?.getUser?.lastName,
                phone: edititem?.getUser?.phone,
                email: edititem?.getUser?.email,
            });
            setPreviewImage(edititem?.getUser?.imageUrl)
        }
    },[visible,edititem])
    
    const handleChangeImage = () => {
        setPreviewImage(null);
    };
    
    const uploadFileToServer = async (file) => {
        try {
            let compressedFile = file;
    
            // Compress only if image
            if (file.type.startsWith("image/")) {
                compressedFile = await imageCompression(file, {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1024,
                    useWebWorker: true,
                });
            }
    
            const formData = new FormData();
            formData.append("file", compressedFile);
    
            const res = await fetch("https://backend.qloop.me/upload", {
                method: "POST",
                body: formData,
            });
    
            if (!res.ok) throw new Error("Upload failed");
            const data = await res.json();
            setPreviewImage(data.fileUrl);
            return {
                fileName: data.fileName,
                fileType: data.fileType,
                filePath: data.fileUrl,
            };
    
        } catch (err) {
            console.error("Upload error:", err);
            notifyError(api,t("Failed to upload file"))
            throw err;
        }
    };

    const EditGeneralInfo = async () => {
        const input = form.getFieldsValue();
        try {
            if (userId) {
                await updateUser({
                    variables: { 
                        input: { id: userId, imageUrl: previewimage, ...input }
                    }
                });
            } 
        } catch (e) {
            console.error(e);
        }
    };

        
    return (
        <>
            {contextHolder}
            <Modal
                title={null}
                open={visible}
                onCancel={onClose}
                closeIcon={false}
                centered
                footer={
                    <Flex justify='end' gap={5}>
                        <Button type='button' className='btncancel text-black border-gray' onClick={onClose}>
                            {t('Cancel')}
                        </Button>
                        <Button type="primary" loading={updaing} className='btnsave border0 text-white brand-bg' onClick={()=>form.submit()}>
                            {t('Save')}
                        </Button>
                    </Flex>
                }
            > 
                <Flex vertical gap={10}>
                    <Flex justify='space-between' gap={6}>
                        <Title level={5} className='m-0'>
                            {t('General Settings')}
                        </Title>
                        <Button type='button' onClick={onClose} className='p-0 border-0 bg-transparent'>
                            <CloseOutlined className='fs-18' />
                        </Button>
                    </Flex> 
                    <Form layout="vertical" 
                        form={form} 
                        onFinish={EditGeneralInfo} 
                        requiredMark={false}
                    >
                        <Row gutter={16}>
                            <Col span={24} className='my-5'>
                                {
                                    !previewimage ?
                                    <SingleFileUpload
                                        name="document"
                                        title={t('Upload Logo')}
                                        form={form}
                                        onUpload={uploadFileToServer}
                                        align="center"
                                        width={100}
                                        height={100}
                                    />
                                    :
                                    <Flex vertical gap={5} justify='center' align='center'>
                                        <img
                                            src={previewimage}
                                            alt="profile image"
                                            className='radius-12 mxw-mxh'
                                            fetchPriority="high"
                                        />
                                        <div>
                                            <Button type="link" className='fs-13 text-brand' onClick={handleChangeImage}>
                                                <EditFilled /> {t('Edit')}
                                            </Button>
                                        </div>
                                    </Flex>
                                }
                            </Col>
                            <Col span={24}>
                                <MyInput 
                                    label={t('First Name')}
                                    name="firstName" 
                                    required
                                    message={t('Please enter your first name')}
                                    placeholder={t('Enter first name')}
                                />
                            </Col>
                            <Col span={24}>
                                <MyInput 
                                    label={t('Last Name')}
                                    name="lastName" 
                                    required
                                    message={t('Please enter your last name')}
                                    placeholder={t('Enter last name')}
                                />
                            </Col>
                            <Col span={24}>
                                <MyInput
                                    type='number' 
                                    label={t('Phone Number')} 
                                    name="phone" 
                                    required 
                                    message={t('Please enter phone number')}
                                    placeholder={t('Enter phone number')} 
                                    prefix={isArabic ? `+${toArabicDigits(966)}` : '+966'}
                                />
                            </Col>
                            <Col span={24}>
                                <MyInput 
                                    label={t('Email Address')} 
                                    name="email" 
                                    required 
                                    message={t('Please enter email address')} 
                                    placeholder={t('Enter email address')}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Flex>
                <Divider className='my-2 bg-light-brand' />
            </Modal>
        </>
    )
}

export {EditGeneralSettings}