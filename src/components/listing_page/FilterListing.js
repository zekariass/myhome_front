// @ts-nocheck
import { getPropertyCategoryData } from "components/commons/functions";
import {
  APARTMENT_KEY,
  CONDOMINIUM_KEY,
  LAND_KEY,
  SHARE_HOUSE_KEY,
  TRADITIONAL_HOUSE_KEY,
  VILLA_KEY,
} from "components/commons/Strings";
import {
  setListingFilterValues,
  setSearchParams,
} from "features/listing/publicListingSlice";
import React from "react";
import { useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const FilterListing = () => {
  const LISTING_TYPE_FOR_RENT = "For Rent";
  const LISTING_TYPE_FOR_SALE = "For Sale";
  const LISTING_TYPE_ANY = "Any";

  const LISTING_MIN_PRICE = "Min Price";
  const LISTING_MAX_PRICE = "Max Price";

  const rentMinPrices = [
    LISTING_MIN_PRICE,
    500,
    1000,
    1500,
    2000,
    2500,
    3000,
    3500,
    4000,
    4500,
    5000,
    5500,
    6000,
    7000,
    8000,
    9000,
    10000,
  ];
  const rentMaxPrices = [
    LISTING_MAX_PRICE,
    500,
    1000,
    1500,
    2000,
    2500,
    3000,
    3500,
    4000,
    4500,
    5000,
    5500,
    6000,
    7000,
    8000,
    9000,
    10000,
    15000,
    20000,
    25000,
    30000,
  ];

  const saleMinPrices = [
    LISTING_MIN_PRICE,
    50000,
    100000,
    150000,
    200000,
    250000,
    300000,
    350000,
    400000,
    450000,
    500000,
    550000,
    600000,
    700000,
    800000,
    900000,
    1000000,
    1500000,
    2000000,
    2500000,
    3000000,
  ];

  const saleMaxPrices = [
    LISTING_MAX_PRICE,
    500000,
    1000000,
    1500000,
    2000000,
    2500000,
    3000000,
    3500000,
    4000000,
    4500000,
    5000000,
    5500000,
    6000000,
    7000000,
    8000000,
    9000000,
    10000000,
    15000000,
    20000000,
    25000000,
    30000000,
  ];

  const [urlSearchPArams, setUrlSearchParams] = useSearchParams();
  const storedSearchParams = useSelector(
    (store) => store.publicListing.searchParams.params
  );

  const storedFilterValues = useSelector(
    (store) => store.publicListing.filterValues.values
  );

  const propertyCategories = useSelector(
    (store) => store.propertyCategory.propertyCategoryList.response.data
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const forRent = urlSearchPArams.get("for_rent");
    const forSale = urlSearchPArams.get("for_sale");
    const propertyCategoryId = urlSearchPArams.get("property_category");
    const minPrice = parseFloat(urlSearchPArams.get("min_price"));
    const maxPrice = parseFloat(urlSearchPArams.get("max_price"));
    const numberOfBedRooms = parseInt(
      urlSearchPArams.get("number_of_bed_rooms")
    );

    const propertyCategory = getPropertyCategoryData(
      propertyCategories,
      parseInt(propertyCategoryId)
    );

    var listingType;
    if (forRent === "true" && forSale === "true") {
      listingType = "Any";
    } else if (forRent === "true" && forSale === "false") {
      listingType = LISTING_TYPE_FOR_RENT;
    } else if (forRent === "false" && forSale === "true") {
      listingType = LISTING_TYPE_FOR_SALE;
    }

    dispatch(
      setListingFilterValues({
        ...storedFilterValues,
        listing_type: listingType,
        property_category: propertyCategory
          ? propertyCategory
          : { name: "Property category" },
        min_price: minPrice > -1 ? minPrice : LISTING_MIN_PRICE,
        max_price: maxPrice > -1 ? maxPrice : LISTING_MAX_PRICE,
        // number_of_bed_rooms: numberOfBedRooms,
      })
    );
  }, [urlSearchPArams]);

  const onPropertyCategorySelect = (event) => {
    const propCategory = getPropertyCategoryData(
      propertyCategories,
      parseInt(event)
    );

    let forRent, forSale, filterListingTypeValue;

    if (propCategory?.cat_key === LAND_KEY) {
      forRent = false;
      forSale = true;
      filterListingTypeValue = LISTING_TYPE_FOR_SALE;
    } else {
      forRent = urlSearchPArams.get("for_rent");
      forSale = urlSearchPArams.get("for_sale");
      if (forRent === "true" && forSale === "false") {
        filterListingTypeValue = LISTING_TYPE_FOR_RENT;
      } else if (forRent === "false" && forSale === "true") {
        filterListingTypeValue = LISTING_TYPE_FOR_SALE;
      } else {
        filterListingTypeValue = LISTING_TYPE_ANY;
      }
    }
    setUrlSearchParams({
      ...storedSearchParams,
      property_category: event,
      for_rent: forRent,
      for_sale: forSale,
    });
    dispatch(
      setSearchParams({
        ...storedSearchParams,
        property_category: event,
        for_rent: forRent,
        for_sale: forSale,
      })
    );
    dispatch(
      setListingFilterValues({
        ...storedFilterValues,
        property_category: propCategory,
        listing_type: filterListingTypeValue,
      })
    );
  };

  const onNumOfBedsSelect = (event) => {
    setUrlSearchParams({
      ...storedSearchParams,
      number_of_bed_rooms: parseFloat(event),
    });
    dispatch(
      setSearchParams({
        ...storedSearchParams,
        number_of_bed_rooms: parseFloat(event),
      })
    );

    dispatch(
      setListingFilterValues({
        ...storedFilterValues,
        number_of_bed_rooms: parseFloat(event),
      })
    );
  };

  const onListingTypeSelect = (event) => {
    let filterValue = {};
    if (event === LISTING_TYPE_FOR_RENT) {
      filterValue = { ...filterValue, for_rent: true, for_sale: false };
    } else if (event === LISTING_TYPE_FOR_SALE) {
      filterValue = { ...filterValue, for_rent: false, for_sale: true };
    } else {
      filterValue = { ...filterValue, for_rent: true, for_sale: true };
    }

    setUrlSearchParams({
      ...storedSearchParams,
      ...filterValue,
      min_price: -1,
      max_price: -1,
    });
    dispatch(
      setSearchParams({
        ...storedSearchParams,
        ...filterValue,
        min_price: -1,
        max_price: -1,
      })
    );
    dispatch(
      setListingFilterValues({
        ...storedFilterValues,
        listing_type: event,
        min_price: LISTING_MIN_PRICE,
        max_price: LISTING_MAX_PRICE,
      })
    );
  };

  const onMinPriceSelect = (event) => {
    let selectedValue = event === LISTING_MIN_PRICE ? -1 : parseFloat(event);

    setUrlSearchParams({ ...storedSearchParams, min_price: selectedValue });
    dispatch(
      setSearchParams({
        ...storedSearchParams,
        min_price: selectedValue,
      })
    );
    dispatch(
      setListingFilterValues({
        ...storedFilterValues,
        min_price: selectedValue === -1 ? LISTING_MIN_PRICE : selectedValue,
      })
    );
  };

  const onMaxPriceSelect = (event) => {
    let selectedValue = event === LISTING_MAX_PRICE ? -1.0 : parseFloat(event);

    setUrlSearchParams({ ...storedSearchParams, max_price: selectedValue });
    dispatch(
      setSearchParams({
        ...storedSearchParams,
        min_price: selectedValue,
      })
    );
    dispatch(
      setListingFilterValues({
        ...storedFilterValues,
        max_price: selectedValue === -1 ? LISTING_MAX_PRICE : selectedValue,
      })
    );
  };

  return (
    <div className="row row-cols-auto g-3">
      <div className="col flex-center-general">
        <i className="large filter icon link-general"></i>
      </div>
      <div className="col flex-center-general ">
        <DropdownButton
          id="filter-property-category"
          title={storedFilterValues?.property_category?.name}
          bsPrefix="footer-bg btn btn-general-outline py-2 px-3"
          onSelect={onPropertyCategorySelect}
        >
          <div className="dropdown-scrollable">
            {propertyCategories.map((pCategory) => {
              return (
                <Dropdown.Item eventKey={pCategory?.id} key={pCategory?.id}>
                  {pCategory?.name}
                </Dropdown.Item>
              );
            })}
          </div>
        </DropdownButton>
      </div>
      {(storedFilterValues?.property_category?.cat_key === VILLA_KEY ||
        storedFilterValues?.property_category?.cat_key === CONDOMINIUM_KEY ||
        storedFilterValues?.property_category?.cat_key ===
          TRADITIONAL_HOUSE_KEY ||
        storedFilterValues?.property_category?.cat_key === SHARE_HOUSE_KEY ||
        storedFilterValues?.property_category?.cat_key === APARTMENT_KEY) && (
        <div className="col flex-center-general">
          <DropdownButton
            id="filter-number-of-beds"
            title={`${
              storedFilterValues?.number_of_bed_rooms == 6
                ? String(storedFilterValues?.number_of_bed_rooms) + "+"
                : storedFilterValues?.number_of_bed_rooms
            } ${storedFilterValues?.number_of_bed_rooms == 1 ? "Bed" : "Beds"}`}
            bsPrefix="footer-bg btn btn-general-outline py-2 px-3"
            onSelect={onNumOfBedsSelect}
          >
            <Dropdown.Item eventKey={1}>1 Bed</Dropdown.Item>
            <Dropdown.Item eventKey={2}>2 Beds</Dropdown.Item>
            <Dropdown.Item eventKey={3}>3 Beds</Dropdown.Item>
            <Dropdown.Item eventKey={4}>4 Beds</Dropdown.Item>
            <Dropdown.Item eventKey={5}>5 Beds</Dropdown.Item>
            <Dropdown.Item eventKey={6}>6+ Beds</Dropdown.Item>
          </DropdownButton>
        </div>
      )}
      {storedFilterValues?.property_category?.cat_key !== LAND_KEY && (
        <div className="col flex-center-general">
          <DropdownButton
            id="filter-listing-type"
            title={storedFilterValues?.listing_type}
            bsPrefix="btn footer-bg btn-general-outline py-2 px-3"
            onSelect={onListingTypeSelect}
          >
            <Dropdown.Item eventKey={LISTING_TYPE_FOR_RENT}>
              {LISTING_TYPE_FOR_RENT}
            </Dropdown.Item>

            <Dropdown.Item eventKey={LISTING_TYPE_FOR_SALE}>
              {LISTING_TYPE_FOR_SALE}
            </Dropdown.Item>
            <Dropdown.Item eventKey={LISTING_TYPE_ANY}>
              {LISTING_TYPE_ANY}
            </Dropdown.Item>
          </DropdownButton>
        </div>
      )}
      <div className="col flex-center-general">
        <DropdownButton
          id="rent-min-price"
          title={storedFilterValues?.min_price}
          bsPrefix="btn footer-bg btn-general-outline py-2 px-3"
          onSelect={onMinPriceSelect}
        >
          <div className="dropdown-scrollable">
            {storedFilterValues?.listing_type === LISTING_TYPE_FOR_RENT && (
              <>
                {rentMinPrices.map((minPrice, index) => (
                  <Dropdown.Item eventKey={minPrice} key={index}>
                    {minPrice}
                  </Dropdown.Item>
                ))}
              </>
            )}
            {storedFilterValues?.listing_type === LISTING_TYPE_FOR_SALE && (
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
          title={`${storedFilterValues?.max_price}`}
          bsPrefix="btn btn-general-outline py-2 px-3"
          onSelect={onMaxPriceSelect}
        >
          <div className="dropdown-scrollable">
            {storedFilterValues?.listing_type === LISTING_TYPE_FOR_RENT && (
              <>
                {rentMaxPrices.map((maxPrice, index) => (
                  <Dropdown.Item eventKey={maxPrice} key={index}>
                    {maxPrice}
                  </Dropdown.Item>
                ))}
              </>
            )}
            {storedFilterValues?.listing_type === LISTING_TYPE_FOR_SALE && (
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
