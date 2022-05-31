import FooterTwo from "components/footers/FooterTwo";
import { getBuildingTypes } from "features/agent_dashboard/property/buildingTypeSlice";
import { getHouseTypes } from "features/agent_dashboard/property/houseTypeSlice";
import { getPropertyCategories } from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import AgentDashboardHeader from "./AgentDashboardHeader";
import AgentDashboardSidebar from "./AgentDashboardSidebar";

const AgentDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPropertyCategories());
    dispatch(getHouseTypes());
    dispatch(getBuildingTypes());
  }, []);

  return (
    <div>
      <AgentDashboardHeader />
      <div className="footer-bg">
        <div className="row g-4">
          <div className="col-md-3 col-lg-2">
            <AgentDashboardSidebar />
          </div>
          <div className="col-md-9 col-lg-10 mb-5">
            <div className="container">
              <Outlet />
              {/* <div className="bg-light">
                <FooterTwo />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
