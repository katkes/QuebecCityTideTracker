import {fetchWeatherApi} from 'openmeteo';

export const weatherScrape = async () => {
    try {
        const params = {
            "latitude": 46.8123,
            "longitude": -71.2145,
            "current": ["temperature_2m", "relative_humidity_2m", "precipitation"],
            "minutely_15": ["temperature_2m", "precipitation"],
            "hourly": ["wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
            "timezone": "America/New_York",
            "forecast_days": 1
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);

        // Helper function to form time ranges
        const range = (start: number, stop: number, step: number) =>
            Array.from({length: (stop - start) / step}, (_, i) => start + i * step);

        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];

        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();

        const current = response.current();
        const minutely15 = response.minutely15();
        const hourly = response.hourly();

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                temperature2m: current.variables(0).value(),
                relativeHumidity2m: current.variables(1).value(),
                precipitation: current.variables(2).value(),
            },
            minutely15: {
                time: range(Number(minutely15.time()), Number(minutely15.timeEnd()), minutely15.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                temperature2m: minutely15.variables(0).valuesArray(),
                precipitation: minutely15.variables(1).valuesArray(),
            },
            hourly: {
                time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                windSpeed10m: hourly.variables(0).valuesArray(),
                windDirection10m: hourly.variables(1).valuesArray(),
                windGusts10m: hourly.variables(2).valuesArray(),
            },

        };

        // Current time
        const currentTime = new Date();
        let ret15 = [];
        let retHour = [];
        let ret = [ret15, retHour];

        // `weatherData` now contains a simple structure with arrays for datetime and weather data
        for (let i = 0; i < weatherData.minutely15.time.length; i++) {
            if (new Date(weatherData.minutely15.time[i]) - currentTime.toISOString() >= 0) {
                console.log(
                    "Time: " + weatherData.minutely15.time[i].toISOString(),
                    "Temperature 2m: " + weatherData.minutely15.temperature2m[i],
                    "Precipitation: " + weatherData.minutely15.precipitation[i]
                );
                ret15.push([weatherData.minutely15.time[i].toISOString(), weatherData.minutely15.temperature2m[i], weatherData.minutely15.precipitation[i]]);
            }
        }

        let weatherForecast = [];

        // Filter and format data for the next 3 hours
        for (let i = 0; i < weatherData.hourly.time.length; i++) {
            const forecastTime = new Date(weatherData.hourly.time[i]);
            if (forecastTime - currentTime <= 3 * 60 * 60 * 1000 && forecastTime - currentTime >= 0) {
                weatherForecast.push({
                    time: forecastTime.toISOString(),
                    windSpeed10m: weatherData.hourly.windSpeed10m[i],
                    windDirection10m: weatherData.hourly.windDirection10m[i],
                    windGusts10m: weatherData.hourly.windGusts10m[i]
                });
            }
        }
        return weatherForecast;
    } catch (error) {
        console.error(error);
    }
};
