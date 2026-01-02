import { useState } from 'react'
import { Button, Card, Col, Flex, Form, Row, Typography } from 'antd'
import { languageopt } from '../../../../shared'
import { MySelect } from '../../../Forms'
import { useTranslation } from 'react-i18next'
import { LanguageChange } from '../../../Ui'

const { Title } = Typography
const LanguageSetting = () => {
const {t} = useTranslation();
    const [form] = Form.useForm();

    return (
        <>
            <Card className='card-bg card-cs radius-12 border-gray'>
                <Flex gap={10} vertical>
                    <Flex gap={10} justify='space-between' align='center'>
                        <Title level={5} className="fw-500 m-0">{t('Language Settings')}</Title>
                    </Flex>
                    <LanguageChange languageClass='btncancel px-3' />
                </Flex>
            </Card>
        </>
    )
}

export {LanguageSetting}