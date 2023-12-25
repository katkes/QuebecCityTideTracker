import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import axios from 'axios';
import cheerio from 'cheerio';

function App() {
    
    const[info, setInfo] = useState([]);
    const getInfo = async (e) => {

        


        try {
            const url1 = "https://www.tides.gc.ca/en/stations/03250/2023-08-04?tz=EDT&unit=m";
            const response = await axios.get(url1);
            const $ = cheerio.load(response.data);

            const pred = $("#readings-list-predictions tbody").text().split("\n");

            // Readings are done in increments of 15 mins
            console.log(pred[2].trim()); // current time
            console.log(pred[3].trim()); // current reading (in m)
            console.log(pred[6].trim()); // next 15 min
            console.log(pred[7].trim()); // next 15 min reading (in m)
            console.log(pred[10].trim());
            console.log(pred[11].trim());
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
            {info.map((info, index) => (
                <p key={index}>{info}</p>
            ))}
            <button onClick={getInfo}>Refresh Info</button>
        </div>
    );

}

// Original React
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
