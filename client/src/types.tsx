type WeatherData = {
    forecast: string,
    temperature: number,
    name: string,
    icon: string,
    date: string,
    id: number
}

type AddWeather = (name: string) => void;
type WeatherArticle = (weatherData: WeatherData) => void;
type SaveLocation = (name: string) => void;
type RemoveLocation = (name: string) => void;
type WeatherArticleList = (weatherDataList: Array<string>) => void;
type WeatherArticleMiniProps = (weatherData: WeatherData) => void;

export type {
    WeatherData,
    AddWeather,
    WeatherArticle,
    SaveLocation,
    RemoveLocation,
    WeatherArticleList,
    WeatherArticleMiniProps
}