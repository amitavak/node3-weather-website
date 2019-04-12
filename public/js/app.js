console.log("Clientside javascript is loaded");

var weatherForecastForm = document.querySelector("#weatherForecastForm");
var addressField = document.querySelector("#addressField");
var weatherForecastResultElm = document.querySelector("#weatherForecastResult");
var weatherForecastLocationElm = document.querySelector("#weatherForecastLocation");

weatherForecastForm.addEventListener("submit", (e) => {
    e.preventDefault();

    var address = addressField.value;

    weatherForecastLocationElm.textContent = `Fetching weather forecast for ${address}`;
    weatherForecastResultElm.textContent = "";

    if(!address){
        return;
    }

    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.error(data.error);
                weatherForecastLocationElm.textContent = `Error in fetching weather forecast for ${address}`;
                weatherForecastLocationElm.textContent = data.error;
            } else {
                console.log(data);
                weatherForecastLocationElm.textContent = `Weather forecast for ${data.location}`;
                weatherForecastResultElm.textContent = data.forecast;
            }
        });
    });
});