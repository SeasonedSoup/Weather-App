const spans = document.querySelectorAll('span')
const toggleButton = document.querySelector('.toggle')
let fahrenheight = true;
toggleButton.addEventListener('click', () => {
    console.log('hi')

    const temp = document.querySelector('#temp')
    const trimTemp = temp.textContent.trim()
    if (!trimTemp) {
        console.log('its empty!')
        return;
    }

    if (fahrenheight) {
        const floatTemp = parseFloat(trimTemp)
        const newCels = (floatTemp -32) * 5/9;
        temp.textContent = newCels.toFixed(1) +  " C°"
    } else {
        const floatTemp = parseFloat(trimTemp)
        const newFahren = (floatTemp * 9/5) + 32;
        temp.textContent = newFahren.toFixed(1) + " F°"
    }
    fahrenheight = !fahrenheight;
})

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
        temp : convertedData.currentConditions.temp + ' F°'
    }
    return obj;
} 