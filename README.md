## Project Description 
Commision webscraping website that uses [Windy.app](https://windy.app/forecast2/spot/2651333/Quebec+Yacht+Club?fbclid=IwAR3sVY53bXP6ovp_rNXXFPBlHaihibzpME3nJUoEH89wDSocScQvSrv-ox4) and the [Canadian government](https://www.tides.gc.ca/en/stations/03250/2023-08-04?tz=EDT&unit=m)'s readings of the Quebec City tide region, as well as [OpenMeteo's](https://github.com/open-meteo/open-meteo) open source API. 

## Key Features
- Simple and clean UI that displays all required information
- Proxy server set-up to allow local webscrapping possible

## Project Approach and Technology
- The first step was to make a simple webscraping script using Node.js modules, such as Axios and Cheerio, which allows to garner the required information.
- The second step was to build the proxy server, made in server.js. The reason is to safely bypass the CORS restriction of local webscrapping.
- Third step was to implement and clean the data from the OpenMeteo API.

## Installation Instructions
To set up the project locally, follow these steps: 
1. Clone the repository: 'git clone https://github.com/katkes/QuebecCityTideTracker.git'.
2. Navigate to the project directory: 'cd project'.
4. Install dependencies: 'npm install' (for node modules) and 'npm install <dependency>' (for dependencies).
5. Navigate to source directory nested in project directory: 'cd src'.
6. Run proxy server: 'node server.js'.
7. Open new terminal, navigate to project directory.
8. Run the application: 'npm start'.
