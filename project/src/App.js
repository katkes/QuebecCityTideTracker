import React, {useEffect, useState} from "react";
import {tideScrape} from './tideScrape';
import WindyWidget1 from './windyWidget1';
import {weatherScrape} from './temperatureScrape';
import './App.css';


function App() {

    const [arr, setArr] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    const getInfo = async (e) => {
        const data = await tideScrape();
        setArr(data);
    }

    // Updated getWeather function
    const getWeather = async () => {
        const data = await weatherScrape();
        setWeatherData(data);
    }

    useEffect(() => {
        getInfo();
        const intervalId = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Tide Readings of the Quebec City Yacht Club</h1>
                <h2>Current Time: {currentTime.toLocaleTimeString()}</h2>
            </header>
            <table className="tide-info">
                <thead>
                <tr>
                    <th>Time</th>
                    <th>Tide Height (m)</th>
                </tr>
                </thead>
                <tbody>
                {arr.map((item, index) => (
                    <tr key={index}>
                        <td>{item[0]}</td>
                        <td>{item[1]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <WindyWidget1/>
            <h2>Weather Forecast for Next 3 Hours</h2>
            <table className="weather-info">
                <thead>
                <tr>
                    <th>Time</th>
                    <th>Wind Speed (10m)</th>
                    <th>Wind Direction (10m)</th>
                    <th>Wind Gusts (10m)</th>
                </tr>
                </thead>
                <tbody>
                {weatherData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.time}</td>
                        <td>{item.windSpeed10m} km/h</td>
                        <td>{item.windDirection10m}°</td>
                        <td>{item.windGusts10m} km/h</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

}

export default App;
