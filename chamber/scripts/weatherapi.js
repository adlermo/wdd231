const currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=-23.599593248351145&lon=-46.73150450113914&exclude=hourly,daily&appid=d21dd0e334529048170784d3f77b3f74&units=imperial";
const forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=-23.599593248351145&lon=-46.73150450113914&appid=d21dd0e334529048170784d3f77b3f74&units=imperial";

const currentWeather = async () => {
    try {
        const response = await fetch(currentWeatherURL);
        const t = await response.json();

        const imagesrc = "https://openweathermap.org/img/wn/" + t.weather[0].icon + ".png";
        const img = document.getElementById("condition-icon");
        img.setAttribute("src", imagesrc);
        img.setAttribute("alt", t.weather[0].description);

        document.getElementById("temperature").textContent = `${t.main.temp.toFixed(1)}°`;
        document.getElementById("condition").textContent = t.weather[0].description;
        document.getElementById("high").textContent = t.main.temp_max.toFixed(1);
        document.getElementById("low").textContent = t.main.temp_min.toFixed(1);
        document.getElementById("humidity").textContent = `${t.main.humidity}%`;
        document.getElementById("sunrise").textContent = new Date(t.sys.sunrise * 1000).toLocaleTimeString("en-US", { timeZone: "America/Sao_Paulo" });
        document.getElementById("sunset").textContent = new Date(t.sys.sunset * 1000).toLocaleTimeString("en-US", { timeZone: "America/Sao_Paulo" });
    } catch (error) {
        console.log(error);
    }
}

const forecastWeather = async () => {
    try {
        const response = await fetch(forecastWeatherURL);
        const t = await response.json();

        const today = document.createElement("p");
        const tomorrow = document.createElement("p");
        const dayAfterTomorrow = document.createElement("p");

        // Once it lists hours each 3h I'm using list[0] for today, list[6] for tomorrow 3*6=24h, and list[12] for day after tomorrow
        const weekDateTomorrow = new Date(t.list[6].dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
        const weekDateDayAfterTomorrow = new Date(t.list[12].dt * 1000).toLocaleDateString("en-US", { weekday: "long" });

        today.innerHTML = `Today: <strong>${t.list[0].main.temp.toFixed(1)}°</strong>`;
        tomorrow.innerHTML = `${weekDateTomorrow}: <strong>${t.list[6].main.temp.toFixed(1)}°</strong>`;
        dayAfterTomorrow.innerHTML = `${weekDateDayAfterTomorrow}: <strong>${t.list[12].main.temp.toFixed(1)}°</strong>`;

        document.getElementById("forecast").appendChild(today);
        document.getElementById("forecast").appendChild(tomorrow);
        document.getElementById("forecast").appendChild(dayAfterTomorrow);

    } catch (error) {
        console.log(error);
    }
}

currentWeather();
forecastWeather();