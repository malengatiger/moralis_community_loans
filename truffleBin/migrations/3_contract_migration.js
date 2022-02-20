// eslint-disable-next-line no-undef
const SimpleToken = artifacts.require("SimpleToken");

module.exports = async function (deployer) {
  await deployer.deploy(
    SimpleToken,
    "SimpleToken",
    "SMT",
    "60000000000000000000000"
  );
};
