import { Button, Col, Divider, Flex, Row, Table } from 'antd'
import { customertypeOp } from '../../../../shared'
import { MySelect } from '../../../Forms'
import { CustomPagination } from '../../../Ui'
import { useState } from 'react'
import { customersearchColumn, whatsappadscustomersearchData } from '../../../../data'

const CustomerSearchTable = () => {

    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            name: record.name,
        }),
    };

    return (
        <Row gutter={16}>
            <Col span={24}>
                <MySelect 
                    label={'Branch'}
                    name={'branch'}
                    required
                    message='Please choose branch'
                    options={[
                        {
                            id: 1,
                            name: 'branch 01'
                        },
                        {
                            id: 2,
                            name: 'branch 02'
                        }
                    ]}
                    placeholder='Choose Branch'
                />
            </Col>
            <Col span={24} md={12}>
                <MySelect 
                    label={'Services'}
                    name={'service'}
                    required
                    message='Please choose service'
                    options={[
                        {
                            id: 1,
                            name: 'All'
                        },
                        {
                            id: 2,
                            name: 'Service 01'
                        }
                    ]}
                    placeholder='Choose service'
                />
            </Col>
            <Col span={24} md={12}>
                <MySelect 
                    label={'Customer Type'}
                    name={'customerType'}
                    required
                    message='Please choose customer type'
                    options={customertypeOp}
                    placeholder='Choose customer type'
                />
            </Col>
            <Col span={24}>
                <Divider className='bg-divider' />
            </Col>
            <Col span={24}>
                <Flex justify='end' gap={5} >
                    <Button type='button' className='btncancel text-black border-gray' >
                        Reset
                    </Button>
                    <Button className={`btnsave border-0 text-white brand-bg`}>
                        Search
                    </Button>
                </Flex>
            </Col>
            <Col span={24}>
                <Flex vertical gap={20} className='mt-3'>
                    <Table
                        size='large'
                        rowSelection={rowSelection}
                        columns={customersearchColumn}
                        dataSource={whatsappadscustomersearchData}
                        className='pagination table-cs'
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
            </Col>
        </Row>
    )
}

export {CustomerSearchTable}