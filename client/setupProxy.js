const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = {
  target: 'http://localhost:3001',
  changeOrigin: true
}

module.exports = app => {
  app.use("/api/*", createProxyMiddleware(proxy));
  app.use("/images/*", createProxyMiddleware(proxy));

}