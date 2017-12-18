const apiEndPoint = 'http://api.aerisapi.com/forecasts/11101?client_id=' + accessId + '&client_secret=' + secretKey

let container = document.querySelector('.container')

let responseObject = {}

let shownInF = true

document.addEventListener('DOMContentLoaded', getWeather())

function getWeather() {
  fetch(apiEndPoint)
   .then(res => res.json())
    .then(createWeatherElements)
}

function createWeatherElements(obj) {
  console.log(obj.response[0].periods)
  responseObject = obj.response[0].periods
  responseObject.forEach(res => {
    container.innerHTML += buildItem(res)
  })
}


function buildItem(res, fahrenheit = true) {
  let minTemp = fahrenheit ? res.minTempF + '&deg;F' : res.minTempC + '&deg;C'
  let maxTemp = fahrenheit ? res.maxTempF + '&deg;F' : res.maxTempC + '&deg;C'
  let icon = res.icon
  let dateTime = res.dateTimeISO.split('T')[0]
  return (
    `<div class="weather-item">
      <p>${dateTime}</p>
      <img src="img/${icon}"/>
      <p>Min Temp: ${minTemp}
      <p>Max Temp: ${maxTemp}
    </div>`
  )
}

function toggleFahrenheit() {
  shownInF = !shownInF
  container.innerHTML = ''
  responseObject.forEach(res => {
    container.innerHTML += buildItem(res, shownInF)
  })
}
