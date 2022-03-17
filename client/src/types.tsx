type WeatherData = {
    forecast: string,
    temperature: number,
    name:  string
  }

  type AddWeather = (name: string) => void;
  
export type {
    WeatherData,
    AddWeather
}