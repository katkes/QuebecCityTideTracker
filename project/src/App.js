import React, {useEffect, useState} from "react";
// import axios from 'axios';
// import cheerio from 'cheerio';
import {tideScrape} from './tideScrape';
import WindyWidget1 from './windyWidget1';
// import WindyWidget2 from './windyWidget2';

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
            {arr.map((item, index) => (
                <p key={index}>{item[0]}: {item[1]}</p>
            ))}
            <button onClick={getInfo}>Refresh Info</button>
            <WindyWidget1/>
            {/*<WindyWidget2/>*/}
        </div>
)
    ;

}

export default App;
