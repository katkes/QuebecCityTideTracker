// This file serves as the server of the project itself

const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');

const app = express();

// Proxy endpoint for tides
app.use('/api', createProxyMiddleware({
    target: 'https://www.tides.gc.ca',
    changeOrigin: true,
    pathRewrite:{
        '^/api': '', // rewrites API path
    }
}))


// Proxy endpoint for weather
app.use('/api/weather', createProxyMiddleware({
    target: 'https://my-server.tld',
    changeOrigin: true,
    pathRewrite: {
        '^/api/weather': '/v1/forecast',
    }
}));

const PORT = process.env.PORT || 3001; // Server to be hosted on Port 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

