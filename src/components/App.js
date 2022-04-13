import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./landing_page/LandingPage";
import "./General.css";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
