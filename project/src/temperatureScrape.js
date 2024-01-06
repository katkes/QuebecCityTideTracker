import axios from 'axios';


// Helper function to fetch weather info
const fetchWeatherApi = async (url, params) => {
    try {
        const response = await axios.post(url, params);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const weatherScrape = async () => {
    // params to fetch
    const params = {
        "latitude": 46.8123,
        "longitude": -71.2145,
        "current": ["temperature_2m", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
        "hourly": ["precipitation", "cloud_cover_low", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
        "timezone": "America/New_York",
        "forecast_days": 1
    };
    // connecting url to proxy server
    const url = '/api/weather';
    const weatherData = await fetchWeatherApi(url, params);
    return weatherData;
};
