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
import HostingPlans from "./Views/HostingPlans"
import Domain from "./Views/Domain"
import Contact from "./Views/Contact"

function App() {
  const [layout, setLayout] = useState(true)
  const [user, setUser] = useState(null)
  if(!localStorage.getItem("shoppingCart")){
    localStorage.setItem("shoppingCart", JSON.stringify([]))
  }
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("shoppingCart")));

  const addToCard = (id) => {
    let temp = cart
    temp.push(id)
    setCart(temp)
    localStorage.setItem("shoppingCart", JSON.stringify(cart))
  }
  
  const removeFromCard = (id) => {
    let temp = cart
    const index = temp.indexOf(id)
    if (index > -1) {
      temp.splice(index, 1)
    }
    setCart(temp)
    localStorage.setItem("shoppingCart", JSON.stringify(cart))
  }

  useEffect(() => {
    AuthDataServices.user()
    .then(response => {
       setUser(response.data)
    })
  }, [window.location.pathname])
  return (
    <div className="App main-layout">
      <BrowserRouter>
      {layout && <Header user={user} setUser={setUser} cart={cart} removeFromCard={removeFromCard}/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login user={user} setLayout={setLayout}/>} />
          <Route path="/auth/register" element={<Register setLayout={setLayout}/>} />
          <Route path="/auth/forget-password" element={<ForgetPassword setLayout={setLayout}/>} />
          <Route path="/users/profile" element={<Profile setLayout={setLayout}/>} />
          <Route path="/about" element={<About/>}/>
          <Route path="/hosting-plans" element={<HostingPlans cart={cart} addToCard={addToCard} />}/>
          <Route path="/domain" element={<Domain/>}/>
          <Route path="/contact-us" element={<Contact/>}/>
        </Routes>
      {layout && <Footer/>}
      </BrowserRouter>
    </div>
  );
}

export default App;
