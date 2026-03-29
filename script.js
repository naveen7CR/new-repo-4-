const apiKey = "YOUR_API_KEY_HERE"; // Replace this!

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const error = document.getElementById("error");
    const card = document.getElementById("weatherCard");
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");

    if (!city) return;

    try {
        error.textContent = "";
        card.classList.add("hidden");

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("cityName").textContent = data.name;
        document.getElementById("temp").textContent = `🌡️ Temp: ${data.main.temp}°C`;
        document.getElementById("desc").textContent = `☁️ ${data.weather[0].description}`;
        document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").textContent = `🌬️ Wind: ${data.wind.speed} m/s`;

        const icon = data.weather[0].icon;
        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${icon}@2x.png`;

        card.classList.remove("hidden");

    } catch (err) {
        error.textContent = "❌ City not found!";
    }
}