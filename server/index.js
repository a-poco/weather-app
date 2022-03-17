import fetch from 'node-fetch';
import express from "express";
import 'dotenv/config'
const PORT = process.env.PORT || 3001;
const app = express();

const SECRET_KEY="ce99411970192212f1a4e3ce28339cf2"

app.get("/api", async (req, res) => {
  const cityName = req.query.query
 const weather = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${SECRET_KEY}&units=metric`
)
  const data  = await weather.json();
  const weatherData = {
    forecast: data.weather[0].description,
    temperature: data.main.temp,
    name: data.name,
    icon: data.weather[0].icon

  }
  const result = weatherData
  console.log(result)
  res.json(result);
});



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

