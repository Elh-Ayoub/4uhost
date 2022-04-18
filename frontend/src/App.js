import React, { useState, useEffect } from "react"
import {BrowserRouter, Routes, Route, uselayout} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Css/responsive.css"
import "./Css/style.css"
import Header from "./Components/HeaderComponent"
import Loader from "./Components/LoaderComponent"
import Home from "./Views/Home"
import Footer from "./Components/FooterComponent"
import Login from "./Views/Login"
import Register from "./Views/Register"
import AuthDataServices from "./services/Auth"
import ForgetPassword from "./Views/ForgetPassword"
import Profile from "./Views/Profile"
import About from "./Views/About"

function App() {
  const [layout, setLayout] = useState(true)
  const [user, setUser] = useState(null)
  useEffect(() => {
    AuthDataServices.user()
    .then(response => {
       setUser(response.data)
    })
 }, [window.location.pathname])
  return (
    <div className="App main-layout">
      <BrowserRouter>
      {layout && <Header user={user} setUser={setUser}/>}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth/login" element={<Login user={user} setLayout={setLayout}/>} />
          <Route path="/auth/register" element={<Register setLayout={setLayout}/>} />
          <Route path="/auth/forget-password" element={<ForgetPassword setLayout={setLayout}/>} />
          <Route path="/users/profile" element={<Profile setLayout={setLayout}/>} />
          <Route path="/about" element={<About/>}/>
        </Routes>
      {layout && <Footer/>}
      </BrowserRouter>
    </div>
  );
}

export default App;
