const cityForm = document.querySelector('form');
const card1 = document.querySelector('.card1');
const card2 = document.querySelector('.card2');
const details1 = document.querySelector('.details1');
const details2 = document.querySelector('.details2');
const time1 = document.querySelector('img.time1');
const time2 = document.querySelector('img.time2');
const icon1 = document.querySelector('.icon1 img');
const icon2 = document.querySelector('.icon2 img');


const updateUI = (data) => {
  console.log(data);

  const {cityDets, weather, weatherTomorrow} = data;

  // Update the details template
  details1.innerHTML = `
  <h5 class="my-3">${cityDets.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                  <span>${weather.Temperature.Metric.Value}</span>
                  <span>&deg;C</span>
                </div>
  `;

  // Update time for current weather
  let time1Src = null;
  if(weather.IsDayTime){
    time1Src = './img/day.svg';
  } else {
    time1Src = './img/night.svg';
  }

  time1.setAttribute('src', time1Src);

time2.setAttribute('src', './img/day.svg');

  if(card1.classList.contains('d-none')){
    card1.classList.remove('d-none');
  }

  // Convertion to Celsius
  let weatherTomorrowC = (5/9) * (weatherTomorrow.DailyForecasts[1].Temperature.Maximum.Value - 32);

  details2.innerHTML = ` 
  <h5 class="my-3">${cityDets.EnglishName}</h5>
                <div class="my-3">${weatherTomorrow.DailyForecasts[1].Day.IconPhrase}</div>
                <div class="display-4 my-4">
                  <span>${weatherTomorrowC.toFixed(2)}</span>
                  <span>&deg;C</span>
                </div>
  `;

  if(card2.classList.contains('d-none')){
    card2.classList.remove('d-none');
  }

  // Settings the  weather icons
  const icon1Src = `./img/icons/${weather.WeatherIcon}.svg`;
  icon1.setAttribute('src', icon1Src);

  const icon2Src = `./img/icons/${weatherTomorrow.DailyForecasts[1].Day.Icon}.svg`;
  icon2.setAttribute('src', icon2Src);
}


const updateCity = async (city)=> {

  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  const weatherTomorrow = await getTomorrowWeather(cityDets.Key);

  
  return {cityDets, weather, weatherTomorrow}

}

cityForm.addEventListener('submit', e => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  // Update UI
  updateCity(city)
  .then(data => updateUI(data))
  .catch(err => console.log(err));

});