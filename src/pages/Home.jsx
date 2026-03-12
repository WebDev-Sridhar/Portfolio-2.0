import React from 'react'
import Navbar from '../sections/Navbar'
import Hero from '../sections/Hero'
import About from '../sections/About'
import ServicesSection from '../sections/ServicesSection'
import Skills from '../sections/Skills'
import ProcessSection from '../sections/ProcessSection'
import Projects from '../sections/Projects'
import FitSection from '../sections/FitSection'
import WorkingWithMeSection from '../sections/WorkingWithMeSection'
import ExperienceSection from '../sections/ExperienceSection'
import EducationSection from '../sections/EducationSection'
import FAQSection from '../sections/FAQSection'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-(--color-bg) text-(--color-text) select-none overflow-x-hidden">
        <Hero />
        <About />
        <ServicesSection />
        <Skills />
        <ProcessSection />
        <Projects />
        <FitSection />
        <WorkingWithMeSection />
        <ExperienceSection />
        <EducationSection />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
