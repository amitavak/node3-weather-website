const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/719c9f4d6d9814d1cad97e95a2931805/${latitude},${longitude}?units=si`;

    request({ url, "json": true }, (error, response) => {
        if(error) {
            callback("Could not fetch data from darksky api service");
        } else if(response.body.error) {
            callback(`${response.body.error} [Code: ${response.body.code}]`);
        } else {
            const { currently: currentData } = response.body;
            const { daily: { data: [ { summary } ] } } = response.body;
            const { daily: { data: [ dailyData ] } } = response.body;
            callback(null, summary + " It is currently " + currentData.temperature + 
                " degree out. Temparature high " + 
                dailyData.temperatureHigh + " degree and Temparature low is " + 
                dailyData.temperatureLow + " degree. There is a " + (currentData.precipProbability * 100) + 
                " % chance of rain");
        }
    });

};

module.exports = forecast;