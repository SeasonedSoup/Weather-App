const spans = document.querySelectorAll('span')


function getLocation(event) {
    event.preventDefault();

    const location = document.getElementById('location').value 
    countryWeather(location);
}
async function countryWeather(country) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}?key=XFXSMJ7YEFQ3GVL9LF3XRK4HK`)
        if (!response.ok) {
            throw new Error(response.status)
        }
        const convertedData = await convertJson(response)

        console.log(convertedData);
        const vals = getVals(convertedData);

        for (let key in vals) {
            const span = document.getElementById(key)

            span.textContent = vals[key]
        }
    } catch (err) {
        alert("Invalid Request", err)
    }

}

function convertJson(response) {
    return  response.json().then((data) => {
        return data
    })
}

function getVals(convertedData) {
    obj = {
        condition : convertedData.currentConditions.conditions,
        address : convertedData.resolvedAddress,
        description : convertedData.description,
        temp : convertedData.currentConditions.temp
    }
    return obj;
} 