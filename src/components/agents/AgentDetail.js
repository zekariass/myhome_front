// @ts-nocheck
import { getFullAddress } from "components/commons/functions";
import { getAgentById, getPublicAgentDetail } from "features/agent/agentSlice";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AgentDetail = () => {
  const dispatch = useDispatch();

  const agentData = useSelector((store) => store.agent.publicAgentDetail.data);

  const { agentId } = useParams();

  useEffect(() => {
    dispatch(getPublicAgentDetail(agentId));
  }, []);

  return (
    <div className="container">
      <div className="card shadow">
        <div className="row p-3">
          <div className="col-lg-7 order-lg-0 order-1 other-bg rounded-3 pt-3">
            <div className=" p-2">
              <div className="flex-center-general">
                <div>
                  <p className="fs-5 fw-bold">{agentData?.name}</p>
                  <p className="text-muted">{agentData?.slogan}</p>
                </div>
              </div>
              <div>
                <p className="fw-bold">Address</p>
                <i className="large map marker alternate icon"></i>
                {getFullAddress(agentData?.address)}
              </div>
              <div className="my-3">
                <p className="fw-bold">Description</p>
                <p>{agentData?.description}</p>
              </div>
              <div className="mb-3">
                <p className="fw-bold">Email</p>
                <p>{agentData?.email}</p>
              </div>
              <div className="mb-3">
                <p className="fw-bold">Phone</p>
                <p>{agentData?.contact_number}</p>
              </div>
              <div className="mb-3 flex-center-general">
                <button className="btn btn-general">Write to us</button>
              </div>
            </div>
          </div>
          <div className="col-lg-5 order-lg-1 order-0">
            <div className=" p-2 ">
              <img
                src={agentData?.logo?.logo}
                width="90%"
                style={{ maxHeight: "300px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
