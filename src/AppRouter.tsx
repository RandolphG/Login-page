import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoginPage from "./LoginPage";
import AccountPage from "./AccountPage";

function AppRouter() {
  return (
    <Router>
      <Route
        render={({ location }) => (
          <AnimatePresence exitBeforeEnter initial={false}>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/account-page" component={AccountPage} />
              <Route exact path="/" component={LoginPage} />
            </Switch>
          </AnimatePresence>
        )}
      />
    </Router>
  );
}

export default AppRouter;
