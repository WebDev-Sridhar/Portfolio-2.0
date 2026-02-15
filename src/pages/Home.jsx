import React from 'react'
import Navbar from '../sections/Navbar'
import SlidePanels from '../sections/SlidePanels'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Projects from '../sections/Projects'
import Contact from '../sections/Contact'



export default function Home(){

  return (
    <>
        <Navbar/>
    <div className=" relative px-5 z-1 w-screen bg-(--color-bg) text-(--color-text) select-none">
    
    <Hero/>
      <About/>
      <Skills/>
      <Projects/>
      <Contact/>
    </div>

    </>
  )
}
