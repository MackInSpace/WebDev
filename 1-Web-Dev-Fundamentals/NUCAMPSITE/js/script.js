console.log('javascript connected!');
    
const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 5000,
    pause: false
})

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function () {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
})
//Task 3
async function fetchWeather() {
    try {
        const apiKey = process.env.OPEN_WEATHER_API_KEY;
        const city = 'New York';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
        let response = await fetch(url);
        const data = await response.json();
        console.log(data);
        displayWeather(data);
    } catch (error) {
        console.error(error);
    }
}

fetchWeather(displayWeather);

function displayWeather(data) {
    const temperature = data.main.temp;
    const desp = data.weather[0].description;
    const icon = data.weather[0].icon;
    const image = document.createElement('img');
    image.src = `https://openweathermap.org/img/w/${icon}.png`;
    document.getElementById('weather-icon').appendChild(image);
    document.querySelector('#weather-temp').textContent=temperature;
    document.querySelector('#weather-description').textContent=desp;
}