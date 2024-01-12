const moralis = require("moralis").default;

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
    res.status(200).json({
      message: {
        token1: responseOne,
        token2: responseTwo,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "An Error Occurred.",
    });
    console.log(error.message);
  }
};

module.exports = getTokenPrice;
