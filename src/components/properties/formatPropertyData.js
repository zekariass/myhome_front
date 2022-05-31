const {
  APARTMENT_KEY,
  COMMERCIAL_PROPERTY_KEY,
  ALL_PURPOSE_PROPERTY_KEY,
  CONDOMINIUM_KEY,
  VILLA_KEY,
  TRADITIONAL_HOUSE_KEY,
  OFFICE_KEY,
  HALL_KEY,
  SHARE_HOUSE_KEY,
  LAND_KEY,
} = require("components/commons/Strings");

/**
 *
 * @param {object} values
 * @param {object} data
 * @returns
 */
const formatPropertyData = (values, data) => {
  //Current selected property ID
  const catId = values.property_category;

  let newValues;

  //Find the full object of currently selected property category
  const categoryObj = data.find((category) => category.id === parseInt(catId));

  let { category, ...rest } = values;

  //  Select the right category based on selected category ID
  //  The values object may have multiple category data which does not correspond to the propety category ID
  //  in values object
  switch (categoryObj?.cat_key) {
    case APARTMENT_KEY:
      category = { apartment: category.apartment };
      break;
    case COMMERCIAL_PROPERTY_KEY:
      category = { commercial_property: category.commercial_property };
      break;
    case ALL_PURPOSE_PROPERTY_KEY:
      category = { all_purpose_property: category.all_purpose_property };
      break;
    case CONDOMINIUM_KEY:
      category = { condominium: category.condominium };
      break;
    case VILLA_KEY:
      category = { villa: category.villa };
      break;
    case TRADITIONAL_HOUSE_KEY:
      category = { traditional_house: category.traditional_house };
      break;
    case OFFICE_KEY:
      category = { office: category.office };
      break;
    case HALL_KEY:
      category = { hall: category.hall };
      break;
    case SHARE_HOUSE_KEY:
      category = { share_house: category.share_house };
      break;
    case LAND_KEY:
      category = { land: category.land };
      break;
    default:
      category = {};
  }

  //Construct new Object to be sent to backend
  newValues = { category, ...rest };
  return newValues;
};

export default formatPropertyData;
