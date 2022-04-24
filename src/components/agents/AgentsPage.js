import FooterTwo from "components/footers/FooterTwo";
import HeaderOne from "components/headers/HeaderOne";
import React from "react";
import { Outlet } from "react-router-dom";
import "./Agent.css";

function AgentsPage() {
  /**
   * Agent main component
   */
  return (
    <div className="mt-3">
      <HeaderOne />
      <Outlet />
      <div className="footer-bg">
        <FooterTwo />
      </div>
    </div>
  );
}

export default AgentsPage;
