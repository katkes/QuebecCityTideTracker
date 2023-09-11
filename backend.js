const cheerio = require("cheerio");
const axios = require("axios");

async function getTide() {
    const url1 = "https://www.tides.gc.ca/en/stations/03250/2023-08-04?tz=EDT&unit=m";
    try {
        const response = await axios.get(url1);
        const $ = cheerio.load(response.data);

        const pred = $("#readings-list-predictions tbody").text().split("\n");

        // Readings are done in increments of 15 mins
        console.log(pred[2].trim()); // current time
        console.log(pred[3].trim()); // current reading (in m)
        console.log(pred[6].trim()); // next 15 min
        console.log(pred[7].trim()); // next 15 min reading (in m)
        console.log(pred[10].trim());
        console.log(pred[11].trim());
    } catch (error) {
        console.error(error);
    }
}
getTide();
