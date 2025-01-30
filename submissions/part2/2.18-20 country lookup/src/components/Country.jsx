import CountryDetails from './CountryDetails'

const Country = ({ country, detailed = false, setCountryInput, selectedCountry, setSelectedCountry, weather }) => {
    if(detailed) {
        if(country !== selectedCountry) {
            setSelectedCountry(country)
        } 
        return(
            <CountryDetails country={country} weather={weather}/>
        )
    }

    return (
        <div className="country-card">
          <h3>{country.name.common}</h3>
          <img src={country.flags.png} alt={country.flags.alt} />
          <button onClick={() => {
            setCountryInput(country.name.common);
            if (country !== selectedCountry) {
              setSelectedCountry(country);
            }
          }}>Show Information</button>
        </div>
    )
}

export default Country