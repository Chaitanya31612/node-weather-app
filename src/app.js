const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static direactory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Chaitanya Gupta"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Chaitanya Gupta"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text that may help you somehow. Thank You",
    title: "Help",
    name: "Chaitanya Gupta"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must specify address"
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error
          });
        }
        return res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        });
      });
    }
  );
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "You must provide search term"
//     });
//   }
//   res.send({
//     product: []
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Chaitanya",
    errorMessage: "Help article not found"
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Chaitanya Gupta",
    errorMessage: "Page not found"
  });
});

app.listen(3000, () => {
  console.log("Server is up and running");
});
