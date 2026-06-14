const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");

// Replace with your API key
const API_KEY = "YOUR_API_KEY";

async function getWeather(city) {

    try {

        weatherCard.innerHTML = "<p>Loading...</p>";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

    } catch (error) {

        weatherCard.innerHTML = `
            <p style="color:red;">
                ${error.message}
            </p>
        `;
    }
}

function displayWeather(data) {

    const {
        name,
        main,
        wind,
        weather
    } = data;

    weatherCard.innerHTML = `
        <h2>${name}</h2>

        <p><strong>Temperature:</strong>
        ${main.temp} °C</p>

        <p><strong>Humidity:</strong>
        ${main.humidity}%</p>

        <p><strong>Wind Speed:</strong>
        ${wind.speed} m/s</p>

        <p><strong>Condition:</strong>
        ${weather[0].description}</p>
    `;
}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if(city){
        getWeather(city);
    }
});

cityInput.addEventListener("keypress",(e)=>{

    if(e.key === "Enter"){
        searchBtn.click();
    }
});
