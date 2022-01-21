(async () => {
  try {
    const MyFirstNFT = await ethers.getContractFactory("Lolzies");

    const myFirstNFT = await MyFirstNFT.deploy();

    console.log(myFirstNFT.address);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
