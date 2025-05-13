import { useState, useEffect } from "react";

function FiveDayWeather({ city }) {
  const [weather, setWeather] = useState(null);
  const [unit,setUnit] = useState("C");

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        const locationRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=32307c5321e5f1ef27bddf4e6d12e285`
        );

        const locationData = await locationRes.json();

        if (!locationData) return "No Data Found";

        const lat = locationData.coord.lat;
        const lon = locationData.coord.lon;

        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=32307c5321e5f1ef27bddf4e6d12e285`
        );

        const weatherData = await weatherRes.json();
        const cityName = weatherData.city.name;
        const tempArray = weatherData.list;
        console.log(weatherData);

        setWeather({ days: tempArray, cityName: cityName });
      } catch (err) {
        console.error("Error fetching weather:", err);
      }
    };
    fetchWeather();
  }, [city]);

  /* Date & Time */
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  };
  /* Date & Time */

  const convertTemp = (kelvin) => {
    return unit == "C"
    ? `${Math.round(kelvin - 273.15)}°C`
    : `${Math.round((kelvin - 273.15) * 9 / 5 + 32)}°F`;
  }

  if (!weather) return;

  return (
    <>
      <section className="mt-10 px-4 max-w-6xl mx-auto rounded-xl py-6">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">
            5-Day Forecast for {weather.cityName}
          </h2>
          <button
            onClick={() => setUnit(unit === "C" ? "F" : "C")}
            className=" bg-sky-700 hover:bg-sky-900 text-white px-4 py-2 rounded transition"
          >
            Show °{unit === "C" ? "F" : "C"}
          </button>
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {weather.days.map((day, index) => (
            <div
              key={index}
              className="bg-black/60 border border-gray-500 text-white rounded-lg p-4 shadow-md flex flex-col items-center"
            >
              <p className="capitalize font-semibold text-sm mb-1">
                {day.weather[0].description}
              </p>
              <p className="text-xs mb-2 text-gray-300 text-center">
                {formatDateTime(day.dt_txt)}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="w-16 h-16 mb-2"
              />
              <p className="text-sm">
                Temp: {convertTemp(day.main.temp)}
              </p>
              <p className="text-sm">Humidity: {day.main.humidity}%</p>
              <p className="text-sm">
                Wind: {Math.round(day.wind.speed * 2.23694)} mph
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default FiveDayWeather;
