import React, { useState, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Avatar, Dropdown } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import FallBackItem from "../../components/FallBack";

import routes from "../../routes";
import { navigation } from "../../_nav";

const { Header, Sider, Content, Footer } = Layout;

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [breadCrumb, setBreadCrumb] = useState("Dashboard");

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const onClickMenu = (name, url) => {
    setBreadCrumb(name);
    window.location.replace(`#${url}`);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
          {navigation.map((item, index) => (
            /* item?.children ? (
              <SubMenu
                key={`sub${index + 1}`}
                icon={item.icon}
                title={item.name}
              >
                {item.children.map((s_item, s_index) => (
                  <Menu.Item
                    key={`sub${index + 1}.${s_index + 1}`}
                    icon={s_item.icon}
                    onClick={() =>
                      onClickMenu(`${item.name} / ${s_item.name}`, s_item.url)
                    }
                  >
                    {s_item.name}
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : ( */
            <Menu.Item
              key={index + 1}
              icon={item.icon}
              onClick={() => onClickMenu(item.name, item.url)}
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            position: "sticky",
            top: 0,
            width: "100%",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: toggle,
                }
              )}
            </div>
            <div className="trigger">
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item
                      icon={<LogoutOutlined />}
                      onClick={() => window.location.replace("#/login")}
                    >
                      LOGUT
                    </Menu.Item>
                  </Menu>
                }
              >
                <Avatar className="user-avatar" icon={<UserOutlined />} />
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
            backgroundColor: "transparent",
            padding: 24,
          }}
        >
          <Suspense fallback={<FallBackItem />}>
            <Switch>
              {routes.map((route, idx) => {
                return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </Suspense>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Powered by THE TRIPLE INNOVATION
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Index;
