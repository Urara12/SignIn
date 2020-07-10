import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Navbar from "./pages/Navbar";
import MainPage from "./pages/MainPage";
import SignupPage from "./pages/SignupPage";
import AuthenticatePage from "./pages/AuthenticatePage";
import SigninPage from "./pages/SigninPage";
import SignoutPage from "./pages/SignoutPage";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/signup" exact>
            <SignupPage />
          </Route>
          <Route path="/authenticate" exact>
            <AuthenticatePage />
          </Route>
          <Route path="/signin" exact>
            <SigninPage />
          </Route>
          <Route path="/signout" exact>
            <SignoutPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}
export default App;
