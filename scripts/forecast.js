const key = '9RlzxbzEcjPeAEVMvQrpWIjM2H26twUB';



// Get current weather information
const getWeather = async (id) => {

  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${'9RlzxbzEcjPeAEVMvQrpWIjM2H26twUB'}`;

  const response = await fetch(base + query);
  const data = await response.json();
  
  return data[0];
};

// Get tomorrow's weather information

const getTomorrowWeather = async(id) => {
  const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
  const query = `${id}?apikey=${'9RlzxbzEcjPeAEVMvQrpWIjM2H26twUB'}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data;

};




// Get city information
const getCity = async (city) => {

  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query =`?apikey=${'9RlzxbzEcjPeAEVMvQrpWIjM2H26twUB'}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};


  
