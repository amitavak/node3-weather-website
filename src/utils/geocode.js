const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW1pdGF2YWsiLCJhIjoiY2p0ZzUwcHoxMGgybDQ2bGg1b2h2bzE0YiJ9.nyciFPMeVPFt4UFYRH71dw`;
    
    request({ url, "json": true }, (error, response) => {
        if(error) {
            callback("Could not fetch geocoding data from mapbox api service!");
        } else if(response.body.features.length == 0) {
            callback("Unable to find location. Try another search!");
        } else {
            const data = response.body;
            const { features: [ searchResult ] }  = data;
    
            callback(null, { 
                "longitude": searchResult.center[0],
                "latitude": searchResult.center[1],
                "location": searchResult.place_name
            });
        }
    });
};

module.exports = geocode;