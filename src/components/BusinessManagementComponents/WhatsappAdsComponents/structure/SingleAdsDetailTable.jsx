import { Flex, Table } from 'antd'
import { CustomPagination } from '../../../Ui'
import { useState } from 'react'
import { customersearchColumn, whatsappadscustomersearchData } from '../../../../data'

const SingleAdsDetailTable = () => {

    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    return (
        <Flex vertical gap={20} className='mt-3'>
            <Table
                size='large'
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
    )
}

export {SingleAdsDetailTable}