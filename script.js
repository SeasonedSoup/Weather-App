const conditionSpan = document.querySelector('span')

async function countryWeather(country) {
    const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}?key=XFXSMJ7YEFQ3GVL9LF3XRK4HK`)

    const convertedData = await convertJson(weatherData)

    console.log(convertedData);
    conditionSpan.textContent = convertedData

}

function convertJson(weatherData) {
    return weatherData.json().then((data) => {
        return data.currentConditions.conditions;
    })
}