// eslint-disable-next-line no-undef
const TheToken = artifacts.require("TheToken");

const account1 = "0xa38814294Ca92566F76773265fd15655153E58e7";
module.exports = function (deployer) {
  deployer.deploy(TheToken, account1);
};
