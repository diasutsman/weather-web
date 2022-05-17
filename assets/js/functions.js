function getCurrentLocation() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(function (position) {
        console.log(position);
        return {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        }
    })
}

function getWeather(lat, lon) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => data)
}