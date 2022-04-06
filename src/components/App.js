import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./landing_page/LandingPage";
import "./General.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <LandingPage />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
