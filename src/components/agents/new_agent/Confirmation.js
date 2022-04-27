// @ts-nocheck
import { createAgent } from "features/agent/agentSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

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
   * selector object that retrieves the address locations such as country, region and city from store
   */
  const { country, region, city } = useSelector((store) => store.address);

  const dispatch = useDispatch();

  /**
   * Make array of both agentData and agentAddress
   */
  const allAgentDataArray = [agentData, agentAddress];

  return (
    /**
     * Display the agent data and address as property and value
     */
    <div>
      {renderConfirmationList(allAgentDataArray, country, region, city)}
      <div className="row mt-4">
        <div className="col-lg-6 pt-1 mb-4 flex-center-general order-1 order-lg-0">
          <button
            className="btn-general py-2 w-75"
            type="button"
            onClick={() => onBackButtonClick(currentStep, setCurrentStep)}
          >
            Back
          </button>
        </div>
        <div className="col-lg-6 pt-1 mb-4 flex-center-general order-0 order-lg-1">
          <button
            className="btn-general py-2 w-75"
            type="button"
            onClick={() => onCreateBtnClick(dispatch)}
          >
            Create Agent
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;

const renderConfirmationList = (allAgentDataArray, country, region, city) => {
  /**
   * Render form content into confirmation list page
   */
  return allAgentDataArray.map((data, index) => {
    const objKeys = Object.keys(data);
    return (
      <div key={index}>
        {
          /**
           * Check objKeys and if it has name  display a "Agent Info" label
           * But it contains street then display "Agent Address" label since it is address data
           */
          (objKeys.includes("name") && (
            <div className="fs-4 fw-bold text-muted flex-center-general mb-3">
              Agent info
            </div>
          )) ||
            (objKeys.includes("street") && (
              <div className="fs-4 fw-bold text-muted flex-center-general mb-3">
                Agent Address
              </div>
            ))
        }
        <div className="row row-cols-1 row-cols-lg-2 my-4">
          {objKeys.map((key) => {
            let countryName;
            let regionName;
            let cityName;

            /**
             * Display country by name rather than by id. Name retrieved from redux store
             */
            if (key === "country") {
              const countryObj = country.countryList.find(
                (cntry) => cntry.id === parseInt(data[key])
              );
              countryName = countryObj ? countryObj.name : undefined;
            }

            /**
             * Display country by name rather than by id. Name retrieved from redux store
             */
            if (key === "region") {
              const regionObj = region.regionList.find(
                (rgn) => rgn.id === parseInt(data[key])
              );
              regionName = regionObj ? regionObj.name : undefined;
            }

            /**
             * Display country by name rather than by id. Name retrieved from redux store
             */
            if (key === "city") {
              const cityObj = city.cityList.find(
                (cty) => cty.id === parseInt(data[key])
              );
              cityName = cityObj ? cityObj.name : undefined;
            }

            return (
              <div className="col" key={key}>
                <label className="fs-6 fw-bold flex-center-general">
                  {key.toString().toUpperCase().replaceAll("_", "  ")}
                </label>
                <p className="fs-6 text-muted flex-center-general">
                  {countryName || regionName || cityName || data[key]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
};

//Inline function call
const onBackButtonClick = (currentStep, setCurrentStep) => {
  /**
   * Handles the back button click action
   */
  setCurrentStep(currentStep - 1);
};

const onCreateBtnClick = (dispatch) => {
  dispatch(createAgent());
};
