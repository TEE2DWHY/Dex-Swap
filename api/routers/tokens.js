const router = require("express").Router();
const getTokenPrice = require("../controllers/tokens");

router.get("/get-prices", getTokenPrice);

module.exports = router;
