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
        { label: <NavLink to={''}>2024</NavLink>, key: 0 },
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
            data: [20, 40, 60, 45, 75, 90, 55,30,43, 60, 44, 50],
          },
          {
            name: 'Old Customers Bookings',
            data: [10, 30, 45, 25, 60, 75, 50,25,38, 55, 53, 40],
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
              'Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'
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
              <ModuleTopHeading level={5} name='Booking by Customer Type' />
              <Text className='text-gray fs-13'>Old vs New Customers Bookings</Text>
            </Flex>
            <Flex justify='end' gap={10}>
              <Dropdown
                menu={{ items, onClick }}
                trigger={['click']}
                className='margin-top'
              >
                <Button className='btncancel pad-x fs-13'>
                    <Space size={10}>
                        {
                            order == 0 ? '2024' : ''
                        }  
                        <DownOutlined className='fs-12' />
                    </Space>
                </Button>
              </Dropdown>
            </Flex>
        </Flex>
        <Row gutter={[24,24]} >
          <Col span={24}>
            <Flex gap={15} align='center' wrap className='my-4 h-40'>
              <Flex gap={15} align='center'>
                  <Image src='/assets/icons/newcust-ar.webp' width={40} alt='new customer icon' fetchPriority="high" />
                  <Flex vertical>
                      <Text className='text-gray fs-15'>New Customers</Text>
                      <Title className='fw-600 m-0' level={4}>
                          190
                      </Title>
                  </Flex>
              </Flex>
              <Divider type='vertical' className='h-100'/>
              <Flex gap={15} align='center'>
                  <Image src='/assets/icons/oldcust-ar.webp' width={40} alt='old customer icon' fetchPriority="high" />
                  <Flex vertical>
                      <Text className='text-gray fs-15'>Old Customers</Text>
                      <Title className='fw-600 m-0' level={4}>
                          78
                      </Title>
                  </Flex>
              </Flex>
            </Flex>
          </Col>
          <Col span={24}>
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              height={300}  
              width={'100%'}
              className='bar-width'
            />
          </Col>
        </Row>
      </Card>
  );
};

export { BookingCustomerBarChart };
