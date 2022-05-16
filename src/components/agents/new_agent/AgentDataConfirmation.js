// @ts-nocheck
import ConfirmationList from "components/commons/ConfirmationList";
import React from "react";
import { useSelector } from "react-redux";

/**
 * Conformation of entered agent data before submitting to backend
 */
const AgentDataConfirmation = ({ values, edit }) => {
  const { address, ...agent } = values;

  /**
   * selector object that retrieves the address locations such as country, region and city from store
   */
  const { country, region, city } = useSelector((store) => store.address);

  /**
   * Format Address data so that country, region and city values are changed by names
   */
  const formatAddress = () => {
    let addressNew = {};

    /**
     * Get IDs from the input values
     */
    const countryId = address["country"];
    const regionId = address["region"];
    const cityId = address["city"];

    /**
     * Get objects (data with id and name) from data from store
     */
    const countryObj = country.countryList.find(
      (country) => country.id === parseInt(countryId)
    );

    const regionObj = region.regionList.find(
      (region) => region.id === parseInt(regionId)
    );

    const cityObj = city.cityList.find((city) => city.id === parseInt(cityId));

    /**
     * Set new object with names of locations
     */
    addressNew["country"] = countryObj?.name;

    addressNew["region"] = regionObj?.name;

    addressNew["city"] = cityObj?.name;

    /**
     * Return new copy of data
     */
    return { ...address, ...addressNew };
  };

  /**
   * selector object that retrieves the agent create error status and response message
   */
  const { error, status } = useSelector(
    (store) => store.agent.addAgent.response
  );

  return (
    /**
     * Display the agent data and address as property and value
     */
    <div>
      {status === 409 && (
        <div className="error-general flex-center-general mb-3">{error}</div>
      )}
      <div className="card p-3 footer-bg shadow-sm my-3">
        <ConfirmationList
          data={agent}
          title="Agent Data"
          edit={edit(0)}
          listClassName="card my-2"
        />
      </div>
      <div className="card p-3 footer-bg shadow-sm my-3">
        <ConfirmationList
          data={formatAddress()}
          title="Address Data"
          edit={edit(1)}
          listClassName="card my-2"
        />
      </div>
    </div>
  );
};

export default AgentDataConfirmation;
