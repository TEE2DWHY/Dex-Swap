const express = require("express");
const app = express();
require("dotenv").config();
const moralis = require("moralis").default;
const cors = require("cors");
const tokenRouter = require("./routers/tokens");

// middlewares
app.use(express.json());
app.use(cors());
app.use("/tokens", tokenRouter);
app.use("/", tokenRouter);
const PORT = process.env.PORT;

moralis
  .start({
    apiKey: process.env.MORALIS_KEY,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
