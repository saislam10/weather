var cityFormEl = document.querySelector('#city-form');
var cityNameEl = document.querySelector('#city');
var weatherEl = document.querySelector('#weather');
var weatherContainerEl = document.querySelector('#weather-container');
var forecastContainerEl = document.querySelector('#forecast-container');
var citySearchEl = document.querySelector('#city-searches');
var previousEl = document.querySelector('#button-city');
var searchCity = document.querySelector('#search-city');

var submitHandler = function (event) {
    event.preventDefault();
    var cityName = cityNameEl.value.trim();

    if (cityName) {
        getWeatherOfCity(cityName);

        weatherContainerEl.textContent = '';
        cityNameEl.value = '';
    } else {
        alert('Please enter a valid city name!')
    }
}

var buttonHandler = function (event) {
    var city = event.target.getAttribute('data-city');

    if (city) {
        getWeatherOfCity(city);
        weatherContainerEl.textContent = '';
    }
};

function getCity(event) {
    event.preventDefault();
    getWeatherOfCity(cityNameEl.value);
}

var getWeatherOfCity = function (value) {
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + value + '&limit=1&appid=afbc3e766ad7b125ff6728193711f7c7')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            showWeather(lat, lon);
            storeCity(value);
        })
}

function showWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=afbc3e766ad7b125ff6728193711f7c7&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            forecastContainerEl.innerHTML = '';
            var temp = data.current.temp;
            var wind = data.current.wind_speed;
            var uv = data.current.uvi;
            var hum = data.current.humidity;
            var containerEl = document.createElement('div');
            var tempEl = document.createElement('p');
            var windEl = document.createElement('p');
            var uvEl = document.createElement('p');
            var humEl = document.createElement('p');
    

            tempEl.textContent = "Temperature: " + temp;
            windEl.textContent = "Wind Speed: " + wind;
            uvEl.textContent = "UV Index: " + uv;
            humEl.textContent = "Humidity: " + hum;
            // var today = moment();
            // $("#weather-container").text(today.format("dddd, MMMM Do"));


            containerEl.append(tempEl, windEl, uvEl, humEl);
            weatherContainerEl.append(containerEl);

            for (var i = 0; i < 5; i++) {
                var day = data.daily[i];
                var max = day.temp.max;
                var min = day.temp.min;
                var average = Math.round((max + min) / 2);
                var tempF = average;
                var windF = day.wind_speed;
                var uvF = day.uvi;
                var humF = day.humidity;

                var tempElF = document.createElement('p');
                var windElF = document.createElement('p');
                var uvElF = document.createElement('p');
                var humElF = document.createElement('p');
                var divContainer = document.createElement('div');
                divContainer.className = "card5";

                tempElF.textContent = "Temperature: " + tempF;
                windElF.textContent = "Wind Speed: " + windF;
                uvElF.textContent = "UV Index: " + uvF;
                humElF.textContent = "Humidity: " + humF;

                divContainer.append(tempElF, windElF, uvElF, humElF);
                forecastContainerEl.append(divContainer);

            }
        })
}

var storeCity = function (city) {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem('cities', JSON.stringify(cities));
        displayPreviousCitiesButtons();
    }
}

var displayPreviousCitiesButtons = function () {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    citySearchEl.innerHTML = null;
    for (var city of cities) {
        var cityBtn = document.createElement('button');
        cityBtn.dataset.city = city;
        cityBtn.className = 'btn';
        cityBtn.textContent = city;
        console.log(cityBtn);
        citySearchEl.append(cityBtn);
    }
}

cityFormEl.addEventListener('submit', submitHandler);
previousEl.addEventListener('click', buttonHandler);
displayPreviousCitiesButtons();
