import { useState } from "react";
import SearchBar from "./SearchBar";
import Weather from "./Weather";
import FiveDayForecast from "./FiveDayForecast";

function App(){
    const [city, setCity] = useState('');
    return (
        <>
            <SearchBar searchCity={setCity} />
            <Weather city={city} />
            <FiveDayForecast /> 
        </>
    )
}

export default App;