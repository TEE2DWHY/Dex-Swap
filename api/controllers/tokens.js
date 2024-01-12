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
    console.log(error.message);
  }
};

module.exports = getTokenPrice;
