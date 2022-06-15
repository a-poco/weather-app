import fetch from 'node-fetch';
import express from "express";
import 'dotenv/config'
import path from "path";
import { fileURLToPath } from 'url';
const PORT = process.env.PORT || 3001;
const app = express();

//When you navigate to the root page, it would use the built react-app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))


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

