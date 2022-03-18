import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { WeatherData, AddWeather, SaveLocation } from './types';
import AddWeatherForm from './components/Form'
import './App.css';
import WeatherArticle from './components/WeatherArticle';
import Header from './components/Header';
import { useLocalStorage } from './useLocalStorage';
import { WeatherArticleList } from './components/WeatherArticleList';

const initialData: WeatherData | null = null;

const App = () => {
  const [data, setData] = useState(initialData);
  const [cityName, setCityName] = useState("");
  const [storage, setStorage] = useLocalStorage("cities", []);

  const addWeather: AddWeather = (name) => {
    setCityName(name)
  }

  const saveLocation: SaveLocation = (name) => {
    if (!storage.includes(name)) {
      setStorage([...storage, name])
    }
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
      {data ? <WeatherArticle weatherData={data} saveLocation={saveLocation} /> : undefined}
      {storage.length !== 0 ? <WeatherArticleList weatherDataList={storage} /> : undefined}
    </React.Fragment>
  );
}

export default App;