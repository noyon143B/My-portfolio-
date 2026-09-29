async function getWeather() {

    const cityInput = document.getElementById("cityInput");
    const cityName = cityInput.value.trim();

    if (cityName === "") {
        alert("Please enter a city name!");
        return;
    }

    document.getElementById("loading").innerText = "Loading...";

    try {

        // Find city
        const geoURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;

        const geoResponse = await fetch(geoURL);
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            alert("City not found!");
            document.getElementById("loading").innerText = "";
            return;
        }

        const city = geoData.results[0];

        // Get weather
        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,wind_speed_10m,weather_code`;

        const weatherResponse = await fetch(weatherURL);
        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        document.getElementById("city").innerText =
            city.name;

        document.getElementById("temperature").innerText =
            current.temperature_2m + "°C";

        document.getElementById("temp").innerText =
            current.temperature_2m + "°C";

        document.getElementById("wind").innerText =
            current.wind_speed_10m + " km/h";

        document.getElementById("condition").innerText =
            getWeatherCondition(current.weather_code);

        document.getElementById("icon").innerText =
            getWeatherIcon(current.weather_code);

        document.getElementById("loading").innerText = "";

    } catch (error) {

        document.getElementById("loading").innerText =
            "Something went wrong!";

        console.log(error);
    }
}


// Weather condition
function getWeatherCondition(code) {

    if (code === 0) {
        return "Clear Sky";
    }

    if (code <= 3) {
        return "Partly Cloudy";
    }

    if (code <= 48) {
        return "Foggy";
    }

    if (code <= 67) {
        return "Rainy";
    }

    if (code <= 77) {
        return "Snowy";
    }

    if (code <= 82) {
        return "Rain Showers";
    }

    if (code <= 99) {
        return "Thunderstorm";
    }

    return "Unknown";
}


// Weather icon
function getWeatherIcon(code) {

    if (code === 0) {
        return "☀️";
    }

    if (code <= 3) {
        return "🌤️";
    }

    if (code <= 48) {
        return "🌫️";
    }

    if (code <= 67) {
        return "🌧️";
    }

    if (code <= 77) {
        return "❄️";
    }

    if (code <= 82) {
        return "🌦️";
    }

    return "⛈️";
}