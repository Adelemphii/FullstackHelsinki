
const CountryDetails = ({ country, weather }) => {
    const weatherDetails = weather?.wmo ? weather.wmo[0] : null;

    return (
        <div>
          <div className="country-details">
            <img src={country.flags.png} alt={country.flags.alt} />
            <h1>{country.name.official}</h1>
          </div>
    
          <p>Capital: {country.capital}</p>
          <p>Region: {country.region}</p>
          <p>Population: {country.population}</p>
    
          <h2>Spoken Languages:</h2>
          <ul>
            {Object.values(country.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          
          {weather && weatherDetails && (
            <div className="weather-info">
              <h2>Weather Information</h2> {/* it takes a while to update, ideally would need a way to have the weather not show until 
                                                        it is for the correct country */}
              <p>Temperature: {weather.temperature}°C, Apparent Temperature: {weather.apparentTemperature}°C</p>
              <p>Wind Speed: {weather.windSpeed} m/s</p>
              <p>Weather Description: {weatherDetails.description}</p>
              <img src={weatherDetails.icon} alt={weatherDetails.description} />
            </div>
          )}
        </div>
      );
}

export default CountryDetails