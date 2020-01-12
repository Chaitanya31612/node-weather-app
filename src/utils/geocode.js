const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiY2hhaXRhbnlhMzEiLCJhIjoiY2s0em9hYXc2MDhpcTNtbnNvaGJiMDVoMSJ9.0H6ooXWyfb52iEQgkT73cQ&limit=1";

  //{body} is nothing but es6 version of doing it we its for
  // response and we were using response.body for getting the thing done
  // this is in destructuring video
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search!", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
