import { setListingKey } from "features/listing/listingSlice";

export const setListingKeyValueByUnit = (dispatch) => {
  dispatch(setListingKey("byUnit"));
};

export const setListingKeyValueByProperty = (dispatch) => {
  dispatch(setListingKey("byProperty"));
};
