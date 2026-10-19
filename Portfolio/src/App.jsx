import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import TechStack from './components/TechStack'


const App = () => {
  return (
    <div>
    <Navbar/>  
      <Home/>
      <About/>
      <TechStack/>
    </div>
  )
}

export default App