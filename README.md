# Features

## 1. Navigation Bar
- A sleek, fixed navigation bar with links to:
  - **Home**: Landing section of the website.
  - **Weather**: Displays weather data dynamically.
  - **About**: Information about the project or developer.
  - **Footer**: Quick links and contact details.

## 2. Dynamic Weather Data
- The website fetches and displays weather data using a weather API.
- Displays key information like:
  - Current temperature.
  - Weather conditions (e.g., sunny, rainy).
  - Additional details such as humidity, wind speed, etc.

## 3. JSON Files
- `data.json`: Contains static information about different cities or fallback weather data.
- `weather.json`: Stores weather icons information.

## 4. Weather API Integration
- The website integrates a weather API (e.g., OpenWeatherMap API) to fetch real-time weather data.
- A simple `fetch` request retrieves data based on the user's query (city name).
- Displays the data dynamically on the weather section of the website.

---

# How to Use

## 1. Clone the Repository
```bash
git clone https://github.com/your-username/weather-website.git
```

## 2. API Setup
- Obtain an API key from the weather API provider (e.g., OpenWeatherMap).
- Replace the placeholder `YOUR_API_KEY` in the JavaScript code with your actual API key.

## 3. File Structure
### Key Files:
- `index.html`: The main webpage structure.
- `style.css`: Handles the design and layout of the webpage.
- `script.js`: Manages functionality such as API calls and dynamic data rendering.
- `data.json`: Contains static or fallback weather data.
- `weather.json`: Stores weather icons corresponding to some weather conditions.

## 4. Running the Website
- Open `index.html` in a browser to view the website.
- Enter a city name in the search bar to fetch weather information.

---

# Functionality

## Fetching Weather Data
1. The user enters the city name in the search bar and clicks the "Search" button.
2. The `script.js` file sends an API request to the weather provider.
3. If successful, the API returns weather data such as temperature, humidity, wind speed, and conditions.
4. The data is displayed dynamically on the webpage.

## Fallback Data
- If the API request fails, the website uses data from `data.json` to display pre-stored weather information.
