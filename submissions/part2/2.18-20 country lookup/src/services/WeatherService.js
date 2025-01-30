import axios from 'axios'

const baseUrl = 'https://api.open-meteo.com/v1/forecast'

const getWeather = (lat, lon) => {
  const request = axios.get(baseUrl, {
    params: {
      latitude: lat,
      longitude: lon,
      current: 'temperature_2m,apparent_temperature,weather_code,wind_speed_10m',
      forecast_days: 1
    }
  })
  
  return request.then(response => {
    const { temperature_2m, apparent_temperature, weather_code, wind_speed_10m } = response.data.current
    
    return {
      temperature: temperature_2m,
      apparentTemperature: apparent_temperature,
      wmo: [WMO_CODES[weather_code]],
      windSpeed: wind_speed_10m
    }
  }).catch(err => {
    console.error('Error fetching weather data', err)
  })
}

function wmoInterpretation(description, icon) {
	icon = `/weather_icons/${icon}@4x.png`;

	return {
		description,
		icon
	};
}

const WMO_CODES = {
  0: wmoInterpretation('Clear', 'clear'),
  1: wmoInterpretation('Mostly Clear', 'mostly-clear'),
  2: wmoInterpretation('Partly Cloudy', 'partly-cloudy'),
  3: wmoInterpretation('Overcast', 'overcast'),
  45: wmoInterpretation('Fog', 'fog'),
  48: wmoInterpretation('Icy Fog', 'rime-fog'),
  51: wmoInterpretation('Light Drizzle', 'light-drizzle'),
  53: wmoInterpretation('Drizzle', 'moderate-drizzle'),
  55: wmoInterpretation('Heavy Drizzle', 'dense-drizzle'),
  80: wmoInterpretation('Light Showers', 'light-rain'),
  81: wmoInterpretation('Showers', 'moderate-rain'),
  82: wmoInterpretation('Heavy Showers', 'heavy-rain'),
  61: wmoInterpretation('Light Rain', 'light-rain'),
  63: wmoInterpretation('Rain', 'moderate-rain'),
  65: wmoInterpretation('Heavy Rain', 'heavy-rain'),
  56: wmoInterpretation('Light Freezing Drizzle', 'light-freezing-drizzle'),
  57: wmoInterpretation('Freezing Drizzle', 'dense-freezing-drizzle'),
  66: wmoInterpretation('Light Freezing Rain', 'light-freezing-rain'),
  67: wmoInterpretation('Freezing Rain', 'heavy-freezing-rain'),
  71: wmoInterpretation('Light Snow', 'slight-snowfall'),
  73: wmoInterpretation('Snow', 'moderate-snowfall'),
  75: wmoInterpretation('Heavy Snow', 'heavy-snowfall'),
  77: wmoInterpretation('Snow Grains', 'snowflake'),
  85: wmoInterpretation('Light Snow Showers', 'slight-snowfall'),
  86: wmoInterpretation('Snow Showers', 'heavy-snowfall'),
  95: wmoInterpretation('Thunderstorm', 'thunderstorm'),
  96: wmoInterpretation('Light T-storm w/ Hail', 'thunderstorm-with-hail'),
  99: wmoInterpretation('T-storm w/ Hail', 'thunderstorm-with-hail')
}

export default { getWeather }