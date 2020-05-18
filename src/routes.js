import { lazy } from "react";

const Dashboard = lazy(() => import("./views/Dashboard"));
const User = lazy(() => import("./views/User"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/user", name: "User", component: User },
];

export default routes;
