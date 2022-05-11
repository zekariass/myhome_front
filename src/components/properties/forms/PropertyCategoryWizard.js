// @ts-nocheck
import {
  ALL_PURPOSE_PROPERTY_KEY,
  APARTMENT_KEY,
  COMMERCIAL_PROPERTY_KEY,
  CONDOMINIUM_KEY,
  HALL_KEY,
  LAND_KEY,
  OFFICE_KEY,
  SHARE_HOUSE_KEY,
  TRADITIONAL_HOUSE_KEY,
  VILLA_KEY,
} from "components/commons/Strings";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AllPurposeProperty from "./AllPurposeProperty";
import Apartment from "./Apartment";
import CommercialProperty from "./CommercialProperty";
import Condominium from "./Condominium";
import Hall from "./Hall";
import Land from "./Land";
import Office from "./Office";
import ShareHouse from "./ShareHouse";
import TraditionalHouse from "./TraditionalHouse";
import Villa from "./Villa";

const PropertyCategoryWizard = ({ values }) => {
  const [selectedPropertyCategoryKey, setSelectedPropertyCategoryKey] =
    useState("");
  const selectedPropertyCategoryId = values.property_category;
  console.log("selectedPropertyCategoryId: ", selectedPropertyCategoryId);
  const propertyCategories = useSelector(
    (store) => store.propertyCategory.response.data
  );

  useEffect(() => {
    const selectedPropertyCategory = propertyCategories.find(
      (category) =>
        parseInt(category.id) === parseInt(selectedPropertyCategoryId)
    );
    console.log("selectedPropertyCategory: ", selectedPropertyCategory);
    if (selectedPropertyCategory) {
      setSelectedPropertyCategoryKey(selectedPropertyCategory.cat_key);
    }
  }, []);
  return (
    <>
      {selectedPropertyCategoryKey === APARTMENT_KEY && (
        <Apartment label="apartment" title="Apartment" />
      )}
      {selectedPropertyCategoryKey === CONDOMINIUM_KEY && (
        <Condominium label="condominium" title="Condominium" />
      )}
      {selectedPropertyCategoryKey === TRADITIONAL_HOUSE_KEY && (
        <TraditionalHouse label="traditional_house" title="Traditional House" />
      )}
      {selectedPropertyCategoryKey === VILLA_KEY && (
        <Villa label="villa" title="Villa" />
      )}
      {selectedPropertyCategoryKey === SHARE_HOUSE_KEY && (
        <ShareHouse label="share_house" title="Share House" />
      )}
      {selectedPropertyCategoryKey === OFFICE_KEY && (
        <Office label="office" title="Office" />
      )}
      {selectedPropertyCategoryKey === COMMERCIAL_PROPERTY_KEY && (
        <CommercialProperty
          label="commercial_property"
          title="Commercial Property"
        />
      )}
      {selectedPropertyCategoryKey === ALL_PURPOSE_PROPERTY_KEY && (
        <AllPurposeProperty
          label="all_purpose_property"
          title="All Purpose Property"
        />
      )}
      {selectedPropertyCategoryKey === HALL_KEY && (
        <Hall label="hall" title="Hall Property" />
      )}
      {selectedPropertyCategoryKey === LAND_KEY && (
        <Land label="land" title="Land Property" />
      )}
    </>
  );
};

export default PropertyCategoryWizard;
