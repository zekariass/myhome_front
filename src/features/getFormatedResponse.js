export const getFormatedResponse = (result) => {
  let response = {};
  response.data = result.data;
  response.status = result.status;
  // console.log("RESULT: ", response);

  return response;
};
