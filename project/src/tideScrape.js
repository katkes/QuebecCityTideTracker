// This file webscrapes and returns an array of values found from the results

import axios from 'axios';
import cheerio from 'cheerio';

export const tideScrape = async () => {
    try {
        // Axios request to site via proxy server
        const response = await axios.get('/api/en/stations/03250/2023-08-04?tz=EDT&unit=m');
        const $ = cheerio.load(response.data);
        const pred = $("#readings-list-predictions tbody").text().split("\n");
        // Readings are done in increments of 15 mins, would pass the first three sets of data to an array to display
        let arr = [
            [pred[2].trim(), pred[3].trim()],
            [pred[6].trim(), pred[7].trim()],
            [pred[10].trim(), pred[11].trim()]
        ];
        return arr;
    } catch (error) {
        console.error(error);
    }
}

