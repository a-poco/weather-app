import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { WeatherData, AddWeather } from './types';
import AddWeatherForm from './components/Form'
import './App.css';
import Header from './components/header';

const initialData: WeatherData | null = {
  forecast: '',
  temperature: 0,
  name: '',
  icon: ''
};

const App = () => {
  const [data, setData] = useState(initialData);
  const [cityName, setCityName] = useState("");

  const addWeather: AddWeather = (name) => {
    setCityName(name)
  }
  useEffect(() => {
    if (cityName === "") {
      return
    }
    fetch(`/api?query=${cityName}`)
      .then((res) => res.json())
      .then((response) => setData(response));
  }, [cityName]);

  return (
    <React.Fragment>
      < Header />
      < AddWeatherForm addWeather={addWeather} />
      <article className="weather-article">
        <h1 className='weather-article__name'>{!data ? "Loading..." : data.name}</h1>
        <h1 className='weather-article__temperature'>{!data ? "Loading..." : data.temperature}°C</h1>
        <article className='weather-article__forecast-icon'>
          <img src={`http://openweathermap.org/img/wn/${data.icon}@4x.png`} className="weather-article__forecast-icon__icon" alt=""/>
          <h2 className='weather-article__forecast'>{!data ? "Loading..." : data.forecast}</h2>
        </article>
      </article>
    </React.Fragment>
  );
}

export default App;

