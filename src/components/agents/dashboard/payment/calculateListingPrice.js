// @ts-nocheck
import {
  HOLIDAY_PROMOTION,
  LISTING_PARAMS_VALUE_TYPE_DAYS,
  LISTING_PARAMS_VALUE_TYPE_LISTING_COUNT,
  NEW_AGENT_PROMOTION,
} from "components/commons/Strings";

const calculateListingPrice = (
  listingPrices,
  listingdiscounts,
  listingParams,
  agentListingCount,
  selectedListingTypeId,
  agentData
) => {
  let originalPrice = 0;

  let currency = null;

  listingPrices.forEach((listingPrice) => {
    if (parseInt(selectedListingTypeId) === listingPrice?.listing_type?.id) {
      originalPrice = listingPrice?.price;
      currency = listingPrice?.currency?.name;
    }
  });

  let payPerListingParams = [];

  listingParams.forEach((param) => {
    if (param?.applied_to === "PAY_PER_LISTING") {
      payPerListingParams = [...payPerListingParams, param];
    }
  });

  const agentRegisterDate = new Date(agentData?.registered_on);
  const today = new Date();

  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  const daysSinceRegister = Math.round(
    Math.abs((today - agentRegisterDate) / oneDay)
  );

  //   console.log("agentRegisterDate: ", daysSinceRegister);

  listingdiscounts.forEach((discount) => {
    if (discount?.listing_param?.name === NEW_AGENT_PROMOTION) {
      if (
        discount?.listing_param?.value_type ===
          LISTING_PARAMS_VALUE_TYPE_DAYS &&
        parseInt(discount?.param_value) >= daysSinceRegister
      ) {
        const calculatedValue =
          originalPrice -
          originalPrice * (parseFloat(discount?.discount_percentage) / 100) -
          parseFloat(discount?.discount_fixed);

        originalPrice = Math.max(0, calculatedValue);
      } else if (
        discount?.listing_param?.value_type ===
          LISTING_PARAMS_VALUE_TYPE_LISTING_COUNT &&
        parseInt(discount?.param_value) >= agentListingCount
      ) {
        const calculatedValue =
          originalPrice -
          originalPrice * (parseFloat(discount?.discount_percentage) / 100) -
          parseFloat(discount?.discount_fixed);

        originalPrice = Math.max(0, calculatedValue);
      }
    }
    if (discount?.listing_param?.name === HOLIDAY_PROMOTION) {
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
