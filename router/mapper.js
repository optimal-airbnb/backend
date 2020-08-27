module.exports = {
  intToBoolean,
  booleanToint,
  userTobody,
  propertyTobody,
  imageTobody,
  priceTobody
};

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function booleanToint(bool) {
  return bool === true ? 1 : 0;
}

function userTobody(user) {
  return {
    ...user,
  };
}
function propertyTobody(property) {
  return {
    ...property,
  }
}
function imageTobody(image) {
  return {
    ...image,
  }
}
function priceTobody(price) {
  return {
    ...price,
  }
}