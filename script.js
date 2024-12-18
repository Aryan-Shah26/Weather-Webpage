//Initially hide unecessary elements
const webElements1 = document.querySelector(".current-content");
const webElements2 = document.querySelector(".forecast-content");
webElements1.style.display = 'none';
webElements2.style.display = 'none';

const apiKey = 'your_api_key';


// Fetch weather icons from weather.json
async function fetchWeatherIcons() {
    const response = await fetch('weather.json');
    const weatherIcons = await response.json();
    return weatherIcons;
}

async function fetchWeatherData(isDynamic, cityInput) {
    if (isDynamic) {
        const apiURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityInput}&days=7`;
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            return {
                city: data.location.name,
                current: {
                    temperature: data.current.temp_c,
                    condition: data.current.condition.text,
                    humidity: data.current.humidity,
                    wind_speed: data.current.wind_kph,
                    sunrise: data.forecast.forecastday[0].astro.sunrise,
                    sunset: data.forecast.forecastday[0].astro.sunset,
                },
                forecast: data.forecast.forecastday.map(forecast => ({
                    date: forecast.date,
                    min: forecast.day.mintemp_c,
                    max: forecast.day.maxtemp_c,
                })),
            };
        } catch (error) {
            alert("Failed to fetch data from WeatherAPI !");
            return null;
        }
    } else {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    }
}

// Function to display current weather
async function displayCurrentWeather(cityData) {
    // Fetch weather icons
    const weatherIcons = await fetchWeatherIcons();

    // Display city name
    const cityNameElement = document.getElementById("current-city-name");
    cityNameElement.textContent = `${cityData.city} - Current Weather`;

    // Get current temperature element
    const temperatureElement = document.querySelector(".current-content .temperature .digits");
    const temperatureCondition = document.querySelector(" .current-content .temperature .info")
    // Get the weather condition
    const weatherCondition = cityData.current.condition;

    // Check if there's a corresponding icon in weather.json
    const iconClass = weatherIcons[weatherCondition.toLowerCase()] || 'fas fa-question'; // Default to a question mark icon if no match

    // Display the icon and temperature
    temperatureElement.innerHTML = `<i class="${iconClass}"></i> ${cityData.current.temperature}°C`;
    temperatureCondition.innerHTML = `<hr></hr> ${weatherCondition}`;

    // Display humidity
    const humidityElement = document.querySelector(".current-content .extra-info .humidity .digits p");
    humidityElement.textContent = `${cityData.current.humidity}%`;

    // Display wind speed
    const windElement = document.querySelector(".current-content .extra-info .wind .digits p");
    windElement.textContent = `${cityData.current.wind_speed} km/h`;

    // Display sunrise and sunset times
    const sunriseElement = document.querySelector(".current-content .sun-time .sunrise p");
    sunriseElement.innerHTML = `<i class="fas fa-sun"></i> &nbsp ${cityData.current.sunrise}`;

    const sunsetElement = document.querySelector(".current-content .sun-time .sunset p");
    sunsetElement.innerHTML = `<i class="fas fa-moon"></i> &nbsp ${cityData.current.sunset}`;

    // Update SVG for sun status
    updateSunStatus(cityData.current.sunrise, cityData.current.sunset);
}

// Function to update the SVG for sun status
function updateSunStatus(sunrise, sunset) {
    const svgPath = document.getElementById("progress-path");
    const totalDayTime = 24 * 60; // Total minutes in a day
    const pathLength = svgPath.getTotalLength();
    // console.log(sunrise,sunset);
    svgPath.style.strokeDasharray = pathLength;
    svgPath.style.strokeDashoffset = pathLength;
    // Calculate sunrise and sunset times in minutes
    const [sunriseHours, sunriseMinutes] = sanitizeTime(sunrise).split(":").map(Number);
    const [sunsetHours, sunsetMinutes] = sanitizeTime(sunset).split(":").map(Number);

    const sunriseInMinutes = sunriseHours * 60 + sunriseMinutes;
    const sunsetInMinutes = sunsetHours * 60 + sunsetMinutes;

    // Calculate the progress of the day (percentage)
    const currentTimeInMinutes = new Date().getHours() * 60 + new Date().getMinutes();
    let sunProgress = (currentTimeInMinutes - sunriseInMinutes) / (sunsetInMinutes - sunriseInMinutes) * 100;

    if (sunProgress < 0) sunProgress = 0; // Before sunrise
    if (sunProgress > 100) sunProgress = 100; // After sunset
    // console.log(sunProgress);
    // Update the stroke-dashoffset of the progress path in SVG
    svgPath.style.strokeDashoffset = pathLength - pathLength * (sunProgress / 100);
}

// Function to display forecast weather with day of the week
function displayForecastWeather(cityData) {
    const forecastContainer = document.querySelector('.forecast-weather');
    const forecastContent = document.querySelector('.forecast-weather .forecast-content');

    // Clear previous forecast entries
    forecastContent.innerHTML = '';

    cityData.forecast.forEach(forecast => {
        const forecastDiv = document.createElement('div');
        forecastDiv.classList.add('forecast-entry');

        // Convert the date to a JavaScript Date object
        const forecastDate = new Date(forecast.date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dayOfWeek = forecastDate.toLocaleDateString('en-US', options).split(',')[0]; // Get the day of the week

        // Create the forecast row with day and date
        forecastDiv.innerHTML = `
            <div class="day-date">
                <strong>${dayOfWeek}, ${forecast.date}</strong>
            </div>
            <div class="temp-range">${forecast.min}°C~${forecast.max}°C</div>
        `;
        forecastContent.appendChild(forecastDiv);
    });
}

function sanitizeTime(time) {
    // Split the time into components (HH:MM AM/PM)
    const [timePart, period] = time.split(' ');

    let [hours, minutes] = timePart.split(':').map(Number);

    // Convert to 24-hour format
    if (period === 'AM' && hours === 12) {
        // Convert "12:xx AM" to "00:xx"
        hours = 0;
    } else if (period === 'PM' && hours !== 12) {
        // Convert "PM" times to 24-hour format
        hours += 12;
    }

    // Ensure hours and minutes are formatted correctly (e.g., "08:05")
    const sanitizedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    return sanitizedTime;
}


// Handle search button click
document.getElementById('search-btn').addEventListener('click', async function () {
    const cityInput = document.getElementById('city').value.trim().toLowerCase();

    if (!cityInput) return;

    let cityData;

    if (isDynamic === 0) {
        cityData = await fetchWeatherData(true, cityInput);
    } else {
        const data = await fetchWeatherData();
        cityData = data.find(city => city.city.toLowerCase() === cityInput);
    }

    if (cityData) {
        // Display data for the city
        displayCurrentWeather(cityData);
        displayForecastWeather(cityData);
        webElements1.style.display = 'block';
        webElements2.style.display = 'block';
    } else {
        alert("City not found. Please try again.");
    }
});

// Get the button
const backToTopButton = document.getElementById('back-to-top');

// Scroll to top smoothly when the button is clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

let isDynamic = 1;

//Get the button
const toggleData = document.getElementById('toggle-data');

toggleData.addEventListener('click', () => {
    if (isDynamic == 1) {
        toggleData.textContent = 'Dynamic Data';
        toggleData.setAttribute('title', 'Data fetched from WeatherAPI');
        toggleData.style.backgroundColor = '#fff';
        toggleData.style.color = '#f39c12';
        isDynamic = 0;
    }
    else if (isDynamic == 0) {
        toggleData.textContent = 'Static Data';
        toggleData.setAttribute('title', 'Data fetched from local file');
        toggleData.style.backgroundColor = '#f39c12';
        toggleData.style.color = '#e5e5e5';
        isDynamic = 1;
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const hamNavLinks = document.querySelector(".ham-nav-links");

    hamburger.addEventListener("click", () => {
        hamNavLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked
    hamNavLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            hamNavLinks.classList.remove("active");
        });
    });
});
