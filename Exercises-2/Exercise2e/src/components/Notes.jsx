// Notes component to display detailed information for a single country
const Notes = ({ country, weather }) => {
  // Props:
  // - country: Object containing country data (name, capital, area, languages, flags)
  // - weather: Object containing weather data for the capital (or null if not available)
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital?.[0] || 'N/A'}</p>
      <p>area: {country.area} km²</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
      {weather && (
        <div>
          <h3>Weather in {country.capital?.[0]}</h3>
          <p>temperature: {weather.main.temp} °C</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>weather: {weather.weather[0].description}</p>
          <p>wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Notes;