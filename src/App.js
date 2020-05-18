import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import FallBackItem from "./components/FallBack";
import "./scss/style.scss";
import "antd/dist/antd.css";

const Login = lazy(() => import("./views/Pages/Login"));
const DefaultLayout = lazy(() => import("./containers"));

const App = () => {
  return (
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
  );
};

export default App;
