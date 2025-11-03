import React, { useState, useEffect } from 'react';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import { Layout, Menu, Image, Space, Divider, Flex, Typography, Button } from 'antd';
import { Notifications, UserDropdown } from '../../components/Header';
import { Dashboard } from '../Dashboard';
import { SearchInput } from '../../components/Forms';
import { CustomersPage } from '../CustomersPage';
import { SingleViewCustomer, } from '../../components';
import { SettingsPage } from '../SettingsPage';
import { BookingPage } from '../BookingPage';
import { MenuItems } from './MenuItems';


const { Header, Sider, Content } = Layout;
const { Text } = Typography
const Sidebar = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState('1');
  const [openKeys, setOpenKeys] = useState(['']);
  
  useEffect(() => {
    let tab = location?.pathname?.split("/")[1];
    tab = tab === '' ? '1' :
      tab === 'customers' || tab === 'customers/singledetails' ? '2' :

      tab === 'booking' ? '3'  :
      tab === 'settingpages' ? '5'  :
    '1';
    setCurrentTab(tab);
    
  }, [location]);

  const handleMenuClick = (e) => {
    const { key } = e;
    switch (key) {
      case '1':
        navigate("/", { replace: true });
        break;
      case '2':
        navigate("/customers", { replace: true });
        break;
      case '3':
        navigate("/booking", { replace: true });
        break;
      case '5':
        navigate("/settingpages", { replace: true });
        break;
      
      default:
        break;
    }
  };

  const menuItems = MenuItems({ currentTab });
 
  const onOpenChange = (keys) => {
    setOpenKeys(keys);
    // localStorage.setItem('openKeys', JSON.stringify(keys));
  };
  return (
    <Layout className='h-100vh'>
      <Sider breakpoint="md"
        collapsedWidth="0"
        width={250}
        onBreakpoint={(broken) => {
          setCollapsed(broken)
        }} trigger={null} collapsible collapsed={collapsed} className={collapsed ? 'addclass overflowstyle h-100vh overflowy-auto border-right-side' :'overflowstyle h-100vh overflowy-auto border-right-side'}>
        <Flex className="logo" align='center' gap={10}>
          <Image
            style={{ width: collapsed ? "40px" : '40px' }}
            height={'auto'}
            src="/assets/images/logo.webp"
            alt='logo image'
            preview={false}
            fetchPriority="high"
          />
          {/* <Text strong className='fs-14'>The Nail lounge</Text> */}
        </Flex>
        <Divider className='m-0 bg-divider' />
        <Menu
          defaultSelectedKeys={['1']}
          selectedKeys={[currentTab]}
          mode="inline"
          theme="dark"
          onClick={handleMenuClick}
          onOpenChange={onOpenChange}
          openKeys={openKeys}
          items={menuItems}
          className='listitem'
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background header-mbl-cs header"
        >
          <div className='position-relative w-98per'>
            <Flex justify='space-between' align='center' gap={5} className='flex-col-mbl'>
              <Space className='mbl-space'>
                <Button type='button' className='bg-transparent border-0 p-0' onClick={() => setCollapsed(!collapsed)}>
                  <Image src='/assets/icons/collapse.webp' 
                    width={'25px'} preview={false} 
                    style={{transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)'}}  
                    alt='collapse icon' fetchPriority="high"
                  />
                </Button>
                <SearchInput  
                  prefix={<img src='/assets/icons/search.webp' width={20} />}
                  placeholder={'Search'} alt='search icon' fetchPriority="high"
                />
              </Space>
              <Flex justify='space-between' align='center' className='w-100 flex-end'>
                <Button type='button' className='bg-transparent border-0 p-0 d-none' onClick={() => setCollapsed(!collapsed)}>
                  <Image src='/assets/icons/collapse.webp' 
                    width={'25px'} preview={false} 
                    style={{transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)'}} 
                    alt='collapse icon' fetchPriority="high" 
                  />
                </Button>  
                <Space size={15} align='center' className='right'> 
                  <Notifications />
                  <UserDropdown />
                </Space>
              </Flex>
            </Flex>
          </div>
        </Header>
        <Divider className='border-gray m-0' />
        <Content className="scroll-bar content-css">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/customers/singledetails/:id" element={<SingleViewCustomer />} />
            <Route path="/settingpages" element={<SettingsPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export {Sidebar};
