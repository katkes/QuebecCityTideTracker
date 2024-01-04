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
        getInfo();
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
            <button onClick={getInfo}>Refresh Info</button>
            <WindyWidget1/>
        </div>
    )
        ;

}

export default App;
