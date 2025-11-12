import { useState, useEffect } from 'react';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import { Layout, Menu, Image, Space, Divider, Flex, Button, Dropdown } from 'antd';
import { Notifications, UserDropdown } from '../../components/Header';
import { Dashboard } from '../Dashboard';
import { SearchInput } from '../../components/Forms';
import { CustomersPage } from '../CustomersPage';
import { SettingsPage } from '../SettingsPage';
import { BookingPage } from '../BookingPage';
import { MenuItems } from './MenuItems';
import { StaffVacationPage } from '../StaffVacationPage';
import { actionsApi } from '../../shared';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
const Sidebar = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState('1');
  const [openKeys, setOpenKeys] = useState(['']);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()
  const [language, setLanguage] = useState()
  const [selected, setSelected] = useState({
    key: "1",
    label: i18n.language === 'ar' ? 'الإنجليزية' : 'English',
    flag: "https://flagcdn.com/w20/us.png",
  });
  useEffect(() => {
    let lang = localStorage.getItem("lang")
    setLanguage(lang || 'ar')
    i18n.changeLanguage(lang || 'ar')
    dispatch(actionsApi?.changeLanguage(lang || 'ar'))
    document.body.dir = i18n.dir();
  }, [])

  const handleChnage = (value) => {
    setLanguage(value)
    localStorage.setItem("lang", value)
    i18n?.changeLanguage(value)
    // window.location.href='/'
    document.body.dir = i18n.dir(value);
    dispatch(actionsApi?.changeLanguage(value))
  }

  useEffect(() => {
    setSelected({
      key: i18n.language === 'ar' ? '2' : '1',
      label: i18n.language === 'ar' ? t('Arabic') : t('English'),
      flag: i18n.language === 'ar'
        ? "https://flagcdn.com/w20/sa.png"
        : "https://flagcdn.com/w20/us.png",
    });
  }, [i18n.language, t]);

  const items = [
    {
      key: "1",
      label: (
        <span
          onClick={() =>
            setSelected({
              key: "1",
              label: t("English"),
              flag: "https://flagcdn.com/w20/us.png",
            })
          }
        >
          <Flex gap={5}>
            <img
              src="https://flagcdn.com/w20/us.png"
              alt="English"
              style={{ width: 25, marginRight: 8 }}
            />
            {t('English')}
          </Flex>
        </span>
      ),
      onClick: () => handleChnage('en')
    },
    {
      key: "2",
      label: (
        <span
          onClick={() =>
            setSelected({
              key: "2",
              label: t('Arabic'),
              flag: "https://flagcdn.com/w20/sa.png",
            })
          }
        >
          <Flex gap={5}>
            <img
              src="https://flagcdn.com/w20/sa.png"
              alt="Arabic"
              style={{ width: 25, marginRight: 8 }}
            />
            {t('Arabic')}
          </Flex>
        </span>
      ),
      onClick: () => handleChnage('ar')
    },
  ];


  useEffect(() => {
    let tab = location?.pathname?.split("/")[1];
    tab = tab === '' ? '1' :
      tab === 'booking' ? '2' :
        tab === 'customers' ? '3' :
          tab === 'staffvacation' ? '4' :
            tab === 'settingpages' ? '5' :
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
        navigate("/booking", { replace: true });
        break;
      case '3':
        navigate("/customers", { replace: true });
        break;
      case '4':
        navigate("/staffvacation", { replace: true });
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
        }} trigger={null} collapsible collapsed={collapsed} className={collapsed ? 'addclass overflowstyle h-100vh overflowy-auto border-right-side' : 'overflowstyle h-100vh overflowy-auto border-right-side'}>
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
                    style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    alt='collapse icon' fetchPriority="high"
                  />
                </Button>
                <SearchInput
                  prefix={<img src='/assets/icons/search.webp' alt='search icon' fetchPriority="high" width={20} />}
                  placeholder={t('Search')} alt='search icon' fetchPriority="high"
                />
              </Space>
              <Flex justify='space-between' align='center' className='w-100 flex-end'>
                <Button type='button' className='bg-transparent border-0 p-0 d-none' onClick={() => setCollapsed(!collapsed)}>
                  <Image src='/assets/icons/collapse.webp'
                    width={'25px'} preview={false}
                    style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    alt='collapse icon' fetchPriority="high"
                  />
                </Button>
                <Space size={15} align='center' className='right'>
                  <Dropdown menu={{ items }} trigger={['click']}>
                    <Button className="btn">
                      <img src={selected.flag} alt={selected.label} style={{ width: 20 }} />
                      <span>{selected.label}</span>
                      <DownOutlined />
                    </Button>
                  </Dropdown>
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
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/staffvacation" element={<StaffVacationPage />} />
            <Route path="/settingpages" element={<SettingsPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export { Sidebar };
