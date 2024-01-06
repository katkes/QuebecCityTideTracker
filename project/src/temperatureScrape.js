import axios from 'axios';
import cheerio from 'cheerio';

export const weatherScrape = async () => {
    
    try {
        // Axios request to site via proxy server
        const response = await axios.get('/api/en/stations/03250/2023-08-04?tz=EDT&unit=m');
        const $ = cheerio.load(response.data);
        const weather = $("#cellsTable > tbody > tr.windywidgetairTemp.id-air-temp > td:nth-child(1)").text().trim();
        return weather;
    } catch (error) {
        console.error(error);
    }
}
