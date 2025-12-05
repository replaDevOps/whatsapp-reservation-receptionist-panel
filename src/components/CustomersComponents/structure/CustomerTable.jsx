import { useEffect, useState } from 'react';
import { Card, Flex, Table, Typography, Row, Col, Form, notification } from 'antd';
import { ModuleTopHeading } from '../../PageComponent';
import { CustomPagination } from '../../Ui';
import { customerColumn, customertableData } from '../../../data';
import { SearchInput } from '../../Forms';
import { AddCustomer } from '../modal';
import { useTranslation } from 'react-i18next';
import { useLazyQuery } from '@apollo/client/react';
import { GET_CUSTOMERS } from '../../../graphql/query';
import { TableLoader, useDebounce } from '../../../shared';
const { Text } = Typography;

const CustomerTable = () => {
    const { t,i18n} = useTranslation();
    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [addmodal, setAddModal] = useState(false)
    const [ customerData, setCustomerData ] = useState([])
    const [ search, setSearch ] = useState('')
    const debouncedSearch = useDebounce(search, 500);
    const [getCustomers, { data, loading}] = useLazyQuery(GET_CUSTOMERS, {
        fetchPolicy: "network-only",
    })
    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    useEffect(()=>{
        if(getCustomers){
            getCustomers({
                variables:{
                    limit: pageSize,
                    offSet: (current - 1) * pageSize,
                    search: debouncedSearch?.trim() || null,
                }
            })
        }
            
    }, [
        getCustomers,
        debouncedSearch,
        current,
        pageSize,
    ])
    useEffect(()=>{
        setCustomerData(data?.getCustomers?.users || []);
    }, [data])

    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100'>
                <Flex vertical gap={10} className='mb-2'>
                    <Flex justify='space-between' align='center' gap={10}>
                        <Flex vertical>
                            <ModuleTopHeading level={4} name={t('Customers')} />
                            <Text className='text-gray fs-13'>{t('Manage all the Customers in your system')}</Text>
                        </Flex>
                    </Flex>
                    <Form layout="vertical" form={form}>
                        <Row gutter={[16, 16]}>
                            <Col span={24} md={24} lg={7}>
                                <SearchInput
                                    name='name'
                                    placeholder={t('Search by Phone Number / Customer Name')}
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                    className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                />
                            </Col>
                        </Row>
                    </Form>
                </Flex>
                <Flex vertical gap={20}>
                    <Table
                        size='large'
                        columns={customerColumn({ setAddModal })}
                        dataSource={customerData}
                        className={ i18n?.language === 'ar' ? 'pagination table-cs table right-to-left' : 'pagination table-cs table left-to-right'}
                        showSorterTooltip={false}
                        scroll={{ x: 1000 }}
                        rowHoverable={false}
                        pagination={false}
                        rowKey={(record)=>record?.id}
                        loading={{
                            ...TableLoader,
                            spinning: loading
                        }}
                    />
                    <CustomPagination
                        total={data?.getCustomers?.totalCount}
                        current={current}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </Flex>
            </Card>

            <AddCustomer
                visible={addmodal}
                onClose={() => setAddModal(false)}
            />
        </>
    );
};

export { CustomerTable };