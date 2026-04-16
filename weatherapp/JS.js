const apiKey = "a6a2f306c8204d7ab9f40048252204";
let currentTempC = null;
let showingCelsius = true;

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const apiURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=yes`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (data.error) {
      alert("City not found. Try another!");
      return;
    }
  
    currentTempC = data.current.temp_c;
    showingCelsius = true;

    document.getElementById("location").innerText = `${data.location.name}, ${data.location.country}`;
    document.getElementById("icon").src = `https:${data.current.condition.icon}`;
    document.getElementById("condition").innerText = data.current.condition.text;
    document.getElementById("temp").innerText = `${currentTempC}°C`;
    document.getElementById("humidity").innerHTML = `💧 Humidity: ${data.current.humidity}%`;
    document.getElementById("wind").innerHTML = `💨 Wind: ${data.current.wind_kph} km/h`;
    document.getElementById("aqi").innerHTML = `🌫️ AQI: ${data.current.air_quality.pm2_5.toFixed(1)}`;

    document.getElementById("weatherCard").classList.remove("hidden");

    const forecast = data.forecast.forecastday;
let forecastHTML = "";

forecast.forEach((day, index) => {
  const date = new Date(day.date).toDateString().split(' ').slice(0, 3).join(' ');
  const icon = day.day.condition.icon;
  const condition = day.day.condition.text;
  const max = day.day.maxtemp_c;
  const min = day.day.mintemp_c;

  forecastHTML += `
    <div class="forecast-item text-center bg-white/30 dark:bg-white/10 p-3 rounded-xl shadow-md">
      <p class="font-semibold">${index === 0 ? "Today" : date}</p>
      <img src="https:${icon}" class="mx-auto w-16 h-16" />
      <p class="capitalize text-sm">${condition}</p>
      <p class="text-sm mt-1">🌡️ ${min}°C - ${max}°C</p>
    </div>
  `;
});

document.getElementById("forecastSection").innerHTML = forecastHTML;
document.getElementById("forecastWrapper").classList.remove("hidden");


  } catch (error) {
    console.error(error);
    alert("Error fetching weather. Please try again.");
  }
}

function toggleTempUnit() {
  if (currentTempC === null) return;

  const tempElement = document.getElementById("temp");
  if (showingCelsius) {
    const tempF = (currentTempC * 9 / 5 + 32).toFixed(1);
    tempElement.innerText = `${tempF}°F`;
  } else {
    tempElement.innerText = `${currentTempC}°C`;
  }
  showingCelsius = !showingCelsius;
}
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");

});
const icon = document.getElementById("icon");

if (conditionText.includes("sunny") || conditionText.includes("clear")) {
  icon.classList.add("glow");
} else {
  icon.classList.remove("glow");
}

