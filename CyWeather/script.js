var lat_text = document.querySelector('#input_lat');
var long_text = document.querySelector('#input_long');

const tempC = document.querySelector('#tempDisplay');
const cloudCover = document.querySelector('#cloudDisplay');
const humidity = document.querySelector('#humidDisplay');
const windSpeed = document.querySelector('#windDisplay');
var button = document.querySelector('#submit');
const loc = document.querySelector('#clockDisplay');
const day = document.querySelector("#curLocationDisplay")


button.addEventListener('click', function (e) {
   //e.preventDefault();
   //const proxy = 'https://cors-anywhere.herokuapp.com/';
   const base = `https://api.open-meteo.com/v1/forecast/?latitude=${lat_text.value}&longitude=${long_text.value}&hourly=temperature_2m,relativehumidity_2m,cloudcover_mid,windspeed_120m&daily=sunrise,sunset&timezone=Africa%2FCairo`;


   fetch(base)
      .then(response => response.json())
      .then(data => {
         console.log(data);
         const {
            cloudcover_mid,
            relativehumidity_2m,
            temperature_2m,
            windspeed_120m
         } = data.hourly;
         const latitude = data.latitude;
         const longitude = data.longitude;
         const {time} = data.daily;

         //setting DOM elements from the API
         tempC.textContent = `${temperature_2m[0]} °C`;
         humidity.textContent = `${relativehumidity_2m[0]} %`;
         windSpeed.textContent = `${windspeed_120m[0]} kmh`;
         cloudCover.textContent = `${cloudcover_mid[0]}%`;
         loc.textContent = `${latitude}° N & ${longitude}° E`;
         day.textContent = time[0];


      })
      .catch(err => alert("Please Enter Valid Cordinates !"));
})