import { CloseOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Dropdown, Flex, Tag, Tooltip, Typography } from 'antd'
import moment from "moment";
import { NavLink } from 'react-router-dom';

const { Text } = Typography
const StaffBookingDetailPop = ({data,colorstatus}) => {
    console.log(data)
    
    const startTime = moment(data.start).format("MM/DD/YYYY");
    const endTime = moment(data.end).format("MM/DD/YYYY");
    console.log('name',data?.name)

    const stopEvents = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };

    return (
        <Flex vertical gap={8}>
            <Flex justify='space-between' gap={5} className="h-100 w-100">
                <Flex gap={5} align="center">
                    <Avatar src={data?.img} className='shrink-0' />
                    <Flex vertical>
                        <Text className="fs-13 fw-500">{data?.name}</Text>
                        <Text className="fs-10 text-gray">{data?.type}</Text>
                    </Flex>
                </Flex>
                <Flex gap={3}>
                    {
                        data?.status === 'pending' &&
                        <Dropdown
                            menu={{
                                items: [
                                    { label: <NavLink onMouseDown={stopEvents} onClick={(e) => {e.preventDefault()}}>Accept</NavLink>, key: '1' },
                                    { label: <NavLink onMouseDown={stopEvents} onClick={(e) => {e.preventDefault()}}>Reject</NavLink>, key: '2' },
                                ],
                            }}
                            getPopupContainer={(trigger) => trigger.parentNode} 
                            trigger={['click']}
                        >
                            <Button 
                                className="bg-transparent border-0 p-0"
                                onMouseDown={stopEvents}
                            >
                                <img src="/assets/icons/dots.webp" alt='dots icon' fetchPriority="high" width={16} />
                            </Button>
                        </Dropdown>
                    }
                    <Button className='p-0 bg-transparent border-0'>
                        <CloseOutlined />
                    </Button>
                </Flex>
            </Flex>
            <Divider variant="dashed" className='border-dark m-0' />
            <Flex vertical gap={5}>
                <Flex gap={8} align='center'>
                    <Tooltip title='Duration' 
                        color={colorstatus} 
                        styles={{body:{fontSize: 11,minHeight: 15,padding: '4px 6px', color:'#fff'}}}
                    >
                        <img src='/assets/icons/service-calendar.webp' width={14} alt='time icon' fetchPriority="high" />
                    </Tooltip>
                    <Flex wrap gap={2}>
                        {
                            data?.service?.map((list,i)=>
                                <Tag key={i} className='text-gray fs-10'>{list}</Tag>
                            )
                        }
                    </Flex>
                </Flex>
            </Flex>
            <Divider variant="dashed" className='border-dark m-0' />
            <Flex vertical gap={5}>
                <Flex gap={8} align='center'>
                    <Tooltip title='Calendar' 
                        color={colorstatus} 
                        styles={{body:{fontSize: 11,minHeight: 15,padding: '4px 6px', color:'#fff'}}}
                    >
                        <img src='/assets/icons/calendar.webp' width={14} alt='calendar icon' fetchPriority="high" />
                    </Tooltip>
                    <Text className='text-gray fs-12'>{startTime}</Text>
                    -
                    <Text className='text-gray fs-12'>{endTime}</Text>
                </Flex>
            </Flex>
            <Divider variant="dashed" className='border-dark m-0' />
            <Flex gap={8} align='center'>
                <Tooltip title='Status' 
                    color={colorstatus} 
                    styles={{body:{fontSize: 11,minHeight: 15,padding: '4px 6px', color:'#fff'}}}
                >
                    <img src='/assets/icons/status.webp' width={14} alt='status icon' fetchPriority="high" />
                </Tooltip>
                <Text className='fs-12' style={{color: colorstatus}}>
                    {t(data?.status?.charAt(0).toUpperCase() + data?.status?.slice(1))}
                </Text>
            </Flex>
        </Flex>
    )
}

export {StaffBookingDetailPop}