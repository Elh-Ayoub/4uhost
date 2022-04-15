import React, { useState } from "react"
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Css/responsive.css"
import "./Css/style.css"
import Header from "./Components/HeaderComponent"
import Loader from "./Components/LoaderComponent"
import Home from "./Views/Home"
import Footer from "./Components/FooterComponent"
import Login from "./Views/Login"

function App() {
  let [location, setLocation] = useState(true);
  return (
    <div className="App main-layout">
      <BrowserRouter>
      {location && <Header/>}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth/login" element={<Login setLocation={setLocation}/>} />
        </Routes>
      {location && <Footer/>}
      </BrowserRouter>
    </div>
  );
}

export default App;
