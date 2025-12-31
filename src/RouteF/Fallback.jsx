import { SyncOutlined } from '@ant-design/icons'
import { Image, Space, Typography } from 'antd'

const Fallback = () => (
  <div className='center w-100 h-100vh'>
    <Space
      direction='vertical'
      align='center'
      className='w-100 h-100 justify-center'
    >
      {/* <Image
        src='/assets/images/logo.webp'
        alt='logo image'
        preview={false}
        fetchPriority="high"
        className='w-150'
      /> */}
      <Typography.Title level={4}>Reservation System Via Whatsapp</Typography.Title>
      <SyncOutlined className='fs-35 text-brand' spin />
    </Space>
  </div>
)

export {Fallback}