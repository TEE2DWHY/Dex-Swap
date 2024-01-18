const moralis = require("moralis").default;
const { createProxyMiddleware } = require("http-proxy-middleware");

const getTokenPrice = async (req, res) => {
  try {
    const { addressOne, addressTwo } = req.query;
    if (!addressOne || !addressTwo) {
      return res.status(401).json({
        message: "Please Provide Token Address",
      });
    }
    const responseOne = await moralis.EvmApi.token.getTokenPrice({
      address: addressOne,
    });
    const responseTwo = await moralis.EvmApi.token.getTokenPrice({
      address: addressTwo,
    });
    const usdPrice = {
      tokenOne: responseOne.raw.usdPrice,
      tokenTwo: responseTwo.raw.usdPrice,
      ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice,
    };
    res.status(200).json(usdPrice);
  } catch (error) {
    res.status(500).json({
      message: "An Error Occurred.",
    });
    console.log(error);
  }
};

const getTokenWalletBalanceEth = async (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.status(401).json({
      message: "Please Provide User Address",
    });
  }
  try {
    const response = await moralis.EvmApi.token.getWalletTokenBalances({
      chain: "0x1",
      address: address,
    });
    const data = response.raw.map((token) => {
      return { contractAddress: token.token_address, symbol: token.symbol };
    });
    res.status(200).json({
      message: data,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const getTokenWalletBalanceBsc = async (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.status(401).json({
      message: "Please Provide User Address",
    });
  }
  try {
    const response = await moralis.EvmApi.token.getWalletTokenBalances({
      chain: "0x38",
      address: address,
    });
    const data = response.raw.map((token) => {
      return { contractAddress: token.token_address, symbol: token.symbol };
    });
    res.status(200).json({
      message: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const proxyMiddleware = createProxyMiddleware({
  target: "https://api.1inch.dev",
  changeOrigin: true,
  onProxyReq: (proxyReq) => {
    // add API key in Header
    proxyReq.setHeader("Authorization", `Bearer ${process.env.INCH_KEY}`);
  },
});

module.exports = {
  getTokenPrice,
  getTokenWalletBalanceEth,
  getTokenWalletBalanceBsc,
  proxyMiddleware,
};
