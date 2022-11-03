loadFirstTime()
cityForm.addEventListener('submit', async e => {
    e.preventDefault()
    try {
        loading()
        const city = cityInput.value
        const weather = await getWeatherByLocation({ city })
        updateUI(weather)
    } catch (error) {
        showError(error)
    }
})

// ketika tombol celcius ditekan
celciusBtn.addEventListener('click', async () => {
    try {
        loading()
        const city = cityInput.value
        if(!city) {
            loadFirstTime()
            return
        }
        const weather = await getWeatherByLocation({ city }, 'metric')
        updateUI(weather)
    } catch (error) {
        showError(error)
    }
})

// ketika tombol farenheit ditekan
farenheitBtn.addEventListener('click', async () => {
    try {
        const city = cityInput.value
        if(!city) {
            loadFirstTime()
            return
        }
        const weather = await getWeatherByLocation({ city }, 'imperial')
        loading()
        updateUI(weather)
    } catch (error) {
        showError(error)
    }
})