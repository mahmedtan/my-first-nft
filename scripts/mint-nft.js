require("dotenv").config();
const { API_URL, PUBLIC_KEY, PRIVATE_KEY } = process.env;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { default: axios } = require("axios");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyFirstNFT.sol/MyFirstNFT.json");
const contractAddress = "0x41C2Cf8305bDe47c1d4D4bfc59cB33609837FF6e";
const myFirstNFTContract = new web3.eth.Contract(contract.abi, contractAddress);

const mintNFT = async (tokenURI) => {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 8000000,
    maxPriorityFeePerGas: "19999999999",
    data: myFirstNFTContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signedTx = await web3.eth.accounts.signTransaction(
    tx,
    `0x${PRIVATE_KEY}`
  );

  const txReceipt = await web3.eth.sendSignedTransaction(
    signedTx.rawTransaction
  );

  console.log(JSON.stringify(txReceipt));
};
