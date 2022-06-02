function init() {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=Wichita&limit=1&appid=afbc3e766ad7b125ff6728193711f7c7')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data[0].lat, data[0].lon);
            getWeather(data[0].lat, data[0].lon);
        })
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=afbc3e766ad7b125ff6728193711f7c7&units=imperial`)
        .then(function(response){
            return response.json();
    })
        .then(function(data){
            console.log(data);
        })
}
init();