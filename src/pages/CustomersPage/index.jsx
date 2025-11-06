import { Flex } from 'antd'
import { BreadCrumbCard, CustomerTable } from '../../components'
import { useTranslation } from 'react-i18next'
const CustomersPage = () => {
    const {t}= useTranslation();
    return (
        <Flex vertical gap={10}>
            <BreadCrumbCard 
                items={[
                    {title:t('Business Management')},
                    {title:t('Customers')}
                ]}
            />
            <CustomerTable />
        </Flex>
    )
}

export {CustomersPage}