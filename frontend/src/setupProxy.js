const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/user",
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
    })
  );
  app.use(
    "/posts",
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: false,
    })
  );
};
