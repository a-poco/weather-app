type WeatherData = {
    forecast: string,
    temperature: number,
    name:  string,
    icon: string
  }

  type AddWeather = (name: string) => void;
  
export type {
    WeatherData,
    AddWeather
}