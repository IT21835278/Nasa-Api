const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://ssd-api.jpl.nasa.gov',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        })
    );
};
