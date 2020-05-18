import React, { useState, Suspense } from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DashboardFilled,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import routes from "../../routes";
import { navigation } from "../../_nav";
import FallBackItem from "../../components/FallBack";

// const { SubMenu } = Menu;
const { Header, Sider, Content, Footer } = Layout;

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [breadCrumb, setBreadCrumb] = useState("Dashboard");

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {navigation.map((item, index) => (
            <Menu.Item
              key={index + 1}
              icon={<DashboardFilled />}
              onClick={() => setBreadCrumb(item.name)}
            >
              <Link to={item.url}>{item.name}</Link>
            </Menu.Item>
          ))}
          {/* <Menu.Item key="1" icon={<DashboardFilled />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DashboardFilled />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<DashboardFilled />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<DashboardFilled />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, position: "fixed", width: "100%" }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>{breadCrumb}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
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
