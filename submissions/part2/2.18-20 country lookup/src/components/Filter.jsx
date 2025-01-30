import Country from './Country'

const Filter = ({ countries, filter, setCountryInput, selectedCountry, setSelectedCountry, weather }) => {
    const countriesToShow = filter === '' ? countries 
      : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

    if(countriesToShow.length > 10) {
        setSelectedCountry('')
        return(
            <ul>
                <li>Search parameters are too vague, please be more specific.</li>
            </ul>
        )
    }

    const detailed = countriesToShow.length === 1
    // this is getting gross
    return(
        <div className="country-list">
            {countriesToShow.map(country => 
            <Country 
                country={country} key={country.cca3} detailed={detailed} setCountryInput={setCountryInput}
                selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} 
                weather={weather}
            />)}
        </div>
    )
}

export default Filter