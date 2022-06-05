// @ts-nocheck
import { getAmenitiesByAmenityCategory } from "components/commons/getAmenitiesByAmenityCategory";
import CheckField from "components/commons/fields/CheckField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import { getPropertyCategory } from "features/agent_dashboard/property/propertyCategorySlice";
import { property } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";
import { createPropertyAmenity } from "features/agent_dashboard/property/propertySlice";
import { PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE } from "components/commons/Strings";

const Amenity = () => {
  const [property, setProperty] = useState({});
  const [amenitiesByAmenityCategory, setAmenitiesByAmenityCategory] = useState(
    []
  );
  const [numberOfAmenitiesToAdd, setNumberOfAmenitiesToAdd] = useState(0);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const propertyCategory = useSelector(
    (store) => store.propertyCategory?.getPropertyCategory?.data
  );

  useEffect(() => {
    setProperty(location.state?.property);
    const catKey = location.state?.property?.property_category?.cat_key;
    dispatch(getPropertyCategory(catKey));
  }, []);

  useEffect(() => {
    setAmenitiesByAmenityCategory(
      getAmenitiesByAmenityCategory(
        propertyCategory?.amenities,
        true,
        property?.amenity
      )
    );

    Object.keys(amenitiesByAmenityCategory)?.forEach((amenityCategory) => {
      setNumberOfAmenitiesToAdd(
        numberOfAmenitiesToAdd +
          amenitiesByAmenityCategory[amenityCategory]?.length
      );
    });

    // console.log("amenitiesByAmenCategory: ", property);
  }, [propertyCategory]);

  const onPropertyAmenitiesSubmit = (values) => {
    const orginalAmenities = propertyCategory?.amenities;
    let selectedAmenities = [];

    Object.keys(values).forEach((amnityName) => {
      if (values[amnityName] === true) {
        orginalAmenities.forEach((amenity) => {
          if (amenity?.name === amnityName) {
            selectedAmenities = [...selectedAmenities, amenity?.id];
          }
        });
      }
    });

    // console.log("selectedAmenities: ", selectedAmenities);

    const amenityData = { property: property?.id, amenity: selectedAmenities };
    dispatch(
      createPropertyAmenity({
        amenityData,
        navigate: navigate,
        redirectPath: PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE,
      })
    );
  };

  return (
    <div>
      {!!propertyCategory?.amenities?.length && (
        <div>
          {!!numberOfAmenitiesToAdd && (
            <div>
              <div className="pt-4 ps-3">
                <p className="fw-bold fs-6">
                  Add amenities for this {property.property_category?.name}
                </p>
              </div>
              <EditFormTemplate onSubmit={onPropertyAmenitiesSubmit}>
                {Object.keys(amenitiesByAmenityCategory).map(
                  (category, index) => (
                    <div key={index}>
                      {amenitiesByAmenityCategory[category].length > 0 && (
                        <div className="my-3">
                          <p className="fw-bold">{category}</p>
                        </div>
                      )}
                      <div className="row row-cols-auto">
                        {amenitiesByAmenityCategory[category].map(
                          (amenity, index) => (
                            <div className="col form-outline my-3" key={index}>
                              <CheckField
                                name={amenity.name}
                                type="checkbox"
                                className="form-check-input me-2"
                                label={amenity.name}
                                labelLink=""
                                initialValue={false}
                                disabled={false}
                                fieldSubscription={FIELD_SUBSCRIPTION}
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </EditFormTemplate>
            </div>
          )}
          {!numberOfAmenitiesToAdd && (
            <div className="mt-5">
              <p>
                All amenities for this {property.property_category?.name} has
                been added, already!
              </p>
            </div>
          )}
        </div>
      )}
      {!propertyCategory?.amenities?.length && (
        <div className="mt-4">
          <p>No Amenity for this property type!</p>
        </div>
      )}
    </div>
  );
};

export default Amenity;
