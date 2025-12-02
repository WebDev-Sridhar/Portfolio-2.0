import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import React from "react";
import HeroAnimated from "./Hero";
import Navbar from "./Navbar";


export default function SlidePanels() {
  const [panel, setPanel] = useState(null);

  const variants = {
    top:   { initial: { y: "-100%" }, animate: { y: 0 }, exit: { y: "-100%" } },
    right: { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } },
    bottom:{ initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } },
    left:  { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } },
  };

  const panelMap = {
    top: <About />,
    right: <Skills />,
    bottom: <Projects />,
    left: <Contact />,
  };

  return (
    <>
 
    
    <div className=" relative h-screen w-screen overflow-hidden bg-(--color-bg) text-(--color-text) select-none">
        <Navbar returnFn={()=>setPanel(null)}/>
     <HeroAnimated callParent={()=>setPanel("left")}/>
      
      {/* CORNER BUTTONS */}

      <button onClick={() => setPanel("top")}
        className="absolute top-20 left-1/2 -translate-x-1/2 text-2xl font-bold z-10 ">
        ABOUT ↑
      </button>

      <button onClick={() => setPanel("right")}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-bold rotate-90 z-10">
        SKILLS →
      </button>

      <button onClick={() => setPanel("bottom")}
        className="absolute bottom-20 md:bottom-4 left-1/2 -translate-x-1/2 text-2xl font-bold z-10">
        PROJECTS ↓
      </button>

      <button onClick={() => setPanel("left")}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold -rotate-90 z-10">
        CONTACT ←
      </button>

      {/* CURRENT PANEL */}
      <AnimatePresence>
        {panel && (
          <motion.div
            key={panel}
            variants={variants[panel]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 bg-(--color-bg) text-(--color-text) p-10 z-10 overflow-y-scroll"
          >
            {/* Close Button */}
            <button
              onClick={() => setPanel(null)}
              className="absolute top-20 left-6 text-3xl font-bold z-10 "
            >
             ←Back
            </button>

            {/* Render Section */}
            <div className="mt-16">{panelMap[panel]}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
