import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { useState } from "react";
import { AddWeather} from '../types';
// import "../styles/todoForm.css"

interface AddWeatherProps{
    addWeather: AddWeather;
}
    const AddWeatherForm: React.FC<AddWeatherProps> = ({ addWeather }) => {
    const [cityName, setCityName] = useState("");


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "cityName") {
            setCityName(e.target.value)
        }
    };

    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addWeather(cityName);
        setCityName("");
    }
    
    return (
    <form className="form">
        <label>Find a City</label>
        <input type="text" placeholder="search for the weather in... " name="cityName" value={cityName} onChange={handleChange} autoFocus></input>
        <button type="submit" id="btnAddTodo" onClick={handleSubmit}>Search</button>
    </form>
    );
};

export default AddWeatherForm;