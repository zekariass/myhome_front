export const formatBuildingTypeForDisplay = (data, buildingTypes) => {
  let newData = { ...data };

  //Select a building type name that matches with office building type id
  buildingTypes.forEach((buildingType) => {
    if (buildingType.id === newData.building_type) {
      newData = {
        ...newData,
        building_type: buildingType?.type,
      };
    }
  });

  return newData;
};
