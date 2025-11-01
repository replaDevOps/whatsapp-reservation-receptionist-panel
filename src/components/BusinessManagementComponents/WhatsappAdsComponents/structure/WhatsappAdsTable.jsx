import { useState } from 'react';
import { Button, Card, Dropdown, Flex, Table, Typography, Row, Col, Form } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { ModuleTopHeading } from '../../../PageComponent';
import { CustomPagination, DeleteModal } from '../../../Ui';
import { whatsappadsColumn, whatsappadsData } from '../../../../data';
import { MyDatepicker, SearchInput } from '../../../Forms';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;
const WhatsappAdsTable = () => {

    const [form] = Form.useForm();
    const [pageSize, setPageSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [selectedType, setselectedType] = useState('');
    const [selectedYear, setSelectedYear] = useState(moment());
    const navigate = useNavigate();
    const [ deleteitem, setDeleteItem ] = useState(false)


    const actionItems = [
        { key: 'all', label: 'All' },
        { key: 'old', label: 'Old' },
        { key: 'new', label: 'New' },
    ];

    const handlePageChange = (page, size) => {
        setCurrent(page);
        setPageSize(size);
    };

    const handleActionClick = ({ key }) => {
        setselectedType(key);
    };
    
    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100'>
                <Flex vertical gap={10} className='mb-2'>
                    <Flex align='center' justify='space-between' gap={10}>
                        <Flex vertical>
                            <ModuleTopHeading level={4} name='WhatsApp Ad’s' />
                            <Text className='text-gray fs-13'>Manage all the WhatsApp Targeting Ad’s in your system</Text>
                        </Flex>
                        <Button className='btncancel' onClick={()=>navigate('/addwhatsappads')}> 
                          <PlusOutlined /> Add Ad
                        </Button>
                    </Flex>
                    <Form layout="vertical" form={form}>
                        <Row gutter={[16, 16]} justify="space-between" align="middle">
                            <Col xl={14} md={24} span={24}>        
                                <Row gutter={[16, 16]}>
                                    <Col span={24} md={24} lg={12}>
                                        <SearchInput
                                            name='name'
                                            placeholder='Search by Ad Name'
                                            // value={search}
                                            // onChange={(e) => {
                                            //     setSearch(e.target.value);
                                            // }}
                                            prefix={<img src='/assets/icons/search.webp' width={14} alt='search icon' fetchPriority="high" />}
                                            className='border-light-gray pad-x ps-0 radius-8 fs-13'
                                        />
                                    </Col>
                                    <Col span={24} lg={12}>
                                        <Dropdown
                                            menu={{
                                                items: actionItems.map((item) => ({
                                                    key: String(item.key),
                                                    label: item.label
                                                })),
                                                onClick: handleActionClick
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button className="btncancel px-3 filter-bg fs-13 text-black">
                                                <Flex justify="space-between" align="center" gap={30}>
                                                    {actionItems.find((i) => i.key === selectedType)?.label || "Customer Type"}
                                                    <DownOutlined />
                                                </Flex>
                                            </Button>
                                        </Dropdown>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24} md={24} xl={7}>
                                <Flex justify='end' gap={10}>
                                    <MyDatepicker
                                        withoutForm
                                        rangePicker
                                        className="datepicker-cs"
                                        placeholder="Select Year"
                                        value={selectedYear}
                                        onChange={(year) => setSelectedYear(year)}
                                    />
                                </Flex>
                            </Col>
                        </Row>
                    </Form>
                </Flex>
                <Flex vertical gap={20}>
                    <Table
                        size='large'
                        columns={whatsappadsColumn({navigate, setDeleteItem})}
                        dataSource={whatsappadsData}
                        className='pagination table-cs table'
                        showSorterTooltip={false}
                        scroll={{ x: 1300 }}
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

            <DeleteModal 
                visible={deleteitem}
                title={'Are you sure?'}
                subtitle={'This action cannot be undone. Are you sure you want to delete this Ad?'}
                onClose={()=>setDeleteItem(false)}
            />
        </>
    );
};

export { WhatsappAdsTable };