





const refs = {
    weatherBlock : document.querySelector('#weather'),
};

console.log(refs.weatherBlock);


async function loadWeather(e){

    refs.weatherBlock.innerHTML = `<div class="weather__loading">
    <img src="./img/__Iphone-spinner-1.gif" alt="loading">
</div>
    `
    const server = 'https://api.openweathermap.org/data/2.5/weather?q=Cloppenburg,de&APPID=9475306a5157517d0ed2746162fabae3&units=metric'

    const response = await fetch(server, {method: 'GET' ,} );

    const responseResult = await response.json();

    if(response.ok){
        getWeather(responseResult)
    } else {
        refs.weatherBlock.innerHTML = responseResult.message;
    }
};

function getWeather (data) {
    console.log(data);

    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    const template = `<div class="weather__header">
    <div class="weather__main">
        <div class="weather__city">${location}</div>
        <div class="weather__status">${weatherStatus}</div>
    </div>
    <div class="weather__icon">
        <img class="img-status" src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Clouds" width="50" height="40">
    </div>           
</div>   
<div class="weather__temp"> t <span class="span">${temp}</span>°C</div>    
<div class="weather__feels-like">Feels like: <span class="span">${feelsLike}</span></div>    `

refs.weatherBlock.innerHTML = template;

}




if(refs.weatherBlock){
    loadWeather();
}