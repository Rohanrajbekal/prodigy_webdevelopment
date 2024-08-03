document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'c1d70a33b9a703f9e831531027b4f682'; // Your OpenWeatherMap API key
    const locationForm = document.getElementById('location-form');
    const locationInput = document.getElementById('location-input');
    const getLocationButton = document.getElementById('get-location');
    const weatherInfo = document.getElementById('weather-info');
    const locationName = document.getElementById('location-name');
    const weatherDescription = document.getElementById('weather-description');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    // Function to fetch weather data
    async function fetchWeather(location) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            alert('Location not found');
            return;
        }

        locationName.textContent = `${data.name}, ${data.sys.country}`;
        weatherDescription.textContent = data.weather[0].description;
        temperature.textContent = `Temperature: ${data.main.temp} °C`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    }

    // Form submit event
    locationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = locationInput.value;
        fetchWeather(location);
    });

    // Get current location
    getLocationButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
                const data = await response.json();

                locationName.textContent = `${data.name}, ${data.sys.country}`;
                weatherDescription.textContent = data.weather[0].description;
                temperature.textContent = `Temperature: ${data.main.temp} °C`;
                humidity.textContent = `Humidity: ${data.main.humidity}%`;
                windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
            }, (error) => {
                alert('Unable to retrieve your location');
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });
});
