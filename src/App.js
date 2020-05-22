import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import FallBackItem from "./components/FallBack";
import { ConfigProvider } from "antd";
import th_TH from "antd/lib/locale/th_TH";
import "moment/locale/th";

import "./scss/style.scss";
import "antd/dist/antd.less";

const Login = lazy(() => import("./views/Pages/Login"));
const DefaultLayout = lazy(() => import("./containers"));

const App = () => {
  return (
    <ConfigProvider locale={th_TH}>
      <Router>
        <Suspense fallback={<FallBackItem />}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login"
              render={(props) => <Login {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <DefaultLayout {...props} />}
            />
          </Switch>
        </Suspense>
      </Router>
    </ConfigProvider>
  );
};

export default App;
