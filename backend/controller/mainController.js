const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");

class mainController {
  static async generateWeather(req, res, next) {
    try {
      const weather_api_key = process.env.WHEATHER_API_KEY;
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

  static async generateAnswer(req, res, next) {
    try {
      let { query } = req.body;

      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `suggest 1 song search query based on ${query} weather conditions in 3 words without the word "playlist" and only the song title`,
        temperature: 0.8,
        max_tokens: 50,
        top_p: 1,
        frequency_penalty: 2,
        presence_penalty: 2,
      });
      console.log(response.data.choices[0]);
      const resultAi = response.data.choices[0].text.trim().replaceAll('"', "");

      res.status(200).json({ message: resultAi });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async generateToken() {
    try {
      let client_id = process.env.SPOTIFY_V2_CLIENT_ID;
      let client_secret = process.env.SPOTIFY_V2_CLIENT_SECRET;

      let { data } = await axios({
        method: "POST",
        url: "https://accounts.spotify.com/api/token",
        headers: {
          Authorization: "Basic " + new Buffer.from(client_id + ":" + client_secret).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          grant_type: "client_credentials",
        },
      });

      return data.access_token;
    } catch (err) {
      console.log(err);
    }
  }

  static async getPlaylist(req, res, next) {
    try {
      let token = await mainController.generateToken();
      let { query } = req.body;
      console.log(query);
      let getDataPlaylist = await axios({
        method: "get",
        url: `https://api.spotify.com/v1/search?q=${query}&type=playlist`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      // console.log(getDataPlaylist.data.playlists);
      let dataPlaylist = getDataPlaylist.data.playlists;
      let dataResult = dataPlaylist.items.map((el) => {
        let data_playlist = {
          name_playlist: el.name,
          link_main_playlist: el.external_urls.spotify,
          image_playlist: el.images[0].url,
          owner_name_playlist: el.owner.display_name,
          link_tracks_playlist: el.tracks.href,
          total_tracks_playlist: el.tracks.total,
        };
        return data_playlist;
      });

      res.status(200).json(dataResult);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = mainController;
