import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ setCity }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const apiUrl = import.meta.env.VITE_OPEN_WEATHER_KEY;
  console.log(apiUrl)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const city = input.trim().toLowerCase().replace(/\s+/g, "");

    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiUrl}`
      );

      if (!res.ok) {
        setError("City not found. Please enter a valid city.");
        return;
      }

      setError("");
      setCity(city);
      window.dispatchEvent(
        new CustomEvent("add-cityHistory", { detail: city })
      );
      setInput("");
    } catch (err) {
      console.error("Error validating city:", err);
      setError("There was an error with the search. Please try again.");
    }

    if (city) {
      setCity(city);
      window.dispatchEvent(
        new CustomEvent("add-cityHistory", { detail: city })
      );
      setInput("");
    }

    const event = new CustomEvent("add-cityHistory", { detail: city });
    window.dispatchEvent(event);

    if (input.trim()) {
      setCity(input.trim());
      setInput("");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center mt-[150px]"
      >
        <input
          type="search"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-[50px] mr-2 rounded-[20px] bg-black/50 text-white text-[20px] px-4 border border-gray-300 outline-none transition-all duration-300"
        />
        <button
          className="w-[50px] h-[50px] rounded-full bg-black/50 border border-gray-300 cursor-pointer flex items-center justify-center"
          type="submit"
        >
          <FontAwesomeIcon
            className="text-gray-300 text-[20px]"
            icon={faMagnifyingGlass}
          />
        </button>
      </form>
      {error && (
        <h1 className="bg-black/95 rounded-xl shadow-md border border-gray-500 text-red-700 text-center text-lg mt-4 max-w-md mx-auto px-4 py-2">{error}</h1>
      )}
    </>
  );
}

export default SearchBar;
