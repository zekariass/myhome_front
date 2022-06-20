// @ts-nocheck
import { PATH_AGENT_DASHBOARD_LISTING_ADD_ABSOLUTE } from "components/commons/Strings";
import {
  getListingDiscountByCategory,
  getListingPriceByCategory,
} from "features/agent_dashboard/property/propertyCategorySlice";
import { getAgentListingCount } from "features/listing/listingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const ListingList = () => {
  const [propertyData, setPropertyData] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const propertyData = location.state?.data;
    // console.log("ListingList ccc: ", propertyData);
    setPropertyData(propertyData);

    dispatch(getListingDiscountByCategory(propertyData?.cat_key));
    dispatch(getListingPriceByCategory(propertyData?.cat_key));

    dispatch(getAgentListingCount());
  }, []);

  const onAddListingClick = () => {
    navigate(PATH_AGENT_DASHBOARD_LISTING_ADD_ABSOLUTE, {
      state: { data: propertyData },
    });
  };
  return (
    <div>
      <div>ListingList</div>
      <div>
        <button className="btn-general py-2 px-3" onClick={onAddListingClick}>
          Add Listing
        </button>
      </div>
    </div>
  );
};

export default ListingList;
