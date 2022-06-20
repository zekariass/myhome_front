// @ts-nocheck
import ConfirmationList from "components/commons/ConfirmationList";
import React from "react";
import { useSelector } from "react-redux";
import formatPropertyData from "./formatPropertyData";

const PropertyDataConfirmation = ({ values, edit }) => {
  //Select property category from store
  const { data } = useSelector(
    (store) => store.propertyCategory.propertyCategoryList.response
  );

  //Format property data for display in property data confirmation page
  const newValues = formatPropertyData(values, data);

  //Distructure formatted form values (data)
  const { address, category, ...propertyRest } = newValues;

  //Destructure the category data into units and rest. Units are available only
  //in some of categories, such as Apartment
  const { units, ...categoryRest } = Object.values(category)[0];
  // console.log("UNITS: ", Object.values(category));

  //Selector object that retrieves the address locations such as country, region and city from store
  const { country, region, city } = useSelector((store) => store.address);

  //Selector object that retrieves property categories from store for display by name
  const propertyCategories = useSelector(
    (store) => store.propertyCategory.propertyCategoryList.response.data
  );

  //Format Address data so that country, region and city values are changed by names
  const formatAddress = () => {
    let addressNew = {};

    //Get IDs from the input values
    const countryId = address ? address["country"] : undefined;
    const regionId = address ? address["region"] : undefined;
    const cityId = address ? address["city"] : undefined;

    //Get objects (data with id and name) from data from store
    const countryObj = country.countryList.find(
      (country) => country.id === parseInt(countryId)
    );

    const regionObj = region.regionList.find(
      (region) => region.id === parseInt(regionId)
    );

    const cityObj = city.cityList.find((city) => city.id === parseInt(cityId));

    //Set new object with names of locations
    addressNew["country"] = countryObj?.name;

    addressNew["region"] = regionObj?.name;

    addressNew["city"] = cityObj?.name;

    //Return new copy of data
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
    return propertyRest;
  };

  //selector object that retrieves the agent create error status and response message
  const { error, status } = useSelector(
    (store) => store.agent.addAgent.response
  );

  //Replace underscores by space in property category name
  const replaceUnderscoreInCategoryName = Object.keys(category)[0].replaceAll(
    "_",
    " "
  );

  //Capitalize property category name
  const categoryName =
    replaceUnderscoreInCategoryName.charAt(0).toUpperCase() +
    replaceUnderscoreInCategoryName.slice(1);

  return (
    /**
     * Display the agent data and address as property and value
     */
    <div>
      {/* {status === 409 && (
        <div className="error-general flex-center-general mb-3">{error}</div>
      )} */}
      <div className="card p-3 footer-bg shadow-sm my-3">
        {/* Show confirmation for parent property data */}
        <ConfirmationList
          data={formatParentProperty()}
          title="Property Data"
          edit={edit(0)}
          listClassName="card my-1"
        />
      </div>
      <div className="card p-3 footer-bg shadow-sm my-3">
        {/* Show confirmation for property category data */}
        <ConfirmationList
          data={categoryRest}
          title={categoryName}
          edit={edit(1)}
          listClassName="card my-1"
        />
      </div>

      {units && (
        <div className="card p-3 footer-bg shadow-sm my-3">
          {units.map((unit, index) => (
            <div key={index}>
              {/* Show confirmation for property units data */}
              <ConfirmationList
                data={unit}
                title={`${categoryName} Unit #${index + 1} Data`}
                edit={edit(1)}
                listClassName="card my-2"
              />
            </div>
          ))}
        </div>
      )}
      <div className="card p-3 footer-bg shadow-sm my-3">
        {/* Show confirmation for property address data */}
        <ConfirmationList
          data={formatAddress()}
          title="Address Data"
          edit={edit(2)}
          listClassName="card my-1"
        />
      </div>
    </div>
  );
};

export default PropertyDataConfirmation;
