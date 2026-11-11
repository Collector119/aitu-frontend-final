const WEATHER_URL = "https://api.open-meteo.com/v1/forecast?latitude=51.09&longitude=71.42&current=temperature_2m,apparent_temperature,wind_speed_10m&timezone=Asia%2FAlmaty";

class WeatherWidget {
    constructor(url) {
        this.url = url;
        this.status = document.querySelector("#weather-status");
        this.temperature = document.querySelector("#weather-temperature");
        this.feelsLike = document.querySelector("#weather-feels");
        this.wind = document.querySelector("#weather-wind");
    }

    // fetch does not throw an error for answers like 404 or 500, so response.ok is checked by hand
    async load() {
        this.status.textContent = "Loading the weather...";
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error("The server answered with status " + response.status);
            }
            const data = await response.json();
            this.show(data.current);
        } catch (error) {
            this.status.textContent = "The weather is not available now. Please try again later.";
        }
    }

    show(current) {
        this.temperature.textContent = current.temperature_2m + " °C";
        this.feelsLike.textContent = current.apparent_temperature + " °C";
        this.wind.textContent = current.wind_speed_10m + " km/h";
        this.status.textContent = "Updated at " + current.time.replace("T", " ") + ", Astana time";
    }
}

const weatherWidget = new WeatherWidget(WEATHER_URL);

document.querySelector("#weather-update").addEventListener("click", function () {
    weatherWidget.load();
});

weatherWidget.load();
