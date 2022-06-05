export const getAmenitiesByAmenityCategory = (
  amenities,
  filterDuplicate = false,
  propertyAmenities = []
) => {
  //Object for holding formatted amenities
  const tempAmenitiesByCategory = {};

  //find and use the amenity categories as key for formatted amenities
  amenities?.forEach((amen) => {
    tempAmenitiesByCategory[amen.category.name] = [];
  });

  //Format the amenities by amenity category
  //Amenities in same category are displayed in same component
  amenities?.forEach((amen) => {
    //If filterDuplicate=true, filter out property amenities from all property category amenities
    if (filterDuplicate) {
      let propertyAmenitiesIds = [];
      propertyAmenities.forEach((amenity) => {
        propertyAmenitiesIds = [...propertyAmenitiesIds, amenity?.id];
      });
      Object.keys(tempAmenitiesByCategory)?.forEach((categoryKey) => {
        if (categoryKey === amen.category.name) {
          tempAmenitiesByCategory[categoryKey] = !propertyAmenitiesIds.includes(
            amen?.id
          )
            ? [...tempAmenitiesByCategory[categoryKey], amen]
            : tempAmenitiesByCategory[categoryKey];
        }
      });
    } else {
      Object.keys(tempAmenitiesByCategory)?.forEach((categoryKey) => {
        if (categoryKey === amen.category.name) {
          tempAmenitiesByCategory[categoryKey] = [
            ...tempAmenitiesByCategory[categoryKey],
            amen,
          ];
        }
      });
    }
  });

  return tempAmenitiesByCategory;
};
