cityForm.addEventListener('submit', async e => {
    e.preventDefault()
    try {
        const city = document.getElementById('input-city').value || 'Jakarta'
        loading()
        const location = await getLocation(city)
        const weather = await getWeather(location.woeid)
        updateUI(location, weather)
    } catch (error) {
        showError(error)
    }
})

// ketika tombol celcius ditekan
celciusBtn.addEventListener('click', function () {
    // merubah setiap derajat dari fahrenheit ke celcius jika masih farenheit
    Array.from(document.getElementsByClassName('degrees'))
        .forEach(el => {
            if (!el.innerText.endsWith('°C')) el.innerText = farenheitToCelcius(parseFloat(el.innerText)) + '°C'
        })
})

// ketika tombol farenheit ditekan
farenheitBtn.addEventListener('click', function () {
    // merubah setiap derajat dari celcius ke farenheit
    Array.from(document.getElementsByClassName('degrees'))
        .forEach(el => {
            if (!el.innerText.endsWith('°F')) el.innerText = celciusToFarenheit(parseFloat(el.innerText)) + '°F'
        })
})