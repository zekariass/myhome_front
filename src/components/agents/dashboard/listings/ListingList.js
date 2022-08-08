// @ts-nocheck
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import {
  ALL_PURPOSE_PROPERTY_KEY,
  APARTMENT_KEY,
  COMMERCIAL_PROPERTY_KEY,
  LISTING_KEY_BY_AGENT,
  LISTING_KEY_BY_UNIT,
  PATH_AGENT_DASHBOARD_FEATURE_LISTING_ABSOLUTE,
  PATH_AGENT_DASHBOARD_LISTING_ADD_ABSOLUTE,
  PATH_AGENT_DASHBOARD_LISTING_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_LISTING_EDIT_ABSOLUTE,
  RENT_LISTING_TYPE,
} from "components/commons/Strings";

import {
  deleteListing,
  getListingsByAgent,
  getListingsByProperty,
  getListingsByPropertyUnit,
  resetListingList,
} from "features/listing/listingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Listing list that shows the listings of a property
 * @param {*} param0
 * @returns
 */
const ListingList = ({ code }) => {
  const [propertyData, setPropertyData] = useState({});
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  //Get listing key from store
  //Listing key is a flag key that identifies whether the current property has units or not
  //and whether the total listings of agent are to be displayed or for specific unit or property
  //If all listing is to be displayed by an agent, then "byAgent" is the key, otherwise
  //"byProperty" or "byUnit" is the value of listingKey
  const { listingKey } = useSelector((store) => store.listing);

  //Get the listings from store
  const listings = useSelector((store) => store.listing.listingList.data);

  //Get listing type from store, (sale or rent)
  const listingTypes = useSelector(
    (store) => store.listing.getListingTypes.data
  );

  //Get currencies from store
  const currencies = useSelector(
    (store) => store.system.currency.currencyList.data
  );

  useEffect(() => {
    //Get property data from router location
    const propertyData = location.state?.data;
    setPropertyData(propertyData);

    //Empty the listing list
    dispatch(resetListingList());

    //Get listing keys based on the where the agent need to access the list
    // LISTING_KEY_BY_AGENT if the agent needs to get all the listings of all properties
    if (listingKey === LISTING_KEY_BY_AGENT) {
      dispatch(getListingsByAgent());
    } else if (listingKey === LISTING_KEY_BY_UNIT) {
      dispatch(
        getListingsByPropertyUnit({
          unit: propertyData?.id,
          cat_key: propertyData?.cat_key,
        })
      );
    } else {
      dispatch(getListingsByProperty(propertyData?.property));
    }
  }, [listingKey]);

  useEffect(() => {
    let rentListingType;
    let saleListingType;

    //Format listings based on listing types, rent listing and salelisting
    listingTypes.forEach((listingType) => {
      if (listingType?.type === RENT_LISTING_TYPE) {
        rentListingType = listingType;
      } else {
        saleListingType = listingType;
      }
    });

    let rentLists = [];
    let saleLists = [];

    // if it is LISTING_KEY_BY_UNIT, the listings fetched under key main_listings
    let unitListings = [];
    if (
      (propertyData?.cat_key === COMMERCIAL_PROPERTY_KEY ||
        propertyData?.cat_key === APARTMENT_KEY ||
        propertyData?.cat_key === ALL_PURPOSE_PROPERTY_KEY) &&
      listingKey === LISTING_KEY_BY_UNIT
    ) {
      listings.forEach((listing) => {
        unitListings = [...unitListings, listing?.main_listing];
      });
    }

    //The listings to be displayed are either unit listing or property listings, where
    //property listings are fetched as listings above from store
    const newListings = !!unitListings.length ? unitListings : listings;

    //Format listings to sale and rent listing for display
    newListings.forEach((listing) => {
      if (listing?.listing_type === rentListingType?.id) {
        rentLists = [...rentLists, listing];
      } else {
        saleLists = [...saleLists, listing];
      }
    });
    setRentListings(rentLists);
    setSaleListings(saleLists);
  }, [listings]);

  /**
   * Format listing data to display name of currency instead of id
   * @param {*} listingsByType
   * @returns
   */
  const formatListingData = (listingsByType) => {
    let formmatedListings = [];

    listingsByType.forEach((listing) => {
      const { listed_on, listing_currency, ...listingRest } = listing;
      const listingCurrency = currencies.find(
        (currency) => currency?.id === listing_currency
      );
      const listedOn = new Date(listed_on).toUTCString();
      const newListing = {
        listed_on: listedOn,
        listing_currency: listingCurrency?.name ? listingCurrency?.name : "",
        ...listingRest,
      };
      formmatedListings = [...formmatedListings, newListing];
    });

    return formmatedListings;
  };

  /**
   * Prepare the rent listing data for tabular display
   * @returns
   */
  const prepareListingDataForDisplay = (listingDataByType) => {
    const columns = [
      "id",
      "listing_state",
      "is_approved",
      "is_expired",
      "property_price",
      "listing_currency",
      "listing_term",
      "deposit_in_months",
      "listed_on",
    ];

    return { data: formatListingData(listingDataByType), columns: columns };
  };

  /**
   * Handle the add linstings link click
   * Navigates to the add listing form
   */
  const onAddListingClick = () => {
    navigate(PATH_AGENT_DASHBOARD_LISTING_ADD_ABSOLUTE, {
      state: { data: propertyData },
    });
  };

  /**
   * Handles the delete listing event
   * @param {listingId} listingId
   */
  const onListingDelete = (listingId) => {
    //If the property has units, then get unit ID so that the backend can search
    //the listing and delete the right listing
    let unitId;
    if (
      (propertyData?.cat_key === APARTMENT_KEY ||
        propertyData?.cat_key === COMMERCIAL_PROPERTY_KEY ||
        propertyData?.cat_key === ALL_PURPOSE_PROPERTY_KEY) &&
      listingKey === LISTING_KEY_BY_UNIT
    ) {
      unitId = propertyData?.id;
    }
    dispatch(
      deleteListing({
        listingId: listingId,
        listingKey: listingKey,
        propertyId: propertyData?.property,
        unitId: unitId,
        catKey: propertyData?.cat_key,
      })
    );
  };

  return (
    <div key={code}>
      <div className="card p-4">
        <div>
          <p className="display-title fw-bold fs-5 mb-4">Rent Listings</p>
        </div>
        <DataDisplayTabular
          data={prepareListingDataForDisplay(rentListings)}
          originalData={rentListings}
          deletable={true}
          onDelete={onListingDelete}
          editable={true}
          onEdit={{
            path: PATH_AGENT_DASHBOARD_LISTING_EDIT_ABSOLUTE,
            // propertyId: "",
          }}
          manageable={false}
          onManage={{
            path: PATH_AGENT_DASHBOARD_LISTING_DETAIL_ABSOLUTE,
          }}
          featureable={true}
          onFeature={{ path: PATH_AGENT_DASHBOARD_FEATURE_LISTING_ABSOLUTE }}
        />
      </div>
      <div className="card p-4 my-5">
        <div>
          <p className="display-title fw-bold fs-5 mb-4">Sale Listings</p>
        </div>
        <DataDisplayTabular
          data={prepareListingDataForDisplay(saleListings)}
          originalData={saleListings}
          deletable={true}
          onDelete={onListingDelete}
          editable={true}
          onEdit={{
            path: PATH_AGENT_DASHBOARD_LISTING_EDIT_ABSOLUTE,
            // propertyId: "",
          }}
          manageable={false}
          onManage={{
            path: PATH_AGENT_DASHBOARD_LISTING_DETAIL_ABSOLUTE,
          }}
          featureable={true}
          onFeature={{ path: PATH_AGENT_DASHBOARD_FEATURE_LISTING_ABSOLUTE }}
        />
      </div>
      {!(
        (propertyData?.cat_key === COMMERCIAL_PROPERTY_KEY ||
          propertyData?.cat_key === APARTMENT_KEY ||
          propertyData?.cat_key === ALL_PURPOSE_PROPERTY_KEY) &&
        listingKey === "byProperty"
      ) && (
        <div>
          <button className="btn-general py-2 px-3" onClick={onAddListingClick}>
            Add Listing
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingList;
