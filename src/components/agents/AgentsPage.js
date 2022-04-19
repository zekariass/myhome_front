import FooterOne from "components/footers/FooterOne";
import HeaderOne from "components/headers/HeaderOne";
import React from "react";
import { Outlet } from "react-router-dom";

function AgentsPage() {
  return (
    <div>
      <HeaderOne />
      <Outlet />
      <FooterOne />
    </div>
  );
}

export default AgentsPage;
