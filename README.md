    <h2>Features</h2>
    <h3>1. Navigation Bar</h3>
    <ul>
        <li>A sleek, fixed navigation bar with links to:</li>
        <ul>
            <li><strong>Home</strong>: Landing section of the website.</li>
            <li><strong>Weather</strong>: Displays weather data dynamically.</li>
            <li><strong>About</strong>: Information about the project or developer.</li>
            <li><strong>Footer</strong>: Quick links and contact details.</li>
        </ul>
  
    </ul>

    <h3>2. Dynamic Weather Data</h3>
    <ul>
        <li>The website fetches and displays weather data using a weather API.</li>
        <li>Displays key information like:
            <ul>
                <li>Current temperature.</li>
                <li>Weather conditions (e.g., sunny, rainy).</li>
                <li>Additional details such as humidity, wind speed, etc.</li>
            </ul>
        </li>
    </ul>

    <h3>3. JSON Files</h3>
    <ul>
        <li><code>data.json</code>: Contains static information about different cities or fallback weather data.</li>
        <li><code>weather.json</code>: Stores weather icons information.</li>
    </ul>

    <h3>4. Weather API Integration</h3>
    <ul>
        <li>The website integrates a weather API (e.g., OpenWeatherMap API) to fetch real-time weather data.</li>
        <li>A simple <code>fetch</code> request retrieves data based on the user's query (city name).</li>
        <li>Displays the data dynamically on the weather section of the website.</li>
    </ul>

    <h2>How to Use</h2>
    <h3>1. Clone the Repository</h3>
    <pre><code>git clone https://github.com/your-username/weather-website.git</code></pre>

    <h3>2. API Setup</h3>
    <ul>
        <li>Obtain an API key from the weather API provider (e.g., OpenWeatherMap).</li>
        <li>Replace the placeholder <code>YOUR_API_KEY</code> in the JavaScript code with your actual API key.</li>
    </ul>

    <h3>3. File Structure</h3>
    <ul>
        <li><strong>Key Files:</strong>
            <ul>
                <li><code>index.html</code>: The main webpage structure.</li>
                <li><code>style.css</code>: Handles the design and layout of the webpage.</li>
                <li><code>script.js</code>: Manages functionality such as API calls and dynamic data rendering.</li>
                <li><code>data.json</code>: Contains static or fallback weather data.</li>
                <li><code>weather.json</code>: Stores dynamically fetched weather data.</li>
            </ul>
        </li>
    </ul>

    <h3>4. Running the Website</h3>
    <ul>
        <li>Open <code>index.html</code> in a browser to view the website.</li>
        <li>Enter a city name in the search bar to fetch weather information.</li>
    </ul>

    <h2>Functionality</h2>
    <h3>Fetching Weather Data</h3>
    <ol>
        <li>The user enters the city name in the search bar and clicks the "Search" button.</li>
        <li>The <code>script.js</code> file sends an API request to the weather provider.</li>
        <li>If successful, the API returns weather data such as temperature, humidity, wind speed, and conditions.</li>
        <li>The data is displayed dynamically on the webpage.</li>
    </ol>

    <h3>Fallback Data</h3>
    <ul>
        <li>If the API request fails, the website uses data from <code>data.json</code> or <code>weather.json</code> to display pre-stored weather information.</li>
    </ul>

    <h2>Additional Notes</h2>
    <div class="note">
        <ul>
            <li>The API key must be kept secure. For production, use environment variables or server-side code to prevent key exposure.</li>
            <li>Regularly update the <code>data.json</code> file with new fallback data.</li>
        </ul>
    </div>

    <h2>Future Enhancements</h2>
    <div class="future">
        <ul>
            <li>Add geolocation to fetch the user's current weather automatically.</li>
            <li>Implement hourly and weekly weather forecasts.</li>
            <li>Integrate animations for weather conditions (e.g., rain or sunshine effects).</li>
        </ul>
    </div>

    <h2>License</h2>
    <p>This project is licensed under the MIT License. See the <code>LICENSE</code> file for more details.</p>
</div>
<footer>
    <p>&copy; 2024 Weather Website | All rights reserved.</p>
</footer>
