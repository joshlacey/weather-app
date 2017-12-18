const apiEndPoint = 'http://api.aerisapi.com/forecasts/11101?client_id=' + accessId + '&client_secret=' + secretKey

let container = document.querySelector('.container')
let button = document.querySelector('.tempButton')

let responseObjects = []

let shownInF = true

document.addEventListener('DOMContentLoaded', getWeather())

function getWeather() {
  fetch(apiEndPoint)
   .then(res => res.json())
    .then(createWeatherElements)
}

function createWeatherElements(obj) {
  console.log(obj.response[0].periods)
  responseObjects = obj.response[0].periods
  responseObjects.forEach(res => {
    container.innerHTML += buildItem(res)
  })
}


function buildItem(res, fahrenheit = true) {
  let minTemp = fahrenheit ? res.minTempF + '&deg;F' : res.minTempC + '&deg;C'
  let maxTemp = fahrenheit ? res.maxTempF + '&deg;F' : res.maxTempC + '&deg;C'
  let icon = res.icon
  let dateTime = formatDate(res.dateTimeISO)
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
  button.innerText = shownInF ? 'Change to Celcius' : 'Change to Fahrenheit'
  responseObjects.forEach(res => {
    container.innerHTML += buildItem(res, shownInF)
  })
}

function formatDate(date) {
  dateArr = date.split(/-|T/g)
  let year = dateArr[0]
  let month = dateArr[1]
  let day = dateArr[2]
  return month +'-'+ day +'-'+ year
}
