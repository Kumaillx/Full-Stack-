import { useState, useEffect } from 'react';
import axios from 'axios';
import Notes from './components/Notes';

// Component for the search input
const Filter = ({ value, onChange }) => (
  <div>
    find countries: <input value={value} onChange={onChange} />
  </div>
);

// Main App component
const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  // Fetch all countries on mount
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  // Fetch weather data when a single country is selected
  useEffect(() => {
    if (selectedCountry || filteredCountries.length === 1) {
      const country = selectedCountry || filteredCountries[0];
      const capital = country.capital?.[0];
      if (capital) {
        const apiKey = import.meta.env.VITE_SOME_KEY;
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
          .then((response) => {
            setWeather(response.data);
          })
          .catch((error) => {
            console.error('Error fetching weather:', error);
            setWeather(null);
          });
      }
    } else {
      setWeather(null);
    }
  }, [selectedCountry, countries, searchQuery]);

  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedCountry(null); // Reset selected country when search changes
  };

  // Handle show button click
  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  // Filter countries based on search query (case-insensitive)
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render content based on number of matches
  const renderContent = () => {
    if (searchQuery === '') {
      return null;
    }
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
    if (filteredCountries.length > 1 && filteredCountries.length <= 10 && !selectedCountry) {
      return (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      );
    }
    if (filteredCountries.length === 1 || selectedCountry) {
      const country = selectedCountry || filteredCountries[0];
      return <Notes country={country} weather={weather} />;
    }
    return <p>No matches found</p>;
  };

  return (
    <div>
      <h2>Country Information</h2>
      <Filter value={searchQuery} onChange={handleSearchChange} />
      {renderContent()}
    </div>
  );
};

export default App;