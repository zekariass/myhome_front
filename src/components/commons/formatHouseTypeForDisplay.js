export const formatHouseTypeForDisplay = (data, houseTypes) => {
  let newData = { ...data };

  //Select a building type name that matches with office building type id
  houseTypes.forEach((houseType) => {
    if (houseType.id === newData.house_type) {
      newData = {
        ...newData,
        house_type: houseType?.type,
      };
    }
  });

  return newData;
};
