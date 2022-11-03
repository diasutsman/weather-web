function getWeatherByLocation({ city, latt, long }, unit = 'metric') {
    const url = 'https://api.openweathermap.org/data/2.5/weather?appid=c4a63dac5ef1c44b056165e79da67faf&' + (city ? `q=${city}` : `lat=${latt}&lon=${long}`) + `&units=${unit}`
    return fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json()
        })
        .then((data) => {
            data.unit = unit
            return data
        })
}
function loadFirstTime() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            try {
                loading()
                const weather = await getWeatherByLocation({
                    latt: position.coords.latitude,
                    long: position.coords.longitude
                }, celciusBtn.checked ? 'metric' : 'imperial')

                updateUI(weather)
            } catch (error) {
                showError(error)
            }
        }, async error => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    loading()
                    const { latitude: lat, longitude: lon } = await fetch('https://geolocation-db.com/json/')
                        .then(res => res.json())
                        .then(data => data)
                    const weather = await getWeatherByLocation({
                        latt: lat,
                        long: lon
                    }, celciusBtn.checked ? 'metric' : 'imperial')
                    updateUI(weather)
                    //showError("User denied the request for Geolocation.")
                    break;
                    case error.POSITION_UNAVAILABLE:
                    showError("Location information is unavailable.")
                    break;
                case error.TIMEOUT:
                    showError("The request to get user location timed out.")
                    break;
                case error.UNKNOWN_ERROR:
                    showError("An unknown error occurred.")
                    break;
            }
        });
    } else {
        alert("Geolocation is not supported by this browser.")
    }

}

function loading() {
    cardsContainer.innerHTML = `
    <div class="spinner-border" role="status">
        <span class="sr-only"></span>
    </div>`
}

function updateUI(weather) {
    cardsContainer.innerHTML = showWeatherCard(weather)
}

function showWeatherCard({ weather: [weather], main, name, unit }) {
    const units = { 'metric': '°C', 'imperial': '°F' }
    return `
        <div class="card shadow-0 border mb-3 w-100">
            <div class="card-body p-4">

                <h4 class="mb-1 sfw-normal">${name}</h4>
                <p class="mb-2">Current temperature: <strong class="degrees">${main.temp + ' ' + units[unit]}</strong></p>
                Feels like: <strong class="degrees">${main['feels_like'] + ' ' + units[unit]}</strong></p>
                <p>Max: <strong class="degrees">${main['temp_max'] + ' ' + units[unit]}</strong>, Min: <strong class="degrees">${main['temp_min'] + ' ' + units[unit]}</strong></p>

                <div class="d-flex flex-row align-items-center">
                    <p class="mb-0 me-4">${weather.main}</p>
                    <i class="fas fa-cloud fa-3 x" style="color: #eee;">
                        <img src="https://openweathermap.org/img/wn/${weather.icon}@4x.png" alt="" width="50px">
                    </i>
                </div>

            </div>
        </div>`
}

function showError(error) {
    cardsContainer.innerHTML = `
                <div class="card shadow-0 border mb-3 w-100 h-100">
                    <div class="card-body p-4 h-100">

                        <h4 class="mb-1 sfw-normal">${error}</h4>

                    </div>
                </div>`
}