import React, { useEffect, useState } from 'react';
import './App.css';
// import Search from './Components/search/Search';
// import CurrentWeather from './Components/current-weather/CurrentWeather';
// import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Components/Login/Login";
import Signup from "./Components/SignUp/Signup";
import Dashboard from "./Components/Dashboard";
import { auth } from "./Firebase";

function App() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
     auth.onAuthStateChanged((user) => {
      if(user) {
        setUserName(user.displayName)
      }else setUserName("");
     });
  }, []);

  // const [currentWeather, setCurrentWeather] = useState(null);

  // const handleOnSearchChange = (searchData) => {
  //   const [lat, lon] = searchData.value.split(" ")
   
  //   const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
   
  //   Promise.all([currentWeatherFetch])
  //   .then(async (response) => {
  //     const weatherResponse = await response[0].json();
   
  //     setCurrentWeather({ city: searchData.label, ...weatherResponse });
  //   })
  //   .catch(console.log);
  //  };
  //  console.log(currentWeather);

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='dashboard' element={<Dashboard name={userName} />} />
       </Routes>
       </Router>
    </div>
  );
}

export default App;
