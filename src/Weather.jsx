
import { useState, useEffect } from 'react';
import CloudIcon from '@mui/icons-material/Cloud';

function Weather({city}){
    const [weather,setWeather] = useState(null);
    const apiKey = '32307c5321e5f1ef27bddf4e6d12e285';

    useEffect(() =>{
        if(!city) return;

        const fetchWeather = async () => {
            try{
                const locationRes = await fetch(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}
                `);
                const locationData = await locationRes.json();
                if(!locationData.length) throw new Error ('City not found');

                const {lat, lon, name} = locationData[0];

                const weatherRes = await fetch(
                    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`
                )

                const weatherData = await weatherRes.json();
                setWeather({...weatherData, cityName: name});
            } catch (err) {
                console.error(`Error fetching weather: ${err}`)
            }
        };
        fetchWeather();
    },[city])

    if(!weather) return <p>Loading...</p>

    return (
        <>
            <section className='todays-weather-section'>
                <h3>{weather.cityName}</h3>
                <p>{new Date(weather.current.dt * 1000).toLocaleDateString()}</p>
                <button>℉</button>

                <CloudIcon className='weather-icon' />
                <h1>{Math.round(weather.current.temp)}°</h1>
                <p>{weather.current.weather[0].description}</p>

                <p>{weather.current.humidity}%</p>
                <p>{weather.current.wind_speed} mph</p>
            </section>
        </>
    )
}

export default Weather