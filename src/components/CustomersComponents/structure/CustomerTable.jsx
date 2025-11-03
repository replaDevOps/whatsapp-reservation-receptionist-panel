import { useState } from 'react';
import { Card, Flex, Table, Typography, Row, Col, Form, notification } from 'antd';
import { ModuleTopHeading } from '../../PageComponent';
import { CustomPagination } from '../../Ui';
import { customerColumn, customertableData } from '../../../data';
import { SearchInput } from '../../Forms';
import { AddCustomer } from '../modal';

const { Text } = Typography;

const CustomerTable = () => {

    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [ addmodal, setAddModal ] = useState(false)
    const [toater, contextHolder] = notification.useNotification();

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };


    
    return (
        <>
            {contextHolder}
            <Card className='radius-12 card-cs border-gray h-100'>
                <Flex vertical gap={10} className='mb-2'>
                    <Flex justify='space-between' align='center' gap={10}>
                        <Flex vertical>
                            <ModuleTopHeading level={4} name='Customers' />
                            <Text className='text-gray fs-13'>Manage all the Customers in your system</Text>
                        </Flex>
                    </Flex>
                    <Form layout="vertical" form={form}>
                        <Row gutter={[16, 16]}>
                            <Col span={24} md={24} lg={7}>
                                <SearchInput
                                    name='name'
                                    placeholder='Search by Phone Number / Customer Name'
                                    // value={search}
                                    // onChange={(e) => {
                                    //     setSearch(e.target.value);
                                    // }}
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
                        columns={customerColumn({setAddModal})}
                        dataSource={customertableData}
                        className='pagination table-cs table'
                        showSorterTooltip={false}
                        scroll={{ x: 1000 }}
                        rowHoverable={false}
                        pagination={false}
                        // loading={isLoading}
                    />
                    <CustomPagination 
                        total={12}
                        current={current}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </Flex>
            </Card>

            <AddCustomer
            visible={addmodal}
            onClose={()=>setAddModal(false)}
            />
        </>
    );
};

export { CustomerTable };