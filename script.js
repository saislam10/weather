var cityFormEl = document.querySelector('#city-form');
var cityNameEl = document.querySelector('#city');
var weatherEl = document.querySelector('#weather');
var weatherContainerEl = document.querySelector('#weather-container');
var forecaseContainerEl = document.querySelector('#forecast-container');
var citySearchEl = document.querySelector('#city-searches');
var previousEl = document.querySelector('#button-city')


function init(){
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=Wichita&limit=1&appid=afbc3e766ad7b125ff6728193711f7c7')
    .then(function (response) {
        return response.json();
    })
    .then(function(data){
        console.log(data[0].lat, data[0].lon);
        showWeather(data[0].lat, data[0].lon);
    })
}

var submitHandler = function (event) {
    event.preventDefault();

    var cityName = cityNameEl.value.trim();

    if (cityName) {
        showWeather(cityName);

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


// var getWeatherOfCity = function (city) {
//     var apiCity = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=afbc3e766ad7b125ff6728193711f7c7'
//     fetch(apiCity)
//         .then(function (response) {
//             console.log(response);
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error(response.statusText)
//             }
//         })
//         .then(function (data) {
//             showWeather(data[0].lat, data[0].lon);
//             storeCity(city);
//         })
//         .catch(function (error) {
//             alert(error);
//         })
// }



function showWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=afbc3e766ad7b125ff6728193711f7c7&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var temp = data.current.temp;
            var wind = data.current.wind_speed;
            var uv = data.current.uvi;
            var hum = data.current.humidity;
            var tempEl = document.createElement('p');
            var windEl = document.createElement('p');
            var uvEl = document.createElement('p');
            var humEl = document.createElement('p');

            tempEl.textContent = "Temperature: " + temp;
            windEl.textContent = "Wind Speed: " + wind;
            uvEl.textContent = "UV Index: " + uv;
            humEl.textContent = "Humidity: " + hum;

            document.body.append(tempEl, windEl, uvEl, humEl);

            for (var i = 0; i < 5; i++) {
                var day = data.daily[i];
                console.log(day);
            }
        })
}

var storeCity = function (city) {
    var cities = JSON.parse(localStorage.get('cities')) || [];
    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem('cities', JSON.stringify(cities));
        displayPreviousCitiesButtons();
    }
}

var displayPreviousCitiesButtons = function () {
    var cities = JSON.parse(localStorage.get('cities')) || [];
    citySearchEl.innerHTML = '';
    for (var city of cities) {
        var cityBtn = document.createElement('button');
        cityBtn.dataset.city = city;
        cityBtn.className = 'btn';
        cityBtn.textContent = city;
        citySearchEl.append(cityBtn);
    }
}

cityFormEl.addEventListener('submit', submitHandler);
previousEl.addEventListener('click', buttonHandler);
displayPreviousCitiesButtons;

init();