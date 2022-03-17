import fetch from 'node-fetch';
import express from "express";
import 'dotenv/config'
const PORT = process.env.PORT || 3001;
const app = express();

const SECRET_KEY="ce99411970192212f1a4e3ce28339cf2"

const getWeather = async () => {
  const weather = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${SECRET_KEY}`
)
  const data  = await weather.json();
  const forecast = data.weather[0].description;
  const temperature = data.main.temp;
  const name = data.name;
  // console.log(`Today's forecast for ${name}: ${forecast}`);
  // console.log(`It's currently ${temperature}°F `);
  return data
}


app.get("/api", async (req, res) => {
 const result = await getWeather();
 console.log(result)
  return res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

