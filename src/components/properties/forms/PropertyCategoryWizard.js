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
  // console.log("selectedPropertyCategoryId: ", selectedPropertyCategoryId);
  const propertyCategories = useSelector(
    (store) => store.propertyCategory.propertyCategoryList.response.data
  );

  useEffect(() => {
    const selectedPropertyCategory = propertyCategories.find(
      (category) =>
        parseInt(category.id) === parseInt(selectedPropertyCategoryId)
    );
    // console.log("selectedPropertyCategory: ", selectedPropertyCategory);
    if (selectedPropertyCategory) {
      setSelectedPropertyCategoryKey(selectedPropertyCategory.cat_key);
    }
  }, []);
  return (
    <>
      {/* If selected category is apartment, display Apartment and Apartment unit form */}
      {selectedPropertyCategoryKey === APARTMENT_KEY && (
        <Apartment name="category.apartment" title="Apartment" />
      )}
      {/* If selected category is condominium, display condominium form */}
      {selectedPropertyCategoryKey === CONDOMINIUM_KEY && (
        <Condominium name="category.condominium" title="Condominium" />
      )}
      {/* If selected category is traditional house, display traditional house form */}
      {selectedPropertyCategoryKey === TRADITIONAL_HOUSE_KEY && (
        <TraditionalHouse
          name="category.traditional_house"
          title="Traditional House"
        />
      )}
      {/* If selected category is villa, display villa form */}
      {selectedPropertyCategoryKey === VILLA_KEY && (
        <Villa name="category.villa" title="Villa" />
      )}
      {/* If selected category is share house, display share house form */}
      {selectedPropertyCategoryKey === SHARE_HOUSE_KEY && (
        <ShareHouse name="category.share_house" title="Share House" />
      )}
      {/* If selected category is office, display office form */}
      {selectedPropertyCategoryKey === OFFICE_KEY && (
        <Office name="category.office" title="Office" />
      )}
      {/* If selected category is commercial property, display commercial property and its unit form */}
      {selectedPropertyCategoryKey === COMMERCIAL_PROPERTY_KEY && (
        <CommercialProperty
          name="category.commercial_property"
          title="Commercial Property"
        />
      )}
      {/* If selected category is all purpose property, display all purpose property and unit form */}
      {selectedPropertyCategoryKey === ALL_PURPOSE_PROPERTY_KEY && (
        <AllPurposeProperty
          name="category.all_purpose_property"
          title="All Purpose Property"
        />
      )}
      {/* If selected category is hall, display hall form */}
      {selectedPropertyCategoryKey === HALL_KEY && (
        <Hall name="category.hall" title="Hall Property" />
      )}
      {/* If selected category is land, display land form */}
      {selectedPropertyCategoryKey === LAND_KEY && (
        <Land name="category.land" title="Land Property" />
      )}
    </>
  );
};

export default PropertyCategoryWizard;
