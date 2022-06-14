import fetch from 'node-fetch';
import express from "express";
import 'dotenv/config'
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

//When you navigate to the root page, it would use the built react-app
app.use(express.static(path.resolve(__dirname, "./client/build")));

const getTodaysDate = () => {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  let current_datetime = new Date()
  let formatted_date = current_datetime.getDate() + " " + months[current_datetime.getMonth()]
  return formatted_date
}

app.get("/api", async (req, res) => {
  const cityName = req.query.query
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.SECRET_KEY}&units=metric`
  )
  const data = await weather.json();

  const response = {
    forecast: data.weather[0].description,
    temperature: data.main.temp,
    name: data.name,
    icon: data.weather[0].icon,
    date: getTodaysDate()
  }

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

