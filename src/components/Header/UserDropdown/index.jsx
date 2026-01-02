
import { useState } from 'react'
import { Avatar, Button, Card, Dropdown, Flex, Space, Typography,message } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { getBusinessImage, getBusinessName } from '../../../utils/auth';
import { getInitials } from '../../../shared';
const UserDropdown = ()=> {
  const [messageApi, contextHolder] = message.useMessage();
  const [ loading, setLoaing ] = useState(false)
  const {t}= useTranslation();
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    window.location.href = "/login";
  };

  const dropdownContent = (
    <Card className='radius-12 shadow-c card-cs'>
      <Space direction='vertical'> 
        <Flex align='center' gap={10}>
          {
            getBusinessImage() ?
            <Avatar size={44} src={getBusinessImage()} alt='business image' fetchPriority="high" />
            :
            <Avatar size={40} className='fs-14 text-white fw-bold brand-bg'>
              {getInitials(getBusinessName())}
            </Avatar>
          }
          <Flex vertical gap={1}>
            <Typography.Text strong className='fs-13'>{getBusinessName() ? getBusinessName() : ''}</Typography.Text>
            <Typography.Text className='text-gray fs-13'>{t('Receptionist')}</Typography.Text>
          </Flex>
        </Flex>
        <Button className='btnsave w-100'
          type='primary' 
          loading={loading}
          onClick={handleLogout}
          >
            {t('Logout')}
        </Button>
      </Space>
    </Card>
);
  return (
    <>
    {contextHolder}
    <div>
      <Dropdown
          popupRender={()=>dropdownContent}
          trigger={['click']}
          className='p-0'
      >
        <Flex align='center' gap={5} className='cursor'>
          {
            getBusinessImage() ?
            <Avatar size={44} src={getBusinessImage()} alt='business image' fetchPriority="high" />
            :
            <Avatar size={40} className='fs-14 text-white fw-bold brand-bg'>
              {getInitials(getBusinessName()) || "?"}
            </Avatar>
          }
          <Flex align='flex-start' gap={5}>
            <Flex vertical gap={0} align='end'>
              <Typography.Text strong className='fs-12'>{getBusinessName() ? getBusinessName() : ''}</Typography.Text>
              <Typography.Text className='text-gray fs-12'>{t('Receptionist')}</Typography.Text>
            </Flex>
            <DownOutlined className='fs-12 py-1' />
          </Flex>
        </Flex>
      </Dropdown>
      {/* <SwitchAccount 
          visible={switchAccount}
          onClose={()=>{setSwitchAccount(false)}}
        /> */}
    </div>
    </>
  )
}

export {UserDropdown}