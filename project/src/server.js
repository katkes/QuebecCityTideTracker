// This file serves as the server of the project itself

const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');

const app = express();

// Proxy endpoint
app.use('/api', createProxyMiddleware({
    target: 'https://www.tides.gc.ca',
    changeOrigin: true,
    pathRewrite:{
        '^/api': 'localhost:3000', // Rewrite the path: remove '/api'
    }
}))

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

