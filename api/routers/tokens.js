const router = require("express").Router();
const {
  getTokenPrice,
  proxyMiddleware,
  getTokenWalletBalance,
} = require("../controllers/tokens");

router.get("/get-prices", getTokenPrice);
router.get("/get-token-balance", getTokenWalletBalance);
router.use("/swap", proxyMiddleware);

module.exports = router;
