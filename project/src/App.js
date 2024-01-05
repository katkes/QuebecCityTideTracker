import React, {useEffect, useState} from "react";
import {tideScrape} from './tideScrape';
import WindyWidget1 from './windyWidget1';

function App() {

    const [arr, setArr] = useState([]);

    const getInfo = async (e) => {
        const data = await tideScrape();
        setArr(data);
    }

    useEffect(() => {
        getInfo(); // Call immediately
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
            <h1>Hello!</h1>
            <div className="tide-info">
                {arr.map((item, index) => (
                    <div key={index} className="tide-item">
                        <span className="time">{item[0]}</span>:
                        <span className="height">{item[1]}</span>
                    </div>
                ))}
            </div>
            <WindyWidget1/>
        </div>
    )
        ;

}

export default App;
