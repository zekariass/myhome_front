// @ts-nocheck
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import { getAgentsByLocation } from "features/agent/agentSlice";
import React, { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import AgentInforCard from "./AgentInforCard";

const AgentSearch = () => {
  // const [searchParam, setSearchParam] = useState({ location: "Mekele" });
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({ location: "" });

  const agents = useSelector((store) => store.agent.getAgentsByLocation.data);

  const onSearchFormSubmit = (values) => {
    // setSearchParam(values);
    setSearchParams(values);
  };

  useEffect(() => {
    const initialLocation = searchParams.get("location");
    if (!initialLocation) {
      setSearchParams({
        location: "Mekele",
      });
    }
  }, []);

  useEffect(() => {
    dispatch(getAgentsByLocation(searchParams));
  }, [searchParams]);
  return (
    <div className="container">
      <div className="mt-3 mb-5">
        <Form onSubmit={onSearchFormSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="row row-cols-1 row-cols-md-2 flex-center-general">
                <div className="col form-outline mb-2">
                  <TextField
                    name="location"
                    type="text"
                    placeholder=""
                    label="Search by Location"
                    className="form-control form-control-lg input-border-color"
                    labelClass="form-label fs-5 mt-2"
                    fieldSubscription={FIELD_SUBSCRIPTION}
                    validate={() => {}}
                  />

                  <div className="d-flex mt-3 flex-end-general">
                    <button type="submit" className="btn btn-general">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Form>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {agents.map((agent) => (
          <div className="col" key={agent.id}>
            <AgentInforCard agentData={agent} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentSearch;
