import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { WeatherData, AddWeather } from './types';
import AddWeatherForm from './components/Form'
import './App.css';

const initialData: WeatherData | null = {
  forecast: '',
  temperature: 0,
  name: ''
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
      < AddWeatherForm addWeather={addWeather} />
      <h1>{!data ? "Loading..." : data.name}</h1>
      <h1>{!data ? "Loading..." : data.forecast}</h1>
      <h1>{!data ? "Loading..." : data.temperature}</h1>
    </React.Fragment>
  );
}

export default App;

