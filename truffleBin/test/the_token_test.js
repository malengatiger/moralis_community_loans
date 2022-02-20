const TheTokenTest = artifacts.require("TheTokenTest");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("TheTokenTest", function (/* accounts */) {
  it("should assert true", async function () {
    await TheTokenTest.deployed();
    return assert.isTrue(true);
  });
});
