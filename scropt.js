const apiKey = 'f973a3b16afd038814df8d5700557359';

function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim(); // Fix typo here
    cityInput.value = '';

    fetchWeatherData(city);
}

function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not found for the given city.');
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.style.display = 'block';

            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const temperatureCelsius = temperature - 273.15; 
            const humidity = data.main.humidity;

            let weatherImageSrc;
            if (weatherDescription.includes('clouds')) {
                weatherImageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrRqLOxxkuTO18QKCUGSq_milvyxdB9PoYpA&usqp=CAU';
            } else if (weatherDescription.includes('rains')) {
                weatherImageSrc = 'https://cdn-icons-png.freepik.com/512/4958/4958619.png';
            } else {
                weatherImageSrc = 'https://cdn-icons-png.flaticon.com/512/6198/6198743.png';
            }

            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
            const formattedTime = currentDate.toLocaleTimeString();

            const weatherHTML = `
                <h2>Weather in ${city}</h2>
                <img src="${weatherImageSrc}" alt="${weatherDescription}" class="weather-image">
                <h1>${formattedDate}</h1>
                <p>Time: ${formattedTime}</p>
                <p>Description: ${weatherDescription}</p>
                <p>Temperature: ${temperatureCelsius.toFixed(0)}°C</p>
                <p>Humidity: ${humidity}%</p>
            `;

            weatherInfo.innerHTML = weatherHTML;
        })
        .catch(error => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.style.display = 'none';
            alert(error.message);
            console.error('Error fetching weather data:', error);
        });
}
