// setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");
// for your API key in .env
// require("dotenv").config();

module.exports = function (app) {
  app.use(
    "/swap",
    createProxyMiddleware({
      target: "https://api.1inch.dev",
      changeOrigin: true,
      onProxyReq: (proxyReq) => {
        // add API key in Header
        proxyReq.setHeader(
          "Authorization",
          `Bearer xMFlvMlCR7uApl889BYc9IFF321ylRxa`
        );
      },
    })
  );
};
