$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Developer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Developer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
    // select element
const iconELement = document.querySelector('.weather-icon')
const tempELement = document.querySelector('.temperature-value p')
const descELement = document.querySelector('.temperature-description p')
const locationELement = document.querySelector('.location p')

// ap data

const weather = {}
weather.temperature= {
  unit: 'celsius'
}

const KELVIN = 273

const key = '5a58188830ae0515a2b1d18e9aca7c6a'

//get Weather
function getWeather() {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=Ho%20Chi%20Minh%20City,VN&APPID=${key}`

  fetch(api).then(function(response) {
    let data = response.json()
    return data
  }).then(function(data) {
    weather.temperature.value = Math.floor(data.main.temp - KELVIN)
    weather.description = data.weather[0].description
    weather.iconId = data.weather[0].icon
    weather.city = data.name
    weather.country = data.sys.country
  }).then(function() {
    displayWeather()
  })
}

//Display Weather UI
function displayWeather() {
  iconELement.innerHTML = `<img src="images/${weather.iconId}.svg" alt="">`
  tempELement.innerHTML = `${weather.temperature.value}°<span>C</span>`
  descELement.innerHTML = weather.description
  locationELement.innerHTML = `${weather.city}, ${weather.country}`
}

// convert °C to °F
function celsiusToFahrenheit(temperature) {
  return (temperature * 9/5) + 32
}

tempELement.addEventListener('click', function() {
  if(weather.temperature.value === 'underfined') return
    if(weather.temperature.unit == 'celsius') {
      let fahrenheit = celsiusToFahrenheit(weather.temperature.value)
      fahrenheit = Math.floor(fahrenheit)
      tempELement.innerHTML = `${fahrenheit}°<span>F</span>`
      weather.temperature.unit = 'fahrenheit'
    } else {
      tempELement.innerHTML = `${weather.temperature.value}°<span>C</span>`
      weather.temperature.unit = 'celsius'
    }
})

getWeather()
});