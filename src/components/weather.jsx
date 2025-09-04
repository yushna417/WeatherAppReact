import axios from "axios";
import { useState, useEffect } from "react";
import { getName } from "country-list";
import Sunrise from "../assets/rise.png"
import Sunset from "../assets/sun.png"
import {Page} from "./error";
import { Icon } from "@iconify/react";


export const Weather = ({city}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [unit, setUnit] = useState('metric')
  const [bgImage, setBgImage] = useState("")

  
  useEffect(() => {
    const fetchdata = async () => {
      try {
        setError(null);
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${import.meta.env.VITE_WEATHER_API}&units=${unit}`;
        
        const { data } = await axios.get(apiUrl);
        setWeatherData(data);

        const unsplashUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${import.meta.env.VITE_UNSPLASH_KEY}&orientation=landscape&per_page=1`;
        const res = await axios.get(unsplashUrl);

        if (res.data.results.length > 0) {
          setBgImage(res.data.results[0].urls.full); 
        } else {
          setBgImage(""); 
        }

      } catch (err) {
          console.error(err)
          setError("Sorry ! City not found"); 
        
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [city, unit]);

  if (city === "") return <Page message={"Search your place know the weather."}/>

  if (loading) return <div className="p-5">Loading...</div>;
  if (error) return <Page message={error} />; 
  if (!weatherData) return <div className="p-5">No weather data available.</div>; 

  const iconCode = weatherData.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const block = [
    {
      title: "Humidity",
      unit: "g.m-3",
      icon: "carbon:humidity-alt",
      value: `${weatherData.main.humidity}`,
    },
    {
      title: "Visibility",
      unit: "km",
      icon: "mingcute:user-visible-line",
      value: `${weatherData.visibility/1000}`,
    },
    {
      title: "Wind",
      unit : "m/s",
      icon : "solar:wind-broken",
      value: `${weatherData.wind.speed}`,
    },
  ];
    const today = new Date();

    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const formatted = today.toLocaleDateString('en-US', options); 



  return (
    <div className="grid grid-cols-3 md:grid-cols-5 grid-rows-6 md:grid-rows-5 gap-4 min-h-[90vh] lg:p-8 p-3 bg-right"
      style={{ backgroundImage: `url(${iconUrl})`, backgroundSize: "80%", backgroundPositionX:"right", backgroundRepeat:"no-repeat"
  }}>

      <div className=" rounded-lg p-4 col-span-3 md:col-span-3 row-span-2 md:row-span-3 shadow-xl shadow-gray-600 flex flex-col justify-evenly"
        style={{backgroundImage: `url(${bgImage || "/fallback.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center"}}>
        
        <div className="flex justify-between"> 
          <div className="flex flex-col bg-slate-100/80 lg:p-5 p-2 rounded-xl">
            <p className="lg:text-lg text-base text-slate-900 font-medium">Today, {formatted}-{today.getFullYear()}</p>
            <p className="lg:text-4xl text-lg text-slate-900 font-bold font-sans mb-5">
              {weatherData?.name}, {getName(weatherData.sys?.country)}
            </p>
            <p className="lg:text-8xl text-4xl text-slate-900 font-bold items-baseline flex ">
                {weatherData.main.temp} <span className="lg:text-8xl text-3xl font-normal"> {unit === "metric" ? " ℃" : unit === "imperial" ? " ℉" : " K"}</span>
            </p>
          </div>
          <div className="flex lg:flex-row flex-col gap-2 ">
              <button className={`w-9 h-8 rounded-lg font-sans flex justify-center items-center text-lg font-bold ${unit === "metric" ? "bg-[#364153] text-white" : "text-[#364153] bg-white border-[#364153] border-2 " } `} onClick={() =>setUnit("metric")}>℃</button>
              <button className={`w-9 h-8 rounded-lg font-sans flex justify-center items-center text-lg font-bold ${unit === "imperial" ? "bg-[#364153] text-white" : "text-[#364153] bg-white border-[#364153] border-2" } `} onClick={() =>setUnit("imperial")}>℉</button>
              <button className={`w-9 h-8 rounded-lg font-sans flex justify-center items-center text-lg font-bold ${unit === "standard" ? "bg-[#364153] text-white" : "text-[#364153] bg-white border-[#364153] border-2" } `} onClick={() =>setUnit("standard")}>K</button>
             
          </div>

        </div>
        
       
      </div>

      <div className="bg-slate-100/60 rounded-lg p-4 col-span-3 md:col-span-2 row-span-2 lg:row-span-3 shadow-xl shadow-gray-600 flex justify-around items-center">
        <div className="lg:gap-y-3 flex flex-col">
          <p className="lg:text-5xl text-2xl text-slate-900 font-bold ">{weatherData.weather[0].main}</p>
          <p className="text-xl text-slate-900 font-medium">{weatherData.weather[0].description}</p>
        </div>
     
        <div className="lg:w-40 h-32 lg:h-40 w-32 rounded-xl bg-[#bfc7de] shadow-xl shadow-gray-600 flex items-center justify-center">
          <img src={iconUrl} alt="weather icon" className=" lg:w-36 w-28  lg:h-36 h-28" />
        </div>         
      </div>

      {block.map((data, num) => (
        <div key={num} className="bg-slate-100/60 rounded-lg lg:p-4 p-2 col-span-1 row-span-1 md:row-span-2 flex flex-col items-center lg:items-start justify-around shadow-xl shadow-gray-600">
          <div>
            <Icon icon={data.icon} width="24" height="24" color="#45556c " />
            <p className="lg:text-lg text-base font-medium font-sans text-slate-600 ">{data.title}</p>

          </div>
          <p className="md:text-6xl text-xl whitespace-nowrap overflow-hidden font-bold text-slate-900"> {data.value} <span className="lg:text-3xl text-lg font-semibold">{data.unit}</span> </p>
          
        </div>
      ))}

      <div className=" rounded-lg lg:p-4 p-1 col-span-3 md:col-span-2 row-span-1 md:row-span-2 flex bg-slate-100/60 shadow-xl shadow-gray-600">
        <div className="w-1/2 p-2 flex flex-col justify-around">
          <div className="flex items-center justify-around">
            <img src={Sunrise} alt="Sunrise" className="lg:w-16 w-10 lg:h-16 h-10  " />
            <p className="text-lg text-slate-600 font-medium">Sunrise</p>
          </div>
          <p className="lg:text-3xl text-xl text-slate-900 text-center font-sans font-bold">{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>

        </div>

        <div className="w-1/2 p-2 flex flex-col justify-around shadow-xl shadow-gray-600 rounded-xl">
          <div className="flex items-center justify-around">
            <img src={Sunset} alt="Sunset" className="lg:w-16 w-10 lg:h-16 h-10  " />
            <p className="text-lg text-slate-600 font-medium">Sunset</p>
          </div>

            <p className="lg:text-3xl text-xl text-slate-900 text-center font-sans font-bold">{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>

        </div>
      
      </div>
    </div>
  );
};