import { useState, useEffect } from "react";

function SearchHistory({ setCity }) {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(saved);
  }, []);

  const addToHistory = (city) => {
    const updated = [city, ...searchHistory.filter((item) => item != city)];
    setSearchHistory(updated);
    localStorage.setItem("Search History:", JSON.stringify(updated));
  };

  useEffect(() => {
    const handleStorageUpdate = async (e) => {
      if (e.detail && typeof e.detail === "string") {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${e.detail}&appid=32307c5321e5f1ef27bddf4e6d12e285`
          );
          if (!res.ok) return;
          addToHistory(e.detail);
        } catch (err) {
          console.error("Validation failed for city:", e.detail);
        }
      }
    };

    window.addEventListener("add-cityHistory", handleStorageUpdate);
    return () =>
      window.removeEventListener("add-cityHistory", handleStorageUpdate);
  }, [searchHistory]);

  const hanldeClick = (city) => {
    setCity(city);
  };

  return (
    <>
      {searchHistory.length > 0 && (
        <div className="mt-8 max-w-md mx-auto p-4 bg-black/50 rounded-xl shadow-md border border-gray-400 text-white">
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {searchHistory.map((city, index) => (
              <li
                key={index}
                onClick={() => hanldeClick(city)}
                className="cursor-pointer hover:text-blue-400 transition-colors duration-200"
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default SearchHistory;
