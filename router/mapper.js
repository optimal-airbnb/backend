module.exports = {
  intToBoolean,
  booleanToint,
  userTobody,
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
