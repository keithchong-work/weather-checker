import logo from './logo.svg';
import topSearchIcon from './static/image/top_search.png'
import searchIcon from './static/image/search.png'
import deleteIcon from './static/image/delete.png'
import sunIcon from './static/image/sun.png'
import cloudIcon from './static/image/cloud.png'
import './static/css/App.css';
import { useRef, useState, useEffect } from 'react';
import moment from 'moment';

const App = () => {
  const API = 'ad65196b6b26132c38360e6278d24557'
  const countryRef = useRef(null)
  const [searchValue, setSearchValue] = useState(null);


  const cityRef = useRef(null)
  const [searchCity, setSearchCity] = useState(null);

  const themeRef = useRef(false);
  const [theme, setTheme] = useState(true);

  const [result, setResult] = useState({
    "coord": {
      "lon": 103.7496,
      "lat": 1.5036
    },
    "weather": [
      {
        "id": 803,
        "main": "Clouds",
        "description": "broken clouds",
        "icon": "04n"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 300.04,
      "feels_like": 303.38,
      "temp_min": 298.07,
      "temp_max": 300.98,
      "pressure": 1008,
      "humidity": 88
    },
    "visibility": 8000,
    "wind": {
      "speed": 2.06,
      "deg": 240
    },
    "clouds": {
      "all": 75
    },
    "dt": 1681672885,
    "sys": {
      "type": 2,
      "id": 2078649,
      "country": "MY",
      "sunrise": 1681686002,
      "sunset": 1681729738
    },
    "timezone": 28800,
    "id": 7619684,
    "name": "Kampung Kubur",
    "cod": 200
  });
  const [history, setHistory] = useState([{
    "coord": {
      "lon": 103.7496,
      "lat": 1.5036
    },
    "weather": [
      {
        "id": 803,
        "main": "Clouds",
        "description": "broken clouds",
        "icon": "04n"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 300.04,
      "feels_like": 303.38,
      "temp_min": 298.07,
      "temp_max": 300.98,
      "pressure": 1008,
      "humidity": 88
    },
    "visibility": 8000,
    "wind": {
      "speed": 2.06,
      "deg": 240
    },
    "clouds": {
      "all": 75
    },
    "dt": 1681672885,
    "sys": {
      "type": 2,
      "id": 2078649,
      "country": "MY",
      "sunrise": 1681686002,
      "sunset": 1681729738
    },
    "timezone": 28800,
    "id": 7619684,
    "name": "Kampung Kubur",
    "cod": 200
  }]);
  const [noResult, setNoResult] = useState(true);


  useEffect(() => {
    themeRef.current = theme;
  });

  var weatherIcon = useRef("sunIcon");
  var historyList = []

  function changeTheme() {
    setTheme(!themeRef.current)
  }

  async function handleClick() {
    setSearchValue(countryRef.current.value)
    setSearchCity(cityRef.current.value)
    let value = countryRef.current.value
    let city = cityRef.current.value

    const response = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + value + "&appid=" + API)
    const result = await response.json()
    const info = result[0]

    if (info == undefined) {
      setNoResult(true)
    } else {
      await searchWeather(info)
    }
  }

  async function searchWeather(info) {
    const actualForecast = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + info.lat + "&lon=" + info.lon + "&appid=" + API)
    const forecastResult = await actualForecast.json()
    setResult(forecastResult)
    setHistory(history => [forecastResult, ...history])

    // history.forEach((x, index) => {
    //   historyList.push(<li><p>name</p><p><span>date time UTC</span><span><img src={topSearchIcon} /></span><span>×</span></p></li><li>aaaa</li><li>aaaa</li>)
    // });
  }

  function removeHistory() {
    setHistory(history.pop())
  }


  return (
    <div className={"App theme " + (themeRef.current ? "lightMode" : "darkMode")}>
      <div className='mainContainer w-full '>
        <div className='py-10 relative text-right'>
          <input
            onClick={changeTheme}
            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault" />
          <label
            className="inline-block pl-[0.15rem] hover:cursor-pointer modeText"
            for="flexSwitchCheckDefault"
          >{themeRef.current ? 'Light Mode' : 'Dark Mode'}
          </label>
        </div>

        <div className='topSearchSection inline-flex justify-between items-center md:w-2/5 sm:w-full'>
          <input
            ref={cityRef}
            type="text"
            id="searchCity"
            name="searchCity"
            className="block w-full rounded-md border-0 grey"
            placeholder="City"
          />
          <input
            ref={countryRef}
            // value={searchValue}
            type="text"
            id="searchValue"
            name="searchValue"
            className="block w-full rounded-md border-0 grey"
            placeholder="Country"
          />
          <button className=' rounded-md' type="button" onClick={handleClick}>Search</button>
          {/* <span className=' rounded-md' type="button" onClick={handleClick}><img src={topSearchIcon} width='w-1/5' /></span> */}
        </div>
        <p className='text-left pb-20 red' >{noResult ? '***Result Not Found' : ''}</p>


        <div className='searchResultSection rounded-md md:w-2/5 sm:w-4/5 relative mx-auto' >
          <div>
            <div className={'todayWeather flex flex-column relative w-full p-5 ' + (weatherIcon.current)}>
              <ul className='relative w-3/5 align-left'>
                <li className='font-bold'>Today's Weather</li>
                <li className=''>{result.main.temp}°</li>
                <li className='font-bold'>H: {result.main.temp_max}°  L: {result.main.temp_min}°</li>
              </ul>
              <img className='absolute w-2/5 ' src={weatherIcon.current == 'sunIcon' ? sunIcon : cloudIcon} />
            </div>
            <div className='searchDetails relative px-5'>
              <ul className='lg:flex md:block'>
                <li className='font-bold lg:w-1/4 md:w-full'>{result.name}, {result.sys.country}</li>
                <li className='lg:w-1/4 md:w-full'>{moment.unix(result.dt).format("YYYY-MMM-DD HH:mm:ss")}</li>
                <li className='lg:w-1/4 md:w-full'>Humidity: {result.main.humidity}%</li>
                <li className='lg:w-1/4 md:w-full'>{result.weather[0].main}</li>
              </ul>
            </div>
          </div>

          <div className={'searchResultList relative rounded-md m-5 '}>
            <div className='text-left px-3 pt-3 searchResultTitle'>Search Result</div>
            <ul className='p-3'>
              <li>
                <p>{history[0].name}, {history[0].sys.country}</p>
                <p>
                  <span>{moment.unix(history[0].dt).format("YYYY-MMM-DD HH:mm:ss")}</span>
                  <span><img src={topSearchIcon} /></span>
                  <span>×</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div >


  );
};

export default App;