import { useState } from 'react';
import { Button, Card, Col, Divider, Dropdown, Flex, Image, Row, Space, Typography} from 'antd';
import ReactApexChart from 'react-apexcharts';
import { ModuleTopHeading } from '../../PageComponent';
import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const { Title, Text } = Typography
const BookingCustomerBarChart = () => {

    const [order, setOrder] = useState(0);
    const items = [
        { label: <NavLink to={''}>Last 10 days</NavLink>, key: 0 },
    ];

    const onClick = ({ key }) => {
        // key = parseInt(key) + 1;
        setOrder(key);
        // filter(key);
    };
    let yAxisMax = 100;
    const chartData = {
        series: [
          {
            name: 'New Customers Bookings',
            data: [20, 40, 60, 45, 75, 90, 55,30,43, 60],
          },
          {
            name: 'Old Customers Bookings',
            data: [10, 30, 45, 25, 60, 75, 50,25,38, 55],
          },
        ],
        options: {
          chart: {
            type: 'bar',
            toolbar: { show: false },
          },
          dataLabels: { enabled: false },
          stroke: { curve: 'smooth', width: 2, },
          xaxis: {
            categories: [
              '01 Oct','02 Oct','03 Oct','04 Oct','05 Oct','06 Oct','07 Oct','08 Oct','09 Oct','10 Oct',
            ],
            labels: { style: { colors: '#000' } },
          },
          yaxis: {
            min: 0,
            max: yAxisMax,
            tickAmount: 5,
            labels: {
              formatter: (value) => (value),
              style: { colors: '#000' },
            },
          },
          fill: { opacity: 1 },
          grid: { show: true },
          colors: ['#0B6172','#DFE7FF'],
          legend: { show: false },
          plotOptions: {
            bar: {
              borderRadius: 8
            }
          }
        },
      };
    

  return (
    <Card className='radius-12 border-gray card-cs'>
        <Flex justify='space-between' align='flex-start' wrap gap={10}>
            <Flex vertical>
              <ModuleTopHeading level={4} name='Booking by Customer Type' />
              <Text className='text-gray fs-13'>Old vs New Customers Bookings</Text>
            </Flex>
            <Flex justify='end' gap={10}>
              <Dropdown
                menu={{ items, onClick }}
                trigger={['click']}
                className='margin-top'
              >
                <Button className='btncancel fs-13'>
                    <Space>
                        {
                            order == 0 ? 'Last 10 days' : ''
                        }  
                        {/* <DownOutlined /> */}
                    </Space>
                </Button>
              </Dropdown>
            </Flex>
        </Flex>
        <Row gutter={[24,24]} align={'middle'}>
          <Col span={24} lg={18} xl={19}>
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              height={300}
            />
          </Col>
          <Col span={24} lg={6} xl={5}>
            <Flex vertical>
              <Flex gap={15} align='center'>
                <Image src='/assets/icons/newcust-ar.png' width={45} />
                <Flex vertical>
                  <Text className='text-gray fs-16'>New Customers</Text>
                  <Title className='fw-600 m-0' level={3}>
                    190
                  </Title>
                </Flex>
              </Flex>
              <Divider  className='bg-divider'/>
              <Flex gap={15} align='center'>
                <Image src='/assets/icons/oldcust-ar.png' width={45} />
                <Flex vertical>
                  <Text className='text-gray fs-16'>Old Customers</Text>
                  <Title className='fw-600 m-0' level={3}>
                    78
                  </Title>
                </Flex>
              </Flex>
            </Flex>
          </Col>
        </Row>
      </Card>
  );
};

export { BookingCustomerBarChart };
