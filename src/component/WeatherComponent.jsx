import React, {  useState } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true)
  const [weatherData, setWeatherData] = useState(null);

  
  const apiUrl = 'https://weather-application-server.vercel.app/api/weather';
  const apiKey = process.env.API_KEY;

  const getWeather = async () => {
    try {
      setLoading(true); 
      const response = await axios.get(`${apiUrl}/${city}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });
      setWeatherData(response.data);
      setLoading(false); 
    } catch (error) {
      console.error(error);
      // Handle errors here
      setLoading(false); 
    }
  };

  const weatherIcons = {
    '01d': 'https://openweathermap.org/img/wn/01d.png',
    '02d': 'https://openweathermap.org/img/wn/02d.png',
    '03d': 'https://openweathermap.org/img/wn/03d.png',
    '04d': 'https://openweathermap.org/img/wn/04d.png',
    '09d': 'https://openweathermap.org/img/wn/09d.png',
    '10d': 'https://openweathermap.org/img/wn/10d.png',
    '11d': 'https://openweathermap.org/img/wn/11d.png',
    '13d': 'https://openweathermap.org/img/wn/13d.png',
    '50d': 'https://openweathermap.org/img/wn/50d.png',

  };



  return (
    <>
      <div className="container">
        <div className="weather-card">
          <p className='auther'>Weather Application - Digvijay Kadam</p>

          <div className="title">
          </div>
          <div className="search-weather">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={getWeather}>Search</button>
          </div>
          {
            loading ? (
              <div className='loader-content'>
                <p className='loader'>Search For the City</p>

                <img src="https://img.freepik.com/free-vector/weather-icons-collection_1234-53.jpg?w=826&t=st=1695813677~exp=1695814277~hmac=1ebb13427d202959968ba89d800f650f607dead689ade6011706dd38fd8f789b" alt="" />
              </div>

            ) :
              (
                weatherData && (
                  <div className='search-city-content'>
                    <div className="city">
                      <h3 className='temp'>Temp : {weatherData.main.temp}°C</h3>
                      <div className='desciption'>
                        <img src={weatherIcons[weatherData.weather[0].icon]} alt="Weather Icon" />
                        <h4>
                          {weatherData.weather[0].description}
                        </h4>


                      </div>

                    </div>

                    <div className="city">
                      <h1>{weatherData.name},{weatherData.sys.country}</h1>
                      <p>Coordinates: <br />  Lat: <span>{weatherData.coord.lat}</span>, Lon: <span>{weatherData.coord.lon}</span></p>
                    </div>


                    <br />
                    <div className="reading-container">

                      <div className="temp-readings">
                        <h4>Tempereature readings :</h4>
                        <p>Feels Like: <span>{weatherData.main.feels_like}°C</span></p>
                        <p>Min Temperature: <span>{weatherData.main.temp_min}°C</span></p>
                        <p>Max Temperature: <span>{weatherData.main.temp_max}°C</span></p>
                      <br />
                        <p>Humidity: <span>{weatherData.main.humidity}%</span></p>
                        <p>Visibility: <span>{weatherData.visibility} meters</span></p>
                      </div>

                      <br />
                      <div className='parameters'>
                        <h4>Others Parameters : </h4>
                        <p>Pressure: <span>{weatherData.main.pressure} hPa</span></p>
                      
                        <p>Wind Speed: <span>{weatherData.wind.speed} m/s</span></p>
                        <p>Wind Direction: {weatherData.wind.deg}°</p>
                        <p>Cloudiness: <span>{weatherData.clouds.all}%</span></p>
                        <p>Sunrise: <span>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</span></p>
                        <p>Sunset: <span>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</span></p>
                      </div>

                    </div>

                  </div>
                )
              )


          }


        </div>

      </div>

    </>
  );
};

export default WeatherComponent;
