function getWeather() {
    const city = document.getElementById('input-city').value || 'Jakarta'
    cardsContainer.classList.add('d-flex')
    cardsContainer.classList.add('justify-content-center')
    document.querySelector('.cards-container').innerHTML = `
    <div class="spinner-border" role="status">
        <span class="sr-only"></span>
    </div>`
    fetch('https://www.metaweather.com/api/location/search/?query=' + city)
        .catch(() => {
            cardsContainer.innerHTML = `
                <div class="card shadow-0 border mb-3">
                    <div class="card-body p-4">

                        <h4 class="mb-1 sfw-normal">Error Occured</h4>

                    </div>
                </div>`
        })
        .then(res => res.json())
        .then(([w]) => {
            if (!w) {
                cardsContainer.innerHTML = `
                        <div class="card shadow-0 border mb-3">
                            <div class="card-body p-4">

                                <h4 class="mb-1 sfw-normal">City Not Found</h4>

                            </div>
                        </div>`
            }
            fetch('https://www.metaweather.com/api/location/' + w.woeid)
                .then(res => res.json())
                .then(({ consolidated_weather: weathers }) => {
                    const [weather] = weathers
                    console.log('humidity', weather['humidity'])
                    cardsContainer.classList.remove('d-flex')
                    cardsContainer.classList.remove('justify-content-center')
                    cardsContainer.innerHTML = `
                        <div class="card shadow-0 border mb-3">
                            <div class="card-body p-4">

                                <h4 class="mb-1 sfw-normal">${w.title}</h4>
                                <p class="mb-2">Current temperature: <strong class="degrees">${writeTemp(+weather['the_temp'].toFixed(2), celciusBtn.checked)}</strong></p>
                                Feels like: <strong class="degrees">${writeTemp(farenheitToCelcius(calculateFeelsLikeTemp(celciusToFarenheit(weather['the_temp']), weather['humidity'])), celciusBtn.checked)}</strong></p>
                                <p>Max: <strong class="degrees">${writeTemp(+weather['max_temp'].toFixed(2), celciusBtn.checked)}</strong>, Min: <strong class="degrees">${writeTemp(+weather['min_temp'].toFixed(2), celciusBtn.checked)}</strong></p>

                                <div class="d-flex flex-row align-items-center">
                                    <p class="mb-0 me-4">${weather['weather_state_name']}</p>
                                    <i class="fas fa-cloud fa-3 x" style="color: #eee;">
                                        <img src="https://www.metaweather.com/static/img/weather/png/${weather['weather_state_abbr']}.png" alt="" width="50px">
                                    </i>
                                </div>

                            </div>
                        </div>`
                })
        })
}

function celciusToFarenheit(c) {
    return +(c * (9 / 5) + 32).toFixed(2)
}

function farenheitToCelcius(f) {
    return +((f - 32) * (5 / 9)).toFixed(2)
}

function writeTemp(temp, isCelcius) {
    return isCelcius ? temp.toFixed(2) + '°C' : celciusToFarenheit(temp) + '°F'
}

function calculateFeelsLikeTemp(temp, hum) {
    if (temp < 80) return 0.5 * (temp + 61 + ((temp - 68) * 1.2) + (hum * 0.094))
    const heatIndex = -42.379 + 2.04901523 * temp + 10.14333127 * hum - 0.22475541 * temp * hum - 0.0068783 * temp ** 2
        - 0.05481717 * hum ** 2 + 0.00122874 * temp ** 2 * hum + 0.00085282 * temp * hum ** 2 - 0.00000199 * temp ** 2 * hum ** 2
    return heatIndex - (hum < 13 && 80 <= temp && temp <= 112 ? ((13 - hum) / 4) * Math.sqrt((17 - Math.abs(temp - 95)) / 17) : hum > 85 && 80 <= temp && temp <= 87 ? ((hum - 85) / 10) * ((87 - temp) / 5) : 0
    )
}