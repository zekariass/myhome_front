// @ts-nocheck
import ConfirmationList from "components/commons/ConfirmationList";
import React from "react";
import { useSelector } from "react-redux";

const PropertyDataConfirmation = ({ values }) => {
  const {
    address,
    apartment: { units, ...apartmentRest },
    ...propertyRest
  } = values;

  /**
   * Selector object that retrieves the address locations such as country, region and city from store
   */
  const { country, region, city } = useSelector((store) => store.address);

  /**
   * Selector object that retrieves property categories from store for display by name
   */
  const propertyCategories = useSelector(
    (store) => store.propertyCategory.response.data
  );

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
   * Format Parent property data.
   * Change property category ID to name for listing
   */

  const formatParentProperty = () => {
    const { property_category } = propertyRest;
    const pCategory = propertyCategories.find(
      (pCat) => pCat.id === parseInt(property_category)
    );
    propertyRest["property_category"] = pCategory.name;
    console.log("PROPppppppppppp: ", propertyRest);
    return propertyRest;
  };

  /**
   * selector object that retrieves the agent create error status and response message
   */

  //   const { error, status } = useSelector(
  //     (store) => store.agent.addAgent.response
  //   );

  return (
    /**
     * Display the agent data and address as property and value
     */
    <div>
      {/* {status === 409 && (
        <div className="error-general flex-center-general mb-3">{error}</div>
      )} */}

      <ConfirmationList data={formatParentProperty()} title="Property Data" />
      <ConfirmationList data={formatAddress()} title="Address Data" />
      <ConfirmationList data={apartmentRest} title="Apartment Data" />
      <div className="card p-3 footer-bg">
        {units.map((unit, index) => (
          <div key={index}>
            <ConfirmationList
              data={unit}
              title={`Apartment Unit #${index + 1} Data`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyDataConfirmation;
