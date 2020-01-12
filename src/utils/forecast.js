const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/e04ab1dd1b02ae82ebb8454a87f40cad/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  // request({url:url}) but while accessing the property of the same name we need not write it
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location service!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      let temperature = body.currently.temperature;
      let precip = body.currently.precipProbability;
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${temperature} degrees Celsius out. There is a ${precip}% chances of rain.`
      );
    }
  });
};

module.exports = forecast;
