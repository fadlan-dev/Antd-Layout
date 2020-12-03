import React, { useState, useEffect, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import FallBackItem from '../../components/FallBack';

import routes from '../../routes';
import { navigation } from '../../_nav';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [breadCrumb, setBreadCrumb] = useState('Dashboard');
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState('4');
  const [rootMenu, setRootMenu] = useState([]);
  const [openKeys, setOpenkeys] = useState([]);
  const [userName, setUserName] = useState();

  useEffect(() => {
    setDefaultSelectedKeys(localStorage.getItem('menuKey'));
    setBreadCrumb(localStorage.getItem('menuName'));
    setOpenkeys([localStorage.getItem('openkeys')]);
    setUserName(sessionStorage.getItem('userName'));
    setDefaultSelectedKeys([localStorage.getItem('defaultSeleted')]);
    setRootMenu(navigation.map((item, index) => `${index + 1}`));
    window.location.replace(`#${localStorage.getItem('currentURL')}`);
  }, []);

  const onOpenChange = (key) => {
    const latestKey = key.find((key) => openKeys.indexOf(key) === -1);
    if (rootMenu.indexOf(latestKey) === -1) {
      setOpenkeys(openKeys);
      localStorage.setItem('openkeys', openKeys);
    } else {
      setOpenkeys(latestKey ? [latestKey] : []);
      localStorage.setItem('openkeys', latestKey ? [latestKey] : []);
    }
  };

  const onChangeMenu = (key) => {
    setDefaultSelectedKeys(key);
    setOpenkeys([`${parseInt(key)}`]);
    localStorage.setItem('openkeys', parseInt(key));
    localStorage.setItem('defaultSeleted', key);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const onClickMenu = (name, url) => {
    setBreadCrumb(name);
    localStorage.setItem('menuName', name);
    localStorage.setItem('currentURL', url);
    window.location.replace(`#${url}`);
  };

  const onLogOut = () => {
    sessionStorage.setItem('token', '');
    localStorage.setItem('currentURL', '/dashboard');
    localStorage.setItem('openkeys', '1');
    localStorage.setItem('openkeys', '1');
    window.location.replace('#/login');
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo' />
        <Menu
          theme='light'
          onClick={(e) => onChangeMenu(e.key)}
          selectedKeys={[`${defaultSelectedKeys}`]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          mode='inline'
        >
          {navigation.map((item, index) =>
            item?.children ? (
              <SubMenu key={`${index + 1}`} icon={item.icon} title={item.name}>
                {item.children.map((s_item, s_index) => (
                  <Menu.Item
                    key={`${index + 1}.${s_index + 1}`}
                    icon={s_item.icon}
                    onClick={() =>
                      onClickMenu(
                        `${item.name} / ${s_item.name}`,
                        s_item.url,
                        index
                      )
                    }
                  >
                    {s_item.name}
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item
                key={`${index + 1}`}
                icon={item.icon}
                onClick={() => onClickMenu(item.name, item.url, index)}
              >
                {item.name}
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header
          className='site-layout-background'
          style={{
            padding: 0,
            position: 'sticky',
            top: 0,
            width: '100%',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: toggle,
                }
              )}
            </div>
            <div className='trigger'>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item
                      icon={<LogoutOutlined />}
                      onClick={() => onLogOut()}
                    >
                      LOGUT
                    </Menu.Item>
                  </Menu>
                }
              >
                <Avatar className='user-avatar' icon={<UserOutlined />} />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>{breadCrumb}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            backgroundColor: 'transparent',
            padding: 24,
          }}
        >
          <Suspense fallback={<FallBackItem />}>
            <Switch>
              {routes.map((route, index) => {
                return route.component ? (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect from='/' to='/dashboard' />
            </Switch>
          </Suspense>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Powered by THE TRIPLE INNOVATION
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Index;
