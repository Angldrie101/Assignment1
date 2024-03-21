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
            const cityNameUpperCase = city.toUpperCase();

            let weatherImageSrc;
            if (weatherDescription.includes('clouds')) {
                weatherImageSrc = 'https://cdn.dribbble.com/users/1136124/screenshots/4425752/icn_weather.gif';
            } else if (weatherDescription.includes('rain')) {
                weatherImageSrc = 'https://i.pinimg.com/originals/63/3f/a0/633fa082a594711f249a579fee4207d9.gif';
            } else if (weatherDescription.includes('mist')){
                weatherImageSrc = 'https://i.pinimg.com/originals/e9/cf/a7/e9cfa71f02ff8e3504410e831d883cd7.gif';
            } else if (weatherDescription.includes('sunny')){
                weatherImageSrc = 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/8f342f30971807.563b2b138deaa.gif';
            } else if (weatherDescription.includes('clear')){
                weatherImageSrc = 'https://i.pinimg.com/originals/e9/cf/a7/e9cfa71f02ff8e3504410e831d883cd7.gif';
            }
            else {
                weatherImageSrc = 'https://i.pinimg.com/originals/e1/70/03/e17003d3a86823bea8a48e4ec03d33e9.gif'
            }

            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
            const formattedTime = currentDate.toLocaleTimeString();

            const weatherHTML = `
            <div class="weather-container">
                <img src="${weatherImageSrc}" alt="${weatherDescription}" class="weather-image">
            </div>
                <div class="weather-info">
                    <div class="details">
                        <p class="temp">${temperatureCelsius.toFixed(0)}°C</p>
                    </div>
                    <div class="des">
                        <p>${weatherDescription}</p>
                        <P>${cityNameUpperCase}</P>
                    </div>
                    <div class="date">
                        <p>${humidity}%</p>
                        <p><span id = "dat">${formattedDate}</span> | ${formattedTime}</p>
                    </div>
                </div>
                    
                </div>
            `;

            weatherInfo.innerHTML = weatherHTML;
        })
        .catch(error => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.style.display = "none";
            alert(error.message);
            console.error('Error fetching weather data:', error);
        });
}
