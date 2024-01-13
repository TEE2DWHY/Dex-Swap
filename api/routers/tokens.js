const router = require("express").Router();
const { getTokenPrice, proxyMiddleware } = require("../controllers/tokens");

router.get("/get-prices", getTokenPrice);
router.use("/swap", proxyMiddleware);

module.exports = router;
