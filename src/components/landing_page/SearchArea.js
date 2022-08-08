// @ts-nocheck
import CheckField from "components/commons/fields/CheckField";
import DropdownField from "components/commons/fields/DropdownField";
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import { getPropertyCategoryData } from "components/commons/functions";
import { LAND_KEY, PATH_PUBLIC_LISTING } from "components/commons/Strings";
import {
  clearPublicListing,
  resetListingFilterValues,
  setSearchParams,
} from "features/listing/publicListingSlice";
import React from "react";
import { Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchArea = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const propertyCategories = useSelector(
    (store) => store.propertyCategory.propertyCategoryList.response.data
  );

  const listingTypes = useSelector(
    (store) => store.listing.getListingTypes.data
  );

  const onSubmit = (values) => {
    dispatch(resetListingFilterValues());

    const searchParams = {
      for_rent: false,
      for_sale: false,
      location: -1,
      property_category: -1,
      min_price: -1,
      max_price: -1,
      number_of_bed_rooms: -1,
      sort_by: -1,
      page: 1,
    };

    let urlParm = "";

    Object.keys(values).forEach((paramKey) => {
      searchParams[paramKey] = values[paramKey];
    });

    const propertyCategory = getPropertyCategoryData(
      propertyCategories,
      parseInt(values?.property_category)
    );

    if (searchParams.for_rent === false && searchParams.for_sale === false) {
      if (propertyCategory?.cat_key === LAND_KEY) {
        searchParams.for_rent = false;
        searchParams.for_sale = true;
      } else {
        searchParams.for_rent = true;
        searchParams.for_sale = true;
      }
    }

    dispatch(clearPublicListing());
    dispatch(setSearchParams(searchParams));

    Object.keys(searchParams).forEach((paramKey) => {
      urlParm += `${paramKey}=${searchParams[paramKey]}&`;
    });

    urlParm = urlParm.substring(0, urlParm.length - 1);

    navigate(`${PATH_PUBLIC_LISTING}?${urlParm}`);
  };

  return (
    <div>
      <p className="fs-5 fw-bold display-title ps-1">Search Properties</p>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="search-area my-4">
              <div className="row row-cols-auto p-3">
                <div className="col form-outline mb-2">
                  <CheckField
                    name="for_rent"
                    type="checkbox"
                    className="form-check-input me-2"
                    label="For Rent"
                    labelClass="text-light"
                    labelLink=""
                    initialValue={false}
                    disabled={false}
                    fieldSubscription={FIELD_SUBSCRIPTION}
                    // onCheckboxChange={onCouponCheckBoxChange}
                  />
                </div>
                <div className="col form-outline mb-2">
                  <CheckField
                    name="for_sale"
                    type="checkbox"
                    className="form-check-input me-2"
                    label="For Sale"
                    labelClass="text-light"
                    labelLink=""
                    initialValue={false}
                    disabled={false}
                    fieldSubscription={FIELD_SUBSCRIPTION}
                    // onCheckboxChange={onCouponCheckBoxChange}
                  />
                </div>
              </div>
              <div className="row row-cols-1 row-cols-lg-2 g-3 px-3">
                <div className="col form-outline mb-2">
                  <TextField
                    name="location"
                    className="form-control form-control-lg input-border-color"
                    type="text"
                    placeholder="Enter Region, City, Sub-City, etc"
                    label="Keyword"
                    labelClass="form-label fs-5 mt-2 text-light"
                    validate={() => {}}
                    subscription={FIELD_SUBSCRIPTION}
                  />
                  {/* </div> */}
                </div>
                <div className="col">
                  <DropdownField
                    name="property_category"
                    className="form-control form-control-lg input-border-color"
                    label="Property Category"
                    labelClass="form-label fs-5 mt-2 text-light"
                    options={[
                      { id: "-1", name: "--Select Category--" },
                      ...propertyCategories,
                    ]}
                    customOnChange={() => {}}
                    dispatchObj={null}
                    // validate={countryRequired}
                    subscription={FIELD_SUBSCRIPTION}
                  />
                </div>
              </div>

              <div className="flex-end-general p-3">
                <button type="submit" className="btn-general px-3 py-2">
                  Search
                </button>
              </div>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

export default SearchArea;
