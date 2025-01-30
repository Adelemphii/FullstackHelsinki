import { useState, useEffect } from "react"

import Filter from './components/Filter'

import lookup from './services/CountryLookup'
import WeatherService from "./services/WeatherService"

import './index.css'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryInput, setCountryInput] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    lookup.getAll().then(response => {
      setCountries(response)
    })
  }, [])

  useEffect(() => {
      if(selectedCountry) {
        const [lat, lon] = selectedCountry.capitalInfo.latlng
        WeatherService.getWeather(lat, lon).then(data => {
          setWeather(data)
        })
      } else {
        if(weather) {
          setWeather(null)
        }
      }
  }, [selectedCountry])

  const handleLookupChange = (event) => {
    const value = event.target.value
    setCountryInput(value)
  }

  return (
    <div className="container">
      <h1>Country Lookup</h1>
      Lookup Countries: <input className="search-input" value={countryInput} onChange={handleLookupChange}/>
      <Filter 
        countries={countries} 
        filter={countryInput} 
        setCountryInput={setCountryInput} 
        selectedCountry={selectedCountry} 
        setSelectedCountry={setSelectedCountry}
        weather={weather}
      />
    </div>
  )
}

export default App