const apiKey = '1eefee00eab149b191270610231711';
const apiUrl = 'https://api.weatherapi.com/v1/current.json';

const form = document.querySelector('form');
const input = document.querySelector('.input');
const block = document.querySelector('.block');
const error = document.querySelector('.error');
const weatherCard = document.querySelector('.weather-card');
const cityElement = document.querySelector('.city');
const timeElement = document.querySelector('.time');
const iconElement = document.querySelector('.icon');
const tempElement = document.querySelector('.temp');
const conditionElement = document.querySelector('.card-item-second p');
const feelsLikeElement = document.querySelector('.card-third p:nth-child(1)');
const humidityElement = document.querySelector('.card-third p:nth-child(2)');
const windElement = document.querySelector('.card-third p:nth-child(3)');
const loader = document.querySelector('.loader');
const timee=document.querySelector('.timee')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (city !== '') {
        getWeatherData(city);
    }
});

async function getWeatherData(city) {
    showLoader();
    const url = `${apiUrl}?key=${apiKey}&q=${city}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            displayWeatherData(data);
            clearInput();
            hideError();
            clearHeader()
        } else {
            showError();
            clearHeader()
            clearWizaercard()
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
        showError();
    }
    hideLoader();
}

function displayWeatherData(data) {
    const city = data.location.name;
    const date = new Date(data.location.localtime);
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;
    const feelsLike = data.current.feelslike_c;
    const humidity = data.current.humidity;
    const wind = data.current.wind_kph;
    const icon = data.current.condition.icon
    cityElement.textContent = city;
    timeElement.textContent = `${dayOfWeek} ${month} ${day} ${year}`;
    tempElement.textContent = `${temperature}°C`;
    conditionElement.textContent = condition;
    feelsLikeElement.textContent = `Feels like ${feelsLike}°C`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
    windElement.textContent = `Wind ${wind}kph`;
    iconElement.src = ` https:${icon}`;
    timee.textContent=time
}
function clearWizaercard(){
    weatherCard.style.display="none"
}
function clearHeader(){
    block.style.display="none"
    weatherCard.style.display = 'flex';
}
function clearInput() {
    input.value = '';
}

function showError() {
    error.style.display = 'block';
    weatherCard.style.display = 'none';
}

function hideError() {
    error.style.display = 'none';
    weatherCard.style.display = 'block';
}

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}