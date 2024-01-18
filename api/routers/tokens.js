const router = require("express").Router();
const {
  getTokenPrice,
  proxyMiddleware,
  getTokenWalletBalanceEth,
  getTokenWalletBalanceBsc,
  getTokenWalletBalanceAvax,
  getTokenWalletBalancePol,
} = require("../controllers/tokens");

router.get("/get-prices", getTokenPrice);
router.get("/get-tokens-eth", getTokenWalletBalanceEth);
router.get("/get-tokens-bsc", getTokenWalletBalanceBsc);
router.get("/get-tokens-avax", getTokenWalletBalanceAvax);
router.get("/get-tokens-pol", getTokenWalletBalancePol);

router.use("/swap", proxyMiddleware);

module.exports = router;
