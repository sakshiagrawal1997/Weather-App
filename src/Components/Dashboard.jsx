import React, { useState, useEffect } from 'react';
import Search from './search/Search';
import CurrentWeather from './current-weather/CurrentWeather';
import { WEATHER_API_URL, WEATHER_API_KEY } from "../api";

function Dashboard() {
     
  const [currentWeather, setCurrentWeather] = useState(null);
  useEffect(() => {
    if(!JSON.parse(localStorage.getItem("favourites"))) {
        localStorage.setItem("favourites", JSON.stringify([]))
    }
    let favourites = JSON.parse(localStorage.getItem("favourites"))
    if(!favourites.find((o) => o.id ===localStorage.getItem("id"))) {
                     localStorage.setItem("favourites", JSON.stringify([...favourites, {id: localStorage.getItem("id"), data:[]} ]))
    }
    favourites = JSON.parse(localStorage.getItem("favourites"))
    let k = 0;

    favourites.find((o, j) => {
       if (o.id === localStorage.getItem("id")) {
           k = j
           return true; 
       }

   });
   if(localStorage.getItem("search").length===0) {
     localStorage.setItem("search", JSON.stringify(favourites[k].data))
   }
   setCurrentWeather("")
}, [])
  
    const handleOnSearchChange = (searchData) => {
      const [lat, lon] = searchData.value.split(" ")
     
      const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
     
      Promise.all([currentWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        
        let search = localStorage.getItem("search")
        search = JSON.parse(search)
        search.push({ city: searchData.label, ...weatherResponse })
        localStorage.setItem("search", JSON.stringify(search))
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
      })
      .catch(console.log);
     };
     console.log(currentWeather);

    return (
        <div className="container"> 
           <Search onSearchChange={handleOnSearchChange}/>
            {console.log(localStorage.getItem("search") || currentWeather)}
           {(localStorage.getItem("search") || currentWeather) ? <CurrentWeather data={currentWeather} /> : <div></div>}
        </div>
   )

   }

   export default Dashboard;