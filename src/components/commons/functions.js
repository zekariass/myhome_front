export const getCurrencyName = (currencies, currency_id) => {
  const listingCurrency = currencies.find(
    (currency) => currency?.id === currency_id
  );

  return listingCurrency?.name;
};

export const getPeriodicityName = (periodicities, periodicity_id) => {
  // console.log("periodicity_id: ", periodicity_id)
  const periodicityObj = periodicities.find(
    (periodicity) => periodicity?.id === periodicity_id
  );

  return periodicityObj?.period;
};

export const getFullAddress = (address) => {
  const street = address?.street;
  const city = address?.city;
  const region = address?.region;
  const postCode = address?.post_code;

  let fullAddress = `${street}, ${city?.name}, ${region?.name}`;

  if (postCode) {
    fullAddress = `${street}, ${postCode}, ${city?.name}, ${region?.name}`;
  }

  return fullAddress;
};

export const getPropertyCategoryData = (propertyCategories, propCatId) => {
  const propCatObj = propertyCategories.find(
    (propertyCategory) => propertyCategory?.id === propCatId
  );

  return propCatObj;
};

export const getPropertyCategoryByCategoryKey = (
  propertyCategories,
  catKey
) => {
  const propCatObj = propertyCategories.find(
    (propertyCategory) => propertyCategory?.cat_key === catKey
  );

  return propCatObj;
};

export const getListingTypeName = (listingTypeId, listingTyps) => {
  let listingType;

  listingTyps.forEach((listingTypeObj) => {
    if (listingTypeObj?.id === listingTypeId) {
      listingType = listingTypeObj?.type;
    }
  });

  return listingType;
};

/**
 * Format payment methods
 * Display in the dropdown only Credit card, Mobile and Bank transfer
 * @returns
 */
export const getFormatPaymentMethodNames = (paymentMethods) => {
  let newPaymentMethods = [];

  paymentMethods.forEach((paymentMethod) => {
    if (
      !(
        paymentMethod?.name === "SUBSCRIPTION" ||
        paymentMethod?.name === "COUPON" ||
        paymentMethod?.name === "CASH"
      )
    ) {
      let tempPaymentMethod = { ...paymentMethod };
      let paymentMethodName = tempPaymentMethod["name"]
        .replaceAll("_", " ")
        .toLowerCase();
      paymentMethodName =
        paymentMethodName.charAt(0).toUpperCase() + paymentMethodName.slice(1);

      tempPaymentMethod = { ...tempPaymentMethod, name: paymentMethodName };

      newPaymentMethods = [...newPaymentMethods, tempPaymentMethod];
    }
  });

  return newPaymentMethods;
};

export const getListingSearchParams = (urlSearchParams) => {
  const searchParams = {};
  searchParams.for_rent = urlSearchParams.get("for_rent");
  searchParams.for_sale = urlSearchParams.get("for_sale");
  searchParams.location = urlSearchParams.get("location");
  searchParams.property_category = urlSearchParams.get("property_category");
  searchParams.min_price = parseFloat(urlSearchParams.get("min_price"));
  searchParams.max_price = parseFloat(urlSearchParams.get("max_price"));
  searchParams.number_of_bed_rooms = parseInt(
    urlSearchParams.get("number_of_bed_rooms")
  );
  searchParams.sort_by = urlSearchParams.get("sort_by");
  searchParams.page = parseInt(urlSearchParams.get("page"));

  return searchParams;
};

export const getListingInitialSearchParams = () => {
  const searchParamInitialState = {
    for_rent: true,
    for_sale: true,
    location: -1,
    property_category: -1,
    min_price: -1,
    max_price: -1,
    number_of_bed_rooms: -1,
    sort_by: -1,
    page: 1,
  };

  return searchParamInitialState;
};
