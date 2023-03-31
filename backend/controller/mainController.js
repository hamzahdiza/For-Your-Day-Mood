const axios = require("axios");

class mainController {
  static async generateWeather(req, res, next) {
    try {
      const weather_api_key = "927e39df58a7d15ded5c9b81df860167";
      const latitude = "-6.244562414649453";
      const longitude = "107.06565314837844";

      let { data } = await axios({
        method: "get",
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weather_api_key}&units=metric`,
      });

      res.status(200).json({
        nearest_station: data.name,
        weather: data.weather,
        temp: data.main.temp,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = mainController;
