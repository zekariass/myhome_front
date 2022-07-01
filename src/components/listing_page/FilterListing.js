// @ts-nocheck

import React from "react";
import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Form } from "react-final-form";
import { useSelector } from "react-redux";

const FilterListing = () => {
  const [selectedCategory, setSelectedCategory] = useState("Property Category");
  const [selectedNumOfBeds, setSelectedNumOfBeds] = useState(1);
  const [selectedListingType, setSelectedListingType] =
    useState("Listing Type");
  const [selectedMinPrice, setSelectedMinPrice] = useState("Min Price");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState("Max Price");

  const [filterParams, setFilterParams] = useState({});

  const LISTING_TYPE_FOR_RENT = "For Rent";
  const LISTING_TYPE_FOR_SALE = "For Sale";

  const rentMinPrices = [
    500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 7000,
    8000, 9000, 10000,
  ];
  const rentMaxPrices = [
    500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 7000,
    8000, 9000, 10000, 15000, 20000, 25000, 30000,
  ];

  const saleMinPrices = [
    50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000,
    500000, 550000, 600000, 700000, 800000, 900000, 1000000, 1500000, 2000000,
    2500000, 3000000,
  ];

  const saleMaxPrices = [
    500000, 1000000, 1500000, 2000000, 2500000, 3000000, 3500000, 4000000,
    4500000, 5000000, 5500000, 6000000, 7000000, 8000000, 9000000, 10000000,
    15000000, 20000000, 25000000, 30000000,
  ];

  // console.log("selectedCategory: ", filterParams);

  const propertyCategories = useSelector(
    (store) => store.propertyCategory.propertyCategoryList.response.data
  );
  const onPropertyCategorySelect = (event) => {
    const propCategory = propertyCategories?.find(
      (pCat) => pCat?.cat_key === event
    );

    setFilterParams({ ...filterParams, property_category: event });
    setSelectedCategory(propCategory?.name);
  };

  const onNumOfBedsSelect = (event) => {
    setSelectedNumOfBeds(event);
    setFilterParams({ ...filterParams, number_of_bed_rooms: event });
  };

  const onListingTypeSelect = (event) => {
    setSelectedMinPrice("Min Price");
    setSelectedMaxPrice("Max Price");
    setSelectedListingType(event);
    setFilterParams({ ...filterParams, listing_type: event });
  };

  const onMinPriceSelect = (event) => {
    setSelectedMinPrice(event);
    setFilterParams({ ...filterParams, min_price: event });
  };

  const onMaxPriceSelect = (event) => {
    setSelectedMaxPrice(event);
    setFilterParams({ ...filterParams, max_price: event });
  };

  return (
    <div className="row row-cols-auto g-3">
      <div className="col flex-center-general">
        <p className="fs-5 fw-bold">Filter</p>
      </div>
      <div className="col flex-center-general ">
        <DropdownButton
          id="filter-property-category"
          title={selectedCategory}
          bsPrefix="footer-bg btn-general-outline py-2 px-3"
          onSelect={onPropertyCategorySelect}
        >
          <div className="dropdown-scrollable">
            {propertyCategories.map((pCategory) => (
              <Dropdown.Item eventKey={pCategory?.cat_key} key={pCategory?.id}>
                {pCategory.name}
              </Dropdown.Item>
            ))}
          </div>
        </DropdownButton>
      </div>
      <div className="col flex-center-general">
        <DropdownButton
          id="filter-number-of-beds"
          title={`${
            selectedNumOfBeds == 4
              ? String(selectedNumOfBeds) + "+"
              : selectedNumOfBeds
          } ${selectedNumOfBeds == 1 ? "Bed" : "Beds"}`}
          bsPrefix="footer-bg btn-general-outline py-2 px-3"
          onSelect={onNumOfBedsSelect}
        >
          <Dropdown.Item eventKey={1}>1 Bed</Dropdown.Item>
          <Dropdown.Item eventKey={2}>2 Beds</Dropdown.Item>
          <Dropdown.Item eventKey={3}>3 Beds</Dropdown.Item>
          <Dropdown.Item eventKey={4}>4+ Beds</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="col flex-center-general">
        <DropdownButton
          id="filter-listing-type"
          title={selectedListingType}
          bsPrefix="footer-bg btn-general-outline py-2 px-3"
          onSelect={onListingTypeSelect}
        >
          <Dropdown.Item eventKey={LISTING_TYPE_FOR_RENT}>
            {LISTING_TYPE_FOR_RENT}
          </Dropdown.Item>
          <Dropdown.Item eventKey={LISTING_TYPE_FOR_SALE}>
            {LISTING_TYPE_FOR_SALE}
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="col flex-center-general">
        <DropdownButton
          id="rent-min-price"
          title={selectedMinPrice}
          bsPrefix="footer-bg btn-general-outline py-2 px-3"
          onSelect={onMinPriceSelect}
          // style={{ maxHeight: "300px", msOverflowY: "scroll" }}
        >
          <div className="dropdown-scrollable">
            {selectedListingType === LISTING_TYPE_FOR_RENT && (
              <>
                {rentMinPrices.map((minPrice, index) => (
                  <Dropdown.Item eventKey={minPrice} key={index}>
                    {minPrice}
                  </Dropdown.Item>
                ))}
              </>
            )}
            {selectedListingType === LISTING_TYPE_FOR_SALE && (
              <>
                {saleMinPrices.map((minPrice, index) => (
                  <Dropdown.Item eventKey={minPrice} key={index}>
                    {minPrice}
                  </Dropdown.Item>
                ))}
              </>
            )}
          </div>
        </DropdownButton>
      </div>

      <div className="col flex-center-general">
        <DropdownButton
          id="rent-max-price"
          title={selectedMaxPrice}
          bsPrefix="btn-general-outline py-2 px-3"
          onSelect={onMaxPriceSelect}
          // disabled={selectedListingType === "Listing Type" ? true : false}

          // style={{ backgroundColor: "red" }}
        >
          <div className="dropdown-scrollable">
            {selectedListingType === LISTING_TYPE_FOR_RENT && (
              <>
                {rentMaxPrices.map((maxPrice, index) => (
                  <Dropdown.Item eventKey={maxPrice} key={index}>
                    {maxPrice}
                  </Dropdown.Item>
                ))}
              </>
            )}
            {selectedListingType === LISTING_TYPE_FOR_SALE && (
              <>
                {saleMaxPrices.map((maxPrice, index) => (
                  <Dropdown.Item eventKey={maxPrice} key={index}>
                    {maxPrice}
                  </Dropdown.Item>
                ))}
              </>
            )}
          </div>
        </DropdownButton>
      </div>
    </div>
  );
};

export default FilterListing;
