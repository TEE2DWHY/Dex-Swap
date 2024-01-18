const router = require("express").Router();
const {
  getTokenPrice,
  proxyMiddleware,
  getTokenWalletBalanceEth,
  getTokenWalletBalanceBsc,
} = require("../controllers/tokens");

router.get("/get-prices", getTokenPrice);
router.get("/get-tokens-eth", getTokenWalletBalanceEth);
router.get("/get-tokens-bsc", getTokenWalletBalanceBsc);

router.use("/swap", proxyMiddleware);

module.exports = router;
