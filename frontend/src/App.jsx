import NavBar from "./components/NavBar/NavBar.jsx"
import Login from "./components/login/Login.jsx"
import HeroSection from "./components/HeroSection/HeroSection.jsx"
import { useState } from "react"

function App() {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <div>
      <NavBar showLogin = {showLogin} setShowLogin = {setShowLogin}/>
      <HeroSection />
      <Login showLogin = {showLogin}/>
    </div>
  )
}

export default App
