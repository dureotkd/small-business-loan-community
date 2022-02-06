/*
value값이 비어있는지 확인합니다 
true,false
*/
const empty = function (value) {
  if (
    value === "" ||
    value === null ||
    value === undefined ||
    value === 0 ||
    (value != null && typeof value == "object" && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};

//  async await setTimeout
const wait = (timeToDelay) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay));

export { empty, wait };
