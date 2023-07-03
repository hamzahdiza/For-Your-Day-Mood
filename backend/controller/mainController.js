const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const { News, Entertainment } = require("../models/index");
const { Op } = require("sequelize");

class mainController {
  static async generateWeather(req, res, next) {
    try {
      const weather_api_key = process.env.WHEATHER_API_KEY;
      // const latitude = "42.018049656337844";
      // const longitude = "63.99898730787889";

      const latitude = "-6.228298662587586";
      const longitude = "106.77075024891396";

      let { data } = await axios({
        method: "get",
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weather_api_key}&units=metric`,
      });

      // console.log(data.name, data.weather, data.main.temp, "<<<<<<<<<");

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
      console.log(query, "req body <<<");
      let queryData = query.weather[0].description;
      // let queryData = query;

      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `suggest 1 song search query based on ${queryData} weather conditions in 3 words without the word "playlist" and only the song title`,
        temperature: 0.8,
        max_tokens: 50,
        top_p: 1,
        frequency_penalty: 2,
        presence_penalty: 2,
      });
      // console.log(response.data.choices[0]);
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
      // console.log(query);
      let getDataPlaylist = await axios({
        method: "get",
        url: `https://api.spotify.com/v1/search?q=${query.message}&type=playlist`,
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

  static async getTrack(req, res, next) {
    try {
      let token = await mainController.generateToken();
      let { track_url } = req.body;
      console.log(track_url);
      let getDataTracks = await axios({
        method: "get",
        url: track_url,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      // console.log(getDataTracks.data);
      let dataTracks = getDataTracks.data;

      let randomStart = Math.floor(Math.random() * (dataTracks.items.length - 5));
      let randomEnd = randomStart + 10;
      console.log(randomStart, randomEnd);
      let dataResult = dataTracks.items.slice(0, dataTracks.items.length - 1).map((el) => {
        let data_tracks = {
          id_track: el.track.id,
          name_track: el.track.name,
          link_track: el.track.external_urls.spotify,
          preview_url_track: el.track.preview_url,
          album_name_track: el.track.album.name,
          album_external_url_track: el.track.album.external_urls.spotify,
          album_image_track: el.track.album.images[0].url,
          artist_name_track: el.track.artists[0].name,
          artists_link_track: el.track.artists[0].external_urls.spotify,
        };
        return data_tracks;
      });

      res.status(200).json(dataResult);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getNewsMusic(req, res, next) {
    const { offset, limit } = req.query;
    try {
      let newsData = await News.findAll({ offset: offset, limit: limit });

      res.status(200).json(newsData);
    } catch (err) {
      console.log(err);
    }
  }

  static async getNewsEntertainment(req, res, next) {
    const { offset, limit } = req.query;
    console.log("Masuk nih Boss");
    try {
      let newsData = await Entertainment.findAll({ offset: offset, limit: limit });

      res.status(200).json(newsData);
    } catch (err) {
      console.log(err);
    }
  }

  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  static async searchNews(req, res, next) {
    const { query } = req.body;

    console.log(query, "QQQQQQQQQQQQq");

    try {
      let newsResults = await News.findAll({
        where: {
          title: {
            [Op.iLike]: "%" + query + "%",
          },
        },
      });

      let entertainmentResults = await Entertainment.findAll({
        where: {
          title: {
            [Op.iLike]: "%" + query + "%",
          },
        },
      });

      let dataSearch = await newsResults.concat(entertainmentResults);

      res.status(200).json({
        dataSearch: dataSearch,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  }
}

module.exports = mainController;
