// @ts-nocheck
import {
  HOLIDAY_PROMOTION,
  LISTING_MODE_PAY_PER_LISTING,
  LISTING_PARAMS_VALUE_TYPE_DAYS,
  LISTING_PARAMS_VALUE_TYPE_LISTING_COUNT,
  NEW_AGENT_PROMOTION,
} from "components/commons/Strings";

/**
 * Calculates the listing price
 * @param {*} listingPrices - Listing prices of the property, i.e. rent and sale prices
 * @param {*} listingdiscounts - Listing discounts of the property
 * @param {*} listingParams - Listing params for the property, i.e. NEW_AGENT_PROMOTION, HOLIDAY_PROMOTION, etc
 * @param {*} agentListingCount - Number of listings that the agent made so far
 * @param {*} selectedListingTypeId - The selected listing type, sale or rent
 * @param {*} agentData - Agent data
 * @returns
 */
const calculateListingPrice = (
  listingPrices,
  listingdiscounts,
  listingParams,
  agentListingCount,
  selectedListingTypeId,
  agentData
) => {
  //Initial original price
  let originalPrice = 0;

  //Currency in which the payment is to be made
  let currency = null;

  //Get the original price and currency from listing price
  //for the selected listing type
  listingPrices.forEach((listingPrice) => {
    if (parseInt(selectedListingTypeId) === listingPrice?.listing_type?.id) {
      originalPrice = listingPrice?.price;
      currency = listingPrice?.currency?.name;
    }
  });

  //Pay-per-listing param
  let payPerListingParams = [];

  //Select pay per listing params from listing params
  listingParams.forEach((param) => {
    if (param?.applied_to === LISTING_MODE_PAY_PER_LISTING) {
      payPerListingParams = [...payPerListingParams, param];
    }
  });

  //Get when the agent is registered
  const agentRegisterDate = new Date(agentData?.registered_on);

  //Get the date today
  const today = new Date();

  //Number of milliseconds per day
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  //Get the number of days since registration
  const daysSinceRegister = Math.round(
    Math.abs((today - agentRegisterDate) / oneDay)
  );

  //Calculate the listing price based on the discounts
  listingdiscounts.forEach((discount) => {
    //Check if the user has new agent propmotion
    if (discount?.listing_param?.name === NEW_AGENT_PROMOTION) {
      //Check if the agent does not exceed the number of days for discount since registration
      if (
        discount?.listing_param?.value_type ===
          LISTING_PARAMS_VALUE_TYPE_DAYS &&
        parseInt(discount?.param_value) >= daysSinceRegister
      ) {
        const calculatedValue =
          originalPrice -
          originalPrice * (parseFloat(discount?.discount_percentage) / 100) -
          parseFloat(discount?.discount_fixed);

        //Set the original price to the calculated value
        //The minimum price should be 0 (non negative)
        originalPrice = Math.max(0, calculatedValue);

        //Check if the agent does not exceed the number of listings for discount
      } else if (
        discount?.listing_param?.value_type ===
          LISTING_PARAMS_VALUE_TYPE_LISTING_COUNT &&
        parseInt(discount?.param_value) >= agentListingCount
      ) {
        const calculatedValue =
          originalPrice -
          originalPrice * (parseFloat(discount?.discount_percentage) / 100) -
          parseFloat(discount?.discount_fixed);

        //Set the original price to the calculated value
        //The minimum price should be 0 (non negative)
        originalPrice = Math.max(0, calculatedValue);
      }
    }
    //Check if the user has holiday propmotion
    if (discount?.listing_param?.name === HOLIDAY_PROMOTION) {
      //Check if the promotion for the agent is not expired
      if (
        discount?.listing_param?.value_type ===
          LISTING_PARAMS_VALUE_TYPE_DAYS &&
        !discount?.is_expired
      ) {
        const calculatedValue =
          originalPrice -
          originalPrice * (parseFloat(discount?.discount_percentage) / 100) -
          parseFloat(discount?.discount_fixed);

        originalPrice = Math.max(0, calculatedValue);
      }
    }
  });

  return { listingPrice: originalPrice, currency: currency };
};

export default calculateListingPrice;
