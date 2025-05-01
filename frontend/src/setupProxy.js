const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/users',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
  
  app.use(
    '/api/properties',
    createProxyMiddleware({
      target: 'http://localhost:8001',
      changeOrigin: true,
    })
  );
};
