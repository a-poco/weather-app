import React from "react";
import { SaveLocation, WeatherData } from "../types";
import '../App.css';

interface WeatherArticleProps {
    weatherData: WeatherData,
    saveLocation: SaveLocation | null
}
const WeatherArticle: React.FC<WeatherArticleProps> = ({ weatherData, saveLocation }) => {
    return (
       <li className="weather-data-list__data">
            <article className="weather-article">
                <div className="weatherIcon">
                    <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@4x.png`} className="weather-article__icon" alt="" />
                    {!saveLocation ? undefined : <button onClick={() => { saveLocation(weatherData.name); }}>Test</button>}
                </div>
                <div className="weatherInfo">
                    <h1 className='temperature'>{weatherData.temperature.toFixed()}°C</h1>
                    <div className="description">
                        <h2 className='weatherCondition'>{weatherData.forecast}</h2>
                        <h1 className='place'>{weatherData.name}</h1>
                    </div>
                </div>
                <div className="date">{weatherData.date}</div>
            </article>
        </li>
    );
};

export default WeatherArticle;