let searchBtn = document.querySelector('#srchBtn');

let weather = {

   "apiKey":"5ef0e79207f5a17d70d5f5d296b5e0dd",
   fetchWeather:function(city){
     fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid="+ this.apiKey
      )
     .then((res)=>res.json())
     .then(data => this.displayWeather(data))
   },
   
   displayWeather: function(data){
      const {name} = data;
      const {main, icon, description} = data.weather[0];
      const {temp, humidity} = data.main;
      const {speed , deg} = data.wind;
      const {country} = data.sys;
      console.log(name, icon, description, temp, humidity, speed, deg);
      document.querySelector('#introMsg').style.dispaly = `none`;
      document.querySelector('#city').innerText = `Weather in ${name}`;
      document.querySelector('#country').innerText = `${country}`;
      document.querySelector('#main').innerText = `${main}`;
      document.querySelector('#description').innerText = `${description}`;
      document.querySelector('#temp').innerHTML = `${temp} &#176`;
      document.querySelector('#speed').innerText = ` Wind speed : ${speed}${deg}`;
   }
}

searchBtn.addEventListener('click', () => {
   let searchInput = document.querySelector('#inp').value;
   let city = weather.fetchWeather(searchInput);
   weather.displayWeather(city);
});
