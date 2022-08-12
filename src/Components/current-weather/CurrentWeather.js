import React, {useState} from 'react';
import './CurrentWeather.css';
import { FaHeart } from 'react-icons/fa';

function CurrentWeather({data}) {

    let favourites = JSON.parse(localStorage.getItem("favourites"))
    let k = 0;

     favourites.find((o, j) => {
        if (o.id === localStorage.getItem("id")) {
            k = j
            return true; 
        }
    });

    const [dummy, setDummy] = useState([]);

    const handleFavourite = (i) => {
    
    favourites[k].data.push(JSON.parse(localStorage.getItem("search"))[i])
    localStorage.setItem("favourites", JSON.stringify(favourites))
    setDummy([...dummy])
   }
  return (
    <div>
    { JSON.parse(localStorage.getItem("search")) && JSON.parse(localStorage.getItem("search")).map((data, i) => {
        console.log(JSON.parse(localStorage.getItem("search")))
        return(
            <div className='weather'>
        <div className='top'>
            <div>
            <p className="city">{data.city}</p>
            <p className="weather-description">{data.weather[0].description}</p>
            </div>
            <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`} />
        </div>
        <div className="bottom">
            <p className="temperature">{Math.round(data.main.temp)}°C</p>
            <div className="details">
                <div className="parameter-row">
                   <span className="parameter-label">Details</span>
                </div>
                <div className="parameter-row">
                   <span className="parameter-label">Feels like</span>
                   <span className="parameter-value">{Math.round(data.main.feels_like)}°C</span>
                </div>
                <div className="parameter-row">
                   <span className="parameter-label">Wind</span>
                   <span className="parameter-value">{data.wind.speed}m/s</span>
                </div>
                <div className="parameter-row">
                   <span className="parameter-label">Humidity</span>
                   <span className="parameter-value">{data.main.humidity}%</span>
                </div>
                <div className="parameter-row">
                   <span className="parameter-label">Pressure</span>
                   <span className="parameter-value">{data.main.pressure} hPa</span>
                </div>
                <div className="parameter-row">
                      {!favourites[k].data.find((o) => o.city===data.city) ? <button className="parameter-label-icon" onClick={() => handleFavourite(i)}><FaHeart /></button> : <div></div>}
                </div>
            </div>
        </div>
    </div>
        )
        
    })
    
    }
    </div>
  )
}

export default CurrentWeather