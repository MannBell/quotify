import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import ScrollToTop from "./ex_plugins/components/ScrollToTop";
// components
import Navbar from "./components/navbar/Navbar";
import Welcome from "./components/pages/Welcome";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import CreateQuote from "./components/quote/CreateQuote";
import Modal from "./components/modals/Modal";
import NotFound from "./components/special/NotFound";
import Browse from "./components/pages/Browse";
import Profile from "./components/pages/Profile";

const App = () => {
  return (
    <HashRouter>
      <div>
        <Navbar/>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={ Welcome } />
            <Route path="/signup" component={ SignUp } />
            <Route path="/signin" component={ SignIn } />
            <Route path="/profile/:id" component={ Profile } />
            <Route path="/create" component={ CreateQuote } />
            <Route path="/browse" component={ Browse } />
            {/* Below is to handle 404 requests */}
            <Route component={ NotFound } />
          </Switch>
        </ScrollToTop>
        <Modal/>
      </div>
    </HashRouter>
  )
}

export default App;