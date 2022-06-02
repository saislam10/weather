var cityEl = document.querySelector('#city-form');


function init() {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=Wichita&limit=1&appid=afbc3e766ad7b125ff6728193711f7c7')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            getWeather(data[0].lat, data[0].lon);
        })
}

function getWeather(lat, lon) {
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
init();