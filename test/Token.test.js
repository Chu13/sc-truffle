const Token = artifacts.require("Token");

contract("Token", (accounts) => {
  before(async () => {
    token = await Token.deployed();
  });

  it("Contract start total supply is 1M tokens", async () => {
    let totalSupply = await token.totalSupply();
    totalSupply = web3.utils.fromWei(totalSupply, "ether");
    assert.equal(totalSupply, 1000000000, "total supply should be 1 Billion");
  });

  it ("Can transfer tokens between accounts", async  () => {
    let amount = web3.utils.toWei("1000", "ether");
    await token.transfer(accounts[1], amount, { from: accounts[0] });
    let balance = await token.balanceOf(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    assert.equal(balance, 1000, "User balance should be 1000 for the transferred tokens");
  });
});
