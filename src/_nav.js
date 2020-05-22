import React from "react";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";

export const navigation = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <DashboardOutlined />,
  },
  {
    name: "User",
    url: "/user",
    icon: <UserOutlined />,
    children: [
      { name: "Sub1", url: "/asd", icon: <UserOutlined /> },
      { name: "Sub2", url: "/asd", icon: <UserOutlined /> },
    ],
  },
];
