function WeatherCard(props) {
    return (
        <div class="card shadow-0 border mb-3">
            <div class="card-body p-4">

                <h4 class="mb-1 sfw-normal">${props.name}</h4>
                <p class="mb-2">Current temperature: <strong class="degrees">${writeTemp(+weather['the_temp'].toFixed(2), celciusBtn.checked)}</strong></p>
                Feels like: <strong class="degrees">${writeTemp(farenheitToCelcius(calculateFeelsLikeTemp(celciusToFarenheit(weather['the_temp']), weather['humidity'])), celciusBtn.checked)}</strong></p>
                <p>Max: <strong class="degrees">${writeTemp(+weather['max_temp'].toFixed(2), celciusBtn.checked)}</strong>, Min: <strong class="degrees">${writeTemp(+weather['min_temp'].toFixed(2), celciusBtn.checked)}</strong></p>

                <div class="d-flex flex-row align-items-center">
                    <p class="mb-0 me-4">${weather['weather_state_name']}</p>
                    <i class="fas fa-cloud fa-3 x" style="color: #eee;">
                        <img src="https://www.metaweather.com/static/img/weather/png/${weather['weather_state_abbr']}.png" alt="" width="50px" />
                    </i>
                </div>

            </div>
        </div>
    )
}