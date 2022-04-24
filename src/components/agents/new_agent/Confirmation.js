// @ts-nocheck
import React from "react";
import { useSelector } from "react-redux";

const Confirmation = ({ currentStep, setCurrentStep }) => {
  /**
   * Conformation of entered agent data before submitting to backend
   */

  /**
   * selector object that retrieves the agent data from store
   */
  const { agentData, agentAddress } = useSelector(
    (store) => store.agent.addAgent
  );

  /**
   * Make array of both agentData and agentAddress
   */
  const allAgentDataArray = [agentData, agentAddress];

  return (
    /**
     * Display the agent data and address as property and value
     */
    <div>
      <div className="row row-cols-1 row-cols-lg-2">
        {allAgentDataArray.map((data) => {
          const objKeys = Object.keys(data);
          return objKeys.map((key) => {
            return (
              <div className="col" key={key}>
                <label className="fs-6 fw-bold flex-center-general">
                  {key.toString().toUpperCase().replaceAll("_", "  ")}
                </label>
                <p className="fs-6 text-muted flex-center-general">
                  {data[key]}
                </p>
              </div>
            );
          });
        })}
      </div>
      <div className="row">
        <div className="col-lg-6 pt-1 my-4 flex-center-general">
          <button
            className="btn-general py-2 w-75"
            type="button"
            onClick={() => onBackButtonClick(currentStep, setCurrentStep)}
          >
            Back
          </button>
        </div>
        <div className="col-lg-6 pt-1 my-4 flex-center-general">
          <button className="btn-general py-2 w-75" type="submit">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;

//Inline function call
const onBackButtonClick = (currentStep, setCurrentStep) => {
  /**
   * Handles the back button click action
   */
  setCurrentStep(currentStep - 1);
};
