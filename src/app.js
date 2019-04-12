const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        "title": "Weather",
        "name": "Amitava"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        "title": "About",
        "name": "Amitava"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        "title": "Help page",
        "name": "Amitava",
        "helpText": "This is help text"
    });
});

app.get("/weather", (req, res) => {
    if(!req.query || !req.query.address) {
        return res.send({
            "error": "You must provide address as query string"
        });
    }

    geocode(req.query.address, (geocodeError, geocodeData) => {
        if(geocodeError) {
            return res.send({
                "error": geocodeError
            });
        }

        forecast(geocodeData.latitude, geocodeData.longitude, (forecastError, forecastData) => {
            if(forecastError) {
                return res.send({
                    "error": forecastError
                });
            }

            res.send({
                "address": req.query.address,
                "location": geocodeData.location,
                "forecast": forecastData
            });
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("error", {
        "title": "Error",
        "name": "Amitava",
        "errorMessage": "Help article not found!"
    });
});

app.get("*", (req, res) => {
    res.render("error", {
        "title": "Error",
        "name": "Amitava",
        "errorMessage": "Page not found!"
    });
});

app.listen(3000, () => {
    console.log("Server is up and running on port 3000");
});
