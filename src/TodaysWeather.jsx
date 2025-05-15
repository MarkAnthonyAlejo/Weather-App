import { useState, useEffect } from "react";

function TodaysWeather({ todayCityWeather }) {
  const [todaysWeather, setTodaysWeather] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const apiUrl = import.meta.env.VITE_OPEN_WEATHER_KEY;

  useEffect(() => {
    const getData = async () => {
      if(!todayCityWeather) return;

      try {
        const locationRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${todayCityWeather}&units=imperial&appid=${apiUrl}`
        );

        const locationData = await locationRes.json();
        
        if (!locationData) return "No Data Found";
        
        const lat = locationData.coord.lat;
        const lon = locationData.coord.lon;

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiUrl}`
        );


        const data = await res.json();
        const cityName = data.name;
        const todaysTemp = data.main.temp;
        const todaysHumidity = data.main.humidity;
        const todaysWind = data.wind.speed;
        const todaysDesc = data.weather[0].description;
        const todaysWeatherIcon = data.weather[0].icon;

        setTodaysWeather({
          curCity: cityName,
          curTemp: todaysTemp,
          curHumidity: todaysHumidity,
          curWind: todaysWind,
          curDesc: todaysDesc,
          curIcon: todaysWeatherIcon,
        });
        
        console.log("Data ->", data);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setTodaysWeather(null);
      }
    };
    getData();
  }, [todayCityWeather]);

  /* Temp converter and toggle function  */
  const toggleTemp = () => {
    setIsCelsius((prev) => !prev);
  };

  const displayTemp = () => {
    if (!todaysWeather) return "";

    const kelvin = todaysWeather.curTemp;
    const celsius = kelvin - 273.15;
    const fahrenheit = ((kelvin - 273.15) * 9) / 5 + 32;

    return isCelsius
      ? `${Math.round(celsius)}°C`
      : `${Math.round(fahrenheit)}°F`;
  };

  /* Temp converter and toggle function  */
  /* Wind speed function  */

  const displayWind = () => {
    if (!todaysWeather) return "";

    const mph = todaysWeather.curWind * 2.23694;

    return `${Math.round(mph)} mph`;
  };
  /* Wind speed function  */

  return (
    <section className="mt-8 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl mx-auto p-6 bg-black/50 rounded-xl shadow-md border border-gray-500 text-white transition-all duration-300">
      {todaysWeather ? (
        <>
          <h2 className="text-2xl font-bold text-center mb-4">
            {todaysWeather.curCity}
          </h2>
          <div className="flex flex-col items-center space-y-4">
            <h4 className="capitalize text-lg">{todaysWeather.curDesc}</h4>

            <img
              className="w-24 h-24"
              src={`https://openweathermap.org/img/wn/${todaysWeather.curIcon}@2x.png`}
              alt={todaysWeather.curDesc}
            />

            <button
              className="px-4 py-2 bg-sky-700 hover:bg-sky-900 text-white rounded-md transition"
              onClick={toggleTemp}
            >
              Show in {isCelsius ? "°F" : "°C"}
            </button>
            <p className="text-xl font-medium">{displayTemp()}</p>
            <p>Humidity: {todaysWeather.curHumidity}%</p>
            <p>Wind: {displayWind()}</p>
          </div>
        </>
      ) : (
        <h1 className="text-center text-lg font-semibold">Enter City</h1>
      )}
    </section>
  );
}

export default TodaysWeather;
