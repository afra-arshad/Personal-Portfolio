import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'



const App = () => {
  return (
    <div>
    <Navbar/>  
      <Home/>
      <About/>
      <TechStack/>
      <Projects/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App