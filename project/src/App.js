import React, {useEffect, useState} from "react";
import {tideScrape} from './tideScrape';
import WindyWidget1 from './windyWidget1';
import {weatherScrape} from './temperatureScrape';
import './App.css';


function App() {

    const [arr, setArr] = useState([]);

    const getInfo = async (e) => {
        const data = await tideScrape();
        setArr(data);
    }
    const getWeather = async (e) => {
        const data = await weatherScrape();
        console.log(data);
    }

    useEffect(() => {
        getInfo(); // Call immediately
        console.log("Here")
        getWeather();
        // Function gets called every 15 minutes of the day
        const now = new Date(); // Current time
        const delay = 15 * 60 * 1000; // 15 minutes delay
        const timeToNextQuarter = delay - (now.getTime() % delay);

        //  Call getInfo at the next 15 min interval
        const timeoutId = setTimeout(() => {
            getInfo();

            setInterval(getInfo, delay);
        }, timeToNextQuarter);

        // Clear timeout if component is unmounted
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="App">
            <h1>Tide Readings of the Quebec City Yacht Club</h1>
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
        </div>
    );

}

export default App;
