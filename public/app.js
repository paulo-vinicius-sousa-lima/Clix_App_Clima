const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');

const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');

async function getWeatherData(city) {
    const apiUrl = `/api/weather?city=${encodeURIComponent(city)}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Cidade não encontrada');
        }

        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        showError();
    }
}

searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    
    if (city) {
        searchBtn.disabled = true; 
        searchBtn.innerText = "Buscando...";

        await getWeatherData(city);

        searchBtn.disabled = false; 
        searchBtn.innerText = "Buscar";
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) getWeatherData(city);
    }
});

function displayWeatherData(data) {
    cityName.innerText = `${data.name}, ${data.sys.country}`;
    temperature.innerText = `${Math.round(data.main.temp)}°C`;
    description.innerText = data.weather[0].description;
    humidity.innerText = `Umidade: ${data.main.humidity}%`;

    weatherResult.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

function showError() {
    weatherResult.classList.add('hidden');
    errorMessage.classList.remove('hidden');
}