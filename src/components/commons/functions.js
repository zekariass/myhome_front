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

export const getListingTypeName = (listingTypeId, listingTyps) => {
  let listingType;

  listingTyps.forEach((listingTypeObj) => {
    if (listingTypeObj?.id === listingTypeId) {
      listingType = listingTypeObj?.type;
    }
  });

  return listingType;
};
