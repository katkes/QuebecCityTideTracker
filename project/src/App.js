import React, {useEffect, useState} from "react";
import axios from 'axios';
import cheerio from 'cheerio';
import WindyWidget1 from './windyWidget1';

function App() {

    const [info, setInfo] = useState([]);
    const [arr, setArr] = useState([]);

    const getInfo = async (e) => {

        try {
            // Axios request to site via proxy server
            const response = await axios.get('/api/en/stations/03250/2023-08-04?tz=EDT&unit=m');
            const $ = cheerio.load(response.data);

            const pred = $("#readings-list-predictions tbody").text().split("\n");

            // Readings are done in increments of 15 mins
            let temp1 = pred[2].trim(); // current time
            let temp2 = pred[3].trim(); // current reading (in m)
            let temp3 = pred[6].trim(); // next 15 min
            let temp4 = pred[7].trim(); // next 15 min reading (in m)
            let temp5 = pred[10].trim();
            let temp6 = pred[11].trim();

            console.log(pred[2].trim());
            console.log(pred[3].trim());
            console.log(pred[6].trim());
            console.log(pred[7].trim());
            console.log(pred[10].trim());
            console.log(pred[11].trim());

            let arr = [[temp1, temp2], [temp3, temp4], [temp5, temp6]];
            setArr(arr);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <div>
            <h1>Hello!</h1>
            {arr.map((item, index) => (
                <p key={index}>{item[0]}: {item[1]}</p>
            ))}
            <button onClick={getInfo}>Refresh Info</button>
            <WindyWidget1/>
        </div>
        
    // <div
    //     data-windywidget="forecast"
    //     data-thememode="white"
    //     data-spotid="2651333"
    //     data-appid="4600da2e71ece3f089e1519f1ddc7eb3">
    // </div>
    // <script async="true" data-cfasync="false" type="text/javascript"
    //         src="https://windy.app/widgets-code/forecast/windy_forecast_async.js?v1.4.2"></script>

    // <div
    //     data-windywidget="map"
    //     data-spotid="2651333"
    //     data-appid="4600da2e71ece3f089e1519f1ddc7eb3"
    //     data-spots="true">
    // </div>
    // <script async="true" data-cfasync="false" type="text/javascript" src="https://windy.app/widget3/windy_map_async.js"></script>
)
    ;

}

export default App;
