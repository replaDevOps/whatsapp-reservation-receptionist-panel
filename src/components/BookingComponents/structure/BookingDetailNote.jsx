import { Divider, Flex, Tooltip, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
const { Text } = Typography
const BookingDetailNote = ({data,colorstatus}) => {
   const {t} = useTranslation();
    return (
        <Flex vertical gap={8}>
            <Tooltip title='Service' 
                color={colorstatus} 
                styles={{body:{fontSize: 11,minHeight: 15,padding: '4px 6px',color:'#fff'}}}
            >
                <Text className='text-center fs-12' style={{color: colorstatus}}>{data?.service}</Text>
            </Tooltip>
            <Divider variant="dashed" className='border-dark m-0' />
            <Flex vertical gap={5}>
                <Flex gap={8} align='center'>
                    <Tooltip title='User' 
                        color={colorstatus} 
                        styles={{body:{fontSize: 11,minHeight: 15,padding: '4px 6px',color:'#fff'}}}
                    >
                        <img src='/assets/icons/user.webp' width={14} alt='user icon' fetchPriority="high" />
                    </Tooltip>
                    <Text className='text-gray fs-12'>{data?.name}</Text>
                </Flex>
                <Flex gap={8} align='center'>
                    <Tooltip title='Phone' 
                        color={colorstatus} 
                        styles={{body:{fontSize: 11,minHeight: 15,padding: '4px 6px', color:'#fff'}}}
                    >
                        <img src='/assets/icons/call.webp' width={14} alt='call icon' fetchPriority="high" />
                    </Tooltip>
                    <Text className='text-gray fs-12'>{data?.phoneno}</Text>
                </Flex>
            </Flex>
            <Divider variant="dashed" className='border-dark m-0' />
            <Flex vertical gap={5}>
                <Flex gap={8} align='center'>
                    <Tooltip title='Duration' 
                        color={colorstatus} 
                        styles={{body:{fontSize: 11,minHeight: 15,padding: '4px 6px', color:'#fff'}}}
                    >
                        <img src='/assets/icons/time.webp' width={14} alt='time icon' fetchPriority="high" />
                    </Tooltip>
                    <Text className='text-gray fs-12'>{data?.duration}</Text>
                </Flex>
                <Flex gap={8} align='center'>
                    <Tooltip title='Currency' 
                        color={colorstatus} 
                        styles={{body:{fontSize: 11,minHeight: 15,padding: '4px 6px', color:'#fff'}}}
                    >
                        <img src='/assets/icons/symbol.webp' width={14} alt='currency icon' fetchPriority="high" />
                    </Tooltip>
                    <Flex gap={5} align='center'>
                        <Text className='text-gray fs-12'>{t('SAR')}{data?.amount}</Text>
                        {
                            data?.off && <Text delete className='fs-10'>{t('SAR')}{data?.off}</Text>
                        }
                    </Flex>
                </Flex>
                {
                    data?.offer && 
                    <Flex gap={8} align='center'>
                        <Tooltip title='Offer' 
                            color={colorstatus} 
                            styles={{body:{fontSize: 11,minHeight: 15,padding: '4px 6px', color:'#fff'}}}
                        >
                            <img src='/assets/icons/offer.webp' width={14} alt='offer icon' fetchPriority="high" />
                        </Tooltip>
                        <Text className='text-gray fs-12'>{data?.offer}</Text>
                    </Flex>
                }
            </Flex>
            <Divider variant="dashed" className='border-dark m-0' />
            <Flex vertical gap={5}>
                <Flex gap={10}>
                    <Flex gap={8} align='center'>
                        <Tooltip title='Calendar' 
                            color={colorstatus} 
                            styles={{body:{fontSize: 11,minHeight: 15,padding: '4px 6px', color:'#fff'}}}
                        >
                            <img src='/assets/icons/calendar.webp' width={14} alt='calendar icon' fetchPriority="high" />
                        </Tooltip>
                        <Text className='text-gray fs-12'>{data?.date}</Text>
                    </Flex>
                    <Flex gap={8} align='center'>
                        <Tooltip title='Clock' 
                            color={colorstatus} 
                            styles={{body:{fontSize: 11,minHeight: 15,padding: '4px 6px', color:'#fff'}}}
                        >
                            <img src='/assets/icons/clock.webp' width={14} alt='clock icon' fetchPriority="high" />
                        </Tooltip>
                        <Text className='text-gray fs-12'>{data?.time}</Text>
                    </Flex>
                </Flex>
                {
                    data?.description &&
                    <Flex gap={8} align='center'>
                        <Tooltip title='Note' 
                            color={colorstatus} 
                            styles={{body:{fontSize: 11,minHeight: 15,padding: '4px 6px', color:'#fff'}}}
                        >
                            <img src='/assets/icons/note.webp' width={14} alt='doc icon' fetchPriority="high" />
                        </Tooltip>
                        <Text className='text-gray fs-12'>{data?.description}</Text>
                    </Flex>
                }
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
                    {data?.status?.charAt(0).toUpperCase() + data?.status?.slice(1)}
                </Text>
            </Flex>
            {
                data?.reason && 
                <Flex gap={8} align='center'>
                    <Tooltip title='Reason' 
                        color={colorstatus} 
                        styles={{body:{fontSize: 11,minHeight: 15,padding: '4px 6px', color:'#fff'}}}
                    >
                        <img src='/assets/icons/reason.webp' width={14} alt='info icon' fetchPriority="high" />
                    </Tooltip>
                    <Text className='text-gray fs-12'>
                        {data?.reason}
                    </Text>
                </Flex>
            }
        </Flex>
    )
}

export {BookingDetailNote}