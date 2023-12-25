// This file serves as the backend server of the project itself

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




// // import axios
// // import cheerio
// const express = require('express')
// const app = express();
// const axios = require('axios')
// const cheerio = require('cheerio')
// const path = require('path')
// const port = process.env.PORT || 8000;
//
// app.use(express.static('client')); // Serves main page from client directory
//
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname,'..', 'client', 'index.html'));
// });
//
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
//
// async function getTide() {
//     const url1 = "https://www.tides.gc.ca/en/stations/03250/2023-08-04?tz=EDT&unit=m";
//     try {
//         const response = await axios.get(url1);
//         const $ = cheerio.load(response.data);
//
//         const pred = $("#readings-list-predictions tbody").text().split("\n");
//
//         // Readings are done in increments of 15 mins
//         console.log(pred[2].trim()); // current time
//         console.log(pred[3].trim()); // current reading (in m)
//         console.log(pred[6].trim()); // next 15 min
//         console.log(pred[7].trim()); // next 15 min reading (in m)
//         console.log(pred[10].trim());
//         console.log(pred[11].trim());
//     } catch (error) {
//         console.error(error);
//     }
// }
// getTide();
