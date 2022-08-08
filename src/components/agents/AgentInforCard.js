// @ts-nocheck
import {
  PATH_AGENTS_HOME,
  PATH_AGENT_DETAIL,
} from "components/commons/Strings";
import React from "react";
import { Link } from "react-router-dom";

const AgentInforCard = ({ agentData }) => {
  return (
    <div className="card footer-bg">
      <div className="card-header">
        <p
          className="fs-5 flex-center-general fw-bold fst-italic"
          style={{ color: "rgb(9, 122, 220)" }}
        >
          {agentData?.name}
        </p>
      </div>
      <div className="card-body">
        <div className="row row-cols-1 row-cols-sm-2 g-2">
          <div className="col order-1 order-sm-0">
            <div className="fs-5 text-muted flex-center-general-sm">
              {agentData?.address?.street}, {agentData?.address?.city.name},{" "}
              {agentData?.address?.region.name},{" "}
              {agentData?.address?.country.name}
            </div>
          </div>
          <div className="col flex-center-general agent-logo-display-div">
            <img
              src={agentData?.logo?.logo}
              alt="Agent Logo"
              id="agent-logo-display"
              className="card"
            />
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="mt-3 flex-center-general">
          <Link
            to={`${PATH_AGENTS_HOME}/${agentData?.id}/${PATH_AGENT_DETAIL}`}
            className="link-general link-hover"
          >
            See Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgentInforCard;
