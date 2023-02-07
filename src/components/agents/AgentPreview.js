// @ts-nocheck
import { PATH_AGENT_CONTACT_ABSOLUTE } from "components/commons/Strings";
import { getAgent } from "features/agent/agentSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const AgentPreview = ({ agentData, listingData, disableContactButton }) => {
  const dispatch = useDispatch();
  /**
   * Get agent data from store
   */
  // const agentData = useSelector((store) => store.agent.getAgent.response.data);

  useEffect(() => {
    /**
     * Dispatch the getAgent action creator that fetchs agent data from backend
     */
    dispatch(getAgent());
  }, []);
  return (
    <div className="card footer-bg shadow-lg">
      <div className="card-body">
        <p
          className="fs-6 flex-center-general-sm text-muted"
          // style={{ color: "rgb(9, 122, 220)" }}
        >
          PUBLISHED BY
        </p>
        <div className="row row-cols-1 row-cols-sm-2 g-2">
          <div className="col order-1 order-sm-0">
            <div className="fs-5 fw-bold text-info my-3 flex-center-general-sm">
              {agentData?.name}
            </div>
            <div className="fs-6 flex-center-general-sm">
              {agentData?.address?.street}, {agentData?.address?.city.name},{" "}
              {agentData?.address?.region.name},{" "}
              {agentData?.address?.country.name}
            </div>
          </div>
          <div className="col flex-center-general agent-logo-display-div">
            <img src={agentData?.logo?.logo} alt="" id="agent-logo-display" />
          </div>
        </div>

        {/* <div className="mt-3 flex-center-general-sm">
          <Link to="" className="link-general link-hover link-size-normal">
            Manage your Agent
          </Link>
        </div> */}
        <div className="card mt-3">
          <div className="card-title px-3">Contacts</div>
          <div className="card-body p-3">
            <div>
              <i className="big phone icon" style={{ color: "orange" }}></i>
              <span className="ms-3">{agentData?.contact_number}</span>
            </div>
            <div className="my-3">
              <div>
                <i className="big envelope icon" style={{ color: "brown" }}></i>
                <span className="ms-3 bg-dark p-2 rounded text-light">
                  {agentData?.email}
                </span>
              </div>
              {!disableContactButton && (
                <div className="mt-4 flex-center-general">
                  <Link
                    to={PATH_AGENT_CONTACT_ABSOLUTE}
                    state={{ agentData: agentData, listingData: listingData }}
                    className="btn btn-general p-2"
                  >
                    Write to publisher
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPreview;
