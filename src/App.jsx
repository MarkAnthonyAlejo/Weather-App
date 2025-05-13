import { useState } from "react";
import SearchBar from "./SearchBar";
import TodaysWeather from "./TodaysWeather";
import FiveDayWeather from "./FiveDayWeather";
import SearchHistory from "./SearchHistory";


function App() {
  const [city, setCity] = useState("");

  return (
    <>
        <SearchBar setCity={setCity} />
        <SearchHistory setCity={setCity} />
        <TodaysWeather todayCityWeather={city} />
        <FiveDayWeather city={city} />
    </>
  );
}
export default App;
