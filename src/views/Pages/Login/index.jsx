import React from "react";
import { Card, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const index = () => {
  const onFinish = (e) => {
    console.log(e);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      className="bg-login"
    >
      <Card style={{ minWidth: 500 }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img
            className="login-logo"
            src={require("../../../assets/image/logo.svg")}
            alt="logo"
          />
        </div>
        <Form name="login-form" onFinish={onFinish}>
          <Form.Item name="user" rules={[{ required: true }]}>
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, min: 8 }]}>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            <Button htmlType="submit" type="primary">
              LOGIN
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default index;
